from fastapi import FastAPI, APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, EmailStr
from typing import List, Optional
import uuid
from datetime import datetime, timezone, timedelta
import jwt
import bcrypt
from fastapi.responses import StreamingResponse
import io
import csv

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Settings
SECRET_KEY = os.environ.get('JWT_SECRET', 'pekanbaru-transport-secret-key-2024')
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_HOURS = 24

# Create the main app
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Security
security = HTTPBearer()

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# ======================= MODELS =======================

# User Models
class UserCreate(BaseModel):
    email: EmailStr
    password: str
    nama: str

class UserLogin(BaseModel):
    email: EmailStr
    password: str

class User(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    email: EmailStr
    nama: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class Token(BaseModel):
    access_token: str
    token_type: str
    user: User

# Driver Models
class DriverCreate(BaseModel):
    nama: str
    lokasi: str

class Driver(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    nama: str
    lokasi: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class DriverUpdate(BaseModel):
    nama: Optional[str] = None
    lokasi: Optional[str] = None

# Mobil Models
class MobilCreate(BaseModel):
    kode_mobil: str
    jenis_mobil: str  # Reborn atau Hiace

class Mobil(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    kode_mobil: str
    jenis_mobil: str
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class MobilUpdate(BaseModel):
    kode_mobil: Optional[str] = None
    jenis_mobil: Optional[str] = None

# Keberangkatan Models
class KeberangkatanCreate(BaseModel):
    tanggal: str  # ISO date string
    kode_mobil: str
    driver_id: str
    jumlah_penumpang: int
    tarif_penumpang: int
    jumlah_paket: int
    uang_paket: int
    trip_ke: int

class Keberangkatan(BaseModel):
    model_config = ConfigDict(extra="ignore")
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    tanggal: str
    hari: str
    bulan: str
    tahun: str
    kode_mobil: str
    driver_id: str
    driver_nama: str
    jumlah_penumpang: int
    tarif_penumpang: int
    jumlah_uang_penumpang: int
    jumlah_paket: int
    uang_paket: int
    uang_pc: float
    uang_bersih: float
    trip_ke: int
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class KeberangkatanUpdate(BaseModel):
    tanggal: Optional[str] = None
    kode_mobil: Optional[str] = None
    driver_id: Optional[str] = None
    jumlah_penumpang: Optional[int] = None
    tarif_penumpang: Optional[int] = None
    jumlah_paket: Optional[int] = None
    uang_paket: Optional[int] = None
    trip_ke: Optional[int] = None

# ======================= HELPER FUNCTIONS =======================

def hash_password(password: str) -> str:
    return bcrypt.hashpw(password.encode('utf-8'), bcrypt.gensalt()).decode('utf-8')

def verify_password(password: str, hashed: str) -> bool:
    return bcrypt.checkpw(password.encode('utf-8'), hashed.encode('utf-8'))

def create_access_token(data: dict) -> str:
    to_encode = data.copy()
    expire = datetime.now(timezone.utc) + timedelta(hours=ACCESS_TOKEN_EXPIRE_HOURS)
    to_encode.update({"exp": expire})
    return jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)

async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    token = credentials.credentials
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("sub")
        if user_id is None:
            raise HTTPException(status_code=401, detail="Token tidak valid")
        user = await db.users.find_one({"id": user_id}, {"_id": 0})
        if user is None:
            raise HTTPException(status_code=401, detail="User tidak ditemukan")
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token sudah kadaluarsa")
    except jwt.PyJWTError:
        raise HTTPException(status_code=401, detail="Token tidak valid")

def get_day_name(date_str: str) -> str:
    days = ['Senin', 'Selasa', 'Rabu', 'Kamis', 'Jumat', 'Sabtu', 'Minggu']
    date = datetime.fromisoformat(date_str)
    return days[date.weekday()]

def get_month_name(month: int) -> str:
    months = ['Januari', 'Februari', 'Maret', 'April', 'Mei', 'Juni',
              'Juli', 'Agustus', 'September', 'Oktober', 'November', 'Desember']
    return months[month - 1]

def calculate_uang(jumlah_uang_penumpang: int, uang_paket: int):
    """
    Uang PC = (Jumlah uang penumpang + jumlah uang paket) * 0.15
    Uang Bersih = Total - Uang PC = Total * 0.85
    """
    total = jumlah_uang_penumpang + uang_paket
    uang_pc = total * 0.15
    uang_bersih = total * 0.85
    return uang_pc, uang_bersih

# ======================= AUTH ROUTES =======================

@api_router.post("/auth/register", response_model=Token)
async def register(user_data: UserCreate):
    existing = await db.users.find_one({"email": user_data.email})
    if existing:
        raise HTTPException(status_code=400, detail="Email sudah terdaftar")
    
    user = User(
        email=user_data.email,
        nama=user_data.nama
    )
    user_dict = user.model_dump()
    user_dict['password'] = hash_password(user_data.password)
    user_dict['created_at'] = user_dict['created_at'].isoformat()
    
    await db.users.insert_one(user_dict)
    
    access_token = create_access_token({"sub": user.id})
    return Token(access_token=access_token, token_type="bearer", user=user)

@api_router.post("/auth/login", response_model=Token)
async def login(login_data: UserLogin):
    # Check if user exists
    user = await db.users.find_one({"email": login_data.email}, {"_id": 0})
    
    if user:
        # User exists, verify password
        if not verify_password(login_data.password, user['password']):
            raise HTTPException(status_code=401, detail="Password salah")
        
        access_token = create_access_token({"sub": user['id']})
        user_response = User(id=user['id'], email=user['email'], nama=user['nama'])
        return Token(access_token=access_token, token_type="bearer", user=user_response)
    else:
        # User doesn't exist, auto-register with the provided email/password
        nama = login_data.email.split('@')[0].replace('.', ' ').replace('_', ' ').title()
        new_user = User(email=login_data.email, nama=nama)
        user_dict = new_user.model_dump()
        user_dict['password'] = hash_password(login_data.password)
        user_dict['created_at'] = user_dict['created_at'].isoformat()
        
        await db.users.insert_one(user_dict)
        
        access_token = create_access_token({"sub": new_user.id})
        return Token(access_token=access_token, token_type="bearer", user=new_user)

@api_router.get("/auth/me", response_model=User)
async def get_me(current_user: dict = Depends(get_current_user)):
    return User(**current_user)

# ======================= DRIVER ROUTES =======================

@api_router.post("/drivers", response_model=Driver)
async def create_driver(driver_data: DriverCreate, current_user: dict = Depends(get_current_user)):
    driver = Driver(
        nama=driver_data.nama,
        lokasi=driver_data.lokasi
    )
    driver_dict = driver.model_dump()
    driver_dict['created_at'] = driver_dict['created_at'].isoformat()
    
    await db.drivers.insert_one(driver_dict)
    return driver

@api_router.get("/drivers", response_model=List[Driver])
async def get_drivers(
    search: Optional[str] = None,
    page: int = 1,
    limit: int = 10,
    current_user: dict = Depends(get_current_user)
):
    query = {}
    if search:
        query["$or"] = [
            {"nama": {"$regex": search, "$options": "i"}},
            {"lokasi": {"$regex": search, "$options": "i"}}
        ]
    
    skip = (page - 1) * limit
    drivers = await db.drivers.find(query, {"_id": 0}).skip(skip).limit(limit).to_list(1000)
    return drivers

@api_router.get("/drivers/all", response_model=List[Driver])
async def get_all_drivers(current_user: dict = Depends(get_current_user)):
    drivers = await db.drivers.find({}, {"_id": 0}).to_list(1000)
    return drivers

@api_router.get("/drivers/count")
async def get_drivers_count(search: Optional[str] = None, current_user: dict = Depends(get_current_user)):
    query = {}
    if search:
        query["$or"] = [
            {"nama": {"$regex": search, "$options": "i"}},
            {"lokasi": {"$regex": search, "$options": "i"}}
        ]
    count = await db.drivers.count_documents(query)
    return {"count": count}

@api_router.get("/drivers/{driver_id}", response_model=Driver)
async def get_driver(driver_id: str, current_user: dict = Depends(get_current_user)):
    driver = await db.drivers.find_one({"id": driver_id}, {"_id": 0})
    if not driver:
        raise HTTPException(status_code=404, detail="Driver tidak ditemukan")
    return driver

@api_router.put("/drivers/{driver_id}", response_model=Driver)
async def update_driver(driver_id: str, driver_data: DriverUpdate, current_user: dict = Depends(get_current_user)):
    driver = await db.drivers.find_one({"id": driver_id}, {"_id": 0})
    if not driver:
        raise HTTPException(status_code=404, detail="Driver tidak ditemukan")
    
    update_data = {k: v for k, v in driver_data.model_dump().items() if v is not None}
    if update_data:
        await db.drivers.update_one({"id": driver_id}, {"$set": update_data})
    
    updated_driver = await db.drivers.find_one({"id": driver_id}, {"_id": 0})
    return updated_driver

@api_router.delete("/drivers/{driver_id}")
async def delete_driver(driver_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.drivers.delete_one({"id": driver_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Driver tidak ditemukan")
    return {"message": "Driver berhasil dihapus"}

# ======================= MOBIL ROUTES =======================

@api_router.post("/mobil", response_model=Mobil)
async def create_mobil(mobil_data: MobilCreate, current_user: dict = Depends(get_current_user)):
    mobil = Mobil(
        kode_mobil=mobil_data.kode_mobil,
        jenis_mobil=mobil_data.jenis_mobil
    )
    mobil_dict = mobil.model_dump()
    mobil_dict['created_at'] = mobil_dict['created_at'].isoformat()
    
    await db.mobil.insert_one(mobil_dict)
    return mobil

@api_router.get("/mobil", response_model=List[Mobil])
async def get_mobil_list(
    search: Optional[str] = None,
    jenis: Optional[str] = None,
    page: int = 1,
    limit: int = 10,
    current_user: dict = Depends(get_current_user)
):
    query = {}
    if search:
        query["kode_mobil"] = {"$regex": search, "$options": "i"}
    if jenis:
        query["jenis_mobil"] = jenis
    
    skip = (page - 1) * limit
    mobil_list = await db.mobil.find(query, {"_id": 0}).skip(skip).limit(limit).to_list(1000)
    return mobil_list

@api_router.get("/mobil/all", response_model=List[Mobil])
async def get_all_mobil(current_user: dict = Depends(get_current_user)):
    mobil_list = await db.mobil.find({}, {"_id": 0}).to_list(1000)
    return mobil_list

@api_router.get("/mobil/count")
async def get_mobil_count(search: Optional[str] = None, jenis: Optional[str] = None, current_user: dict = Depends(get_current_user)):
    query = {}
    if search:
        query["kode_mobil"] = {"$regex": search, "$options": "i"}
    if jenis:
        query["jenis_mobil"] = jenis
    count = await db.mobil.count_documents(query)
    return {"count": count}

@api_router.get("/mobil/{mobil_id}", response_model=Mobil)
async def get_mobil(mobil_id: str, current_user: dict = Depends(get_current_user)):
    mobil = await db.mobil.find_one({"id": mobil_id}, {"_id": 0})
    if not mobil:
        raise HTTPException(status_code=404, detail="Mobil tidak ditemukan")
    return mobil

@api_router.put("/mobil/{mobil_id}", response_model=Mobil)
async def update_mobil(mobil_id: str, mobil_data: MobilUpdate, current_user: dict = Depends(get_current_user)):
    mobil = await db.mobil.find_one({"id": mobil_id}, {"_id": 0})
    if not mobil:
        raise HTTPException(status_code=404, detail="Mobil tidak ditemukan")
    
    update_data = {k: v for k, v in mobil_data.model_dump().items() if v is not None}
    if update_data:
        await db.mobil.update_one({"id": mobil_id}, {"$set": update_data})
    
    updated_mobil = await db.mobil.find_one({"id": mobil_id}, {"_id": 0})
    return updated_mobil

@api_router.delete("/mobil/{mobil_id}")
async def delete_mobil(mobil_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.mobil.delete_one({"id": mobil_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Mobil tidak ditemukan")
    return {"message": "Mobil berhasil dihapus"}

# ======================= KEBERANGKATAN ROUTES =======================

@api_router.post("/keberangkatan", response_model=Keberangkatan)
async def create_keberangkatan(data: KeberangkatanCreate, current_user: dict = Depends(get_current_user)):
    # Get driver name
    driver = await db.drivers.find_one({"id": data.driver_id}, {"_id": 0})
    if not driver:
        raise HTTPException(status_code=404, detail="Driver tidak ditemukan")
    
    # Parse date
    date = datetime.fromisoformat(data.tanggal)
    hari = get_day_name(data.tanggal)
    bulan = get_month_name(date.month)
    tahun = str(date.year)
    
    # Calculate money
    jumlah_uang_penumpang = data.jumlah_penumpang * data.tarif_penumpang
    uang_pc, uang_bersih = calculate_uang(jumlah_uang_penumpang, data.uang_paket)
    
    keberangkatan = Keberangkatan(
        tanggal=data.tanggal,
        hari=hari,
        bulan=bulan,
        tahun=tahun,
        kode_mobil=data.kode_mobil,
        driver_id=data.driver_id,
        driver_nama=driver['nama'],
        jumlah_penumpang=data.jumlah_penumpang,
        tarif_penumpang=data.tarif_penumpang,
        jumlah_uang_penumpang=jumlah_uang_penumpang,
        jumlah_paket=data.jumlah_paket,
        uang_paket=data.uang_paket,
        uang_pc=uang_pc,
        uang_bersih=uang_bersih,
        trip_ke=data.trip_ke
    )
    
    keberangkatan_dict = keberangkatan.model_dump()
    keberangkatan_dict['created_at'] = keberangkatan_dict['created_at'].isoformat()
    
    await db.keberangkatan.insert_one(keberangkatan_dict)
    return keberangkatan

@api_router.get("/keberangkatan", response_model=List[Keberangkatan])
async def get_keberangkatan_list(
    search: Optional[str] = None,
    kode_mobil: Optional[str] = None,
    driver_id: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    page: int = 1,
    limit: int = 10,
    current_user: dict = Depends(get_current_user)
):
    query = {}
    if search:
        query["$or"] = [
            {"kode_mobil": {"$regex": search, "$options": "i"}},
            {"driver_nama": {"$regex": search, "$options": "i"}}
        ]
    if kode_mobil:
        query["kode_mobil"] = kode_mobil
    if driver_id:
        query["driver_id"] = driver_id
    if start_date and end_date:
        query["tanggal"] = {"$gte": start_date, "$lte": end_date}
    elif start_date:
        query["tanggal"] = {"$gte": start_date}
    elif end_date:
        query["tanggal"] = {"$lte": end_date}
    
    skip = (page - 1) * limit
    keberangkatan_list = await db.keberangkatan.find(query, {"_id": 0}).sort("tanggal", -1).skip(skip).limit(limit).to_list(1000)
    return keberangkatan_list

@api_router.get("/keberangkatan/count")
async def get_keberangkatan_count(
    search: Optional[str] = None,
    kode_mobil: Optional[str] = None,
    driver_id: Optional[str] = None,
    start_date: Optional[str] = None,
    end_date: Optional[str] = None,
    current_user: dict = Depends(get_current_user)
):
    query = {}
    if search:
        query["$or"] = [
            {"kode_mobil": {"$regex": search, "$options": "i"}},
            {"driver_nama": {"$regex": search, "$options": "i"}}
        ]
    if kode_mobil:
        query["kode_mobil"] = kode_mobil
    if driver_id:
        query["driver_id"] = driver_id
    if start_date and end_date:
        query["tanggal"] = {"$gte": start_date, "$lte": end_date}
    elif start_date:
        query["tanggal"] = {"$gte": start_date}
    elif end_date:
        query["tanggal"] = {"$lte": end_date}
    
    count = await db.keberangkatan.count_documents(query)
    return {"count": count}

@api_router.get("/keberangkatan/{keberangkatan_id}", response_model=Keberangkatan)
async def get_keberangkatan(keberangkatan_id: str, current_user: dict = Depends(get_current_user)):
    keberangkatan = await db.keberangkatan.find_one({"id": keberangkatan_id}, {"_id": 0})
    if not keberangkatan:
        raise HTTPException(status_code=404, detail="Data keberangkatan tidak ditemukan")
    return keberangkatan

@api_router.put("/keberangkatan/{keberangkatan_id}", response_model=Keberangkatan)
async def update_keberangkatan(keberangkatan_id: str, data: KeberangkatanUpdate, current_user: dict = Depends(get_current_user)):
    keberangkatan = await db.keberangkatan.find_one({"id": keberangkatan_id}, {"_id": 0})
    if not keberangkatan:
        raise HTTPException(status_code=404, detail="Data keberangkatan tidak ditemukan")
    
    update_data = {k: v for k, v in data.model_dump().items() if v is not None}
    
    if update_data:
        # Recalculate if necessary
        jumlah_penumpang = update_data.get('jumlah_penumpang', keberangkatan['jumlah_penumpang'])
        tarif_penumpang = update_data.get('tarif_penumpang', keberangkatan['tarif_penumpang'])
        uang_paket = update_data.get('uang_paket', keberangkatan['uang_paket'])
        
        jumlah_uang_penumpang = jumlah_penumpang * tarif_penumpang
        uang_pc, uang_bersih = calculate_uang(jumlah_uang_penumpang, uang_paket)
        
        update_data['jumlah_uang_penumpang'] = jumlah_uang_penumpang
        update_data['uang_pc'] = uang_pc
        update_data['uang_bersih'] = uang_bersih
        
        # Update date fields if tanggal changed
        if 'tanggal' in update_data:
            date = datetime.fromisoformat(update_data['tanggal'])
            update_data['hari'] = get_day_name(update_data['tanggal'])
            update_data['bulan'] = get_month_name(date.month)
            update_data['tahun'] = str(date.year)
        
        # Update driver name if driver_id changed
        if 'driver_id' in update_data:
            driver = await db.drivers.find_one({"id": update_data['driver_id']}, {"_id": 0})
            if driver:
                update_data['driver_nama'] = driver['nama']
        
        await db.keberangkatan.update_one({"id": keberangkatan_id}, {"$set": update_data})
    
    updated = await db.keberangkatan.find_one({"id": keberangkatan_id}, {"_id": 0})
    return updated

@api_router.delete("/keberangkatan/{keberangkatan_id}")
async def delete_keberangkatan(keberangkatan_id: str, current_user: dict = Depends(get_current_user)):
    result = await db.keberangkatan.delete_one({"id": keberangkatan_id})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Data keberangkatan tidak ditemukan")
    return {"message": "Data keberangkatan berhasil dihapus"}

# ======================= STATISTICS ROUTES =======================

@api_router.get("/statistics/dashboard")
async def get_dashboard_statistics(current_user: dict = Depends(get_current_user)):
    # Get counts
    total_drivers = await db.drivers.count_documents({})
    total_mobil = await db.mobil.count_documents({})
    total_keberangkatan = await db.keberangkatan.count_documents({})
    
    # Get financial totals
    pipeline = [
        {
            "$group": {
                "_id": None,
                "total_uang_pc": {"$sum": "$uang_pc"},
                "total_uang_bersih": {"$sum": "$uang_bersih"},
                "total_penumpang": {"$sum": "$jumlah_penumpang"},
                "total_paket": {"$sum": "$jumlah_paket"}
            }
        }
    ]
    
    financial = await db.keberangkatan.aggregate(pipeline).to_list(1)
    
    stats = {
        "total_drivers": total_drivers,
        "total_mobil": total_mobil,
        "total_keberangkatan": total_keberangkatan,
        "total_uang_pc": financial[0]["total_uang_pc"] if financial else 0,
        "total_uang_bersih": financial[0]["total_uang_bersih"] if financial else 0,
        "total_penumpang": financial[0]["total_penumpang"] if financial else 0,
        "total_paket": financial[0]["total_paket"] if financial else 0
    }
    
    return stats

@api_router.get("/statistics/revenue-chart")
async def get_revenue_chart(current_user: dict = Depends(get_current_user)):
    """Get revenue data grouped by month for charts"""
    pipeline = [
        {
            "$group": {
                "_id": {"$substr": ["$tanggal", 0, 7]},  # YYYY-MM
                "uang_bersih": {"$sum": "$uang_bersih"},
                "uang_pc": {"$sum": "$uang_pc"},
                "penumpang": {"$sum": "$jumlah_penumpang"}
            }
        },
        {"$sort": {"_id": 1}},
        {"$limit": 12}
    ]
    
    data = await db.keberangkatan.aggregate(pipeline).to_list(12)
    
    chart_data = []
    for item in data:
        month_str = item["_id"]
        chart_data.append({
            "bulan": month_str,
            "uang_bersih": item["uang_bersih"],
            "uang_pc": item["uang_pc"],
            "penumpang": item["penumpang"]
        })
    
    return chart_data

@api_router.get("/statistics/mobil-revenue")
async def get_mobil_revenue(current_user: dict = Depends(get_current_user)):
    """Get revenue per mobil"""
    pipeline = [
        {
            "$group": {
                "_id": "$kode_mobil",
                "total_uang_bersih": {"$sum": "$uang_bersih"},
                "total_trips": {"$sum": 1}
            }
        },
        {"$sort": {"total_uang_bersih": -1}}
    ]
    
    data = await db.keberangkatan.aggregate(pipeline).to_list(100)
    
    return [{"kode_mobil": item["_id"], "total_uang_bersih": item["total_uang_bersih"], "total_trips": item["total_trips"]} for item in data]

# ======================= EXPORT ROUTES =======================

@api_router.get("/export/keberangkatan/csv")
async def export_keberangkatan_csv(current_user: dict = Depends(get_current_user)):
    keberangkatan_list = await db.keberangkatan.find({}, {"_id": 0}).to_list(10000)
    
    output = io.StringIO()
    writer = csv.writer(output)
    
    # Header
    writer.writerow([
        'Hari', 'Tanggal', 'Tahun', 'Kode Mobil', 'Driver', 
        'Jumlah Penumpang', 'Tarif Penumpang', 'Jumlah Uang Penumpang',
        'Jumlah Paket', 'Uang Paket', 'Uang PC', 'Uang Bersih', 'Trip Ke'
    ])
    
    # Data
    for item in keberangkatan_list:
        writer.writerow([
            item['hari'], item['tanggal'], item['tahun'], item['kode_mobil'],
            item['driver_nama'], item['jumlah_penumpang'], item['tarif_penumpang'],
            item['jumlah_uang_penumpang'], item['jumlah_paket'], item['uang_paket'],
            item['uang_pc'], item['uang_bersih'], item['trip_ke']
        ])
    
    output.seek(0)
    
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=keberangkatan.csv"}
    )

@api_router.get("/export/drivers/csv")
async def export_drivers_csv(current_user: dict = Depends(get_current_user)):
    drivers = await db.drivers.find({}, {"_id": 0}).to_list(10000)
    
    output = io.StringIO()
    writer = csv.writer(output)
    
    writer.writerow(['Nama Driver', 'Lokasi'])
    
    for item in drivers:
        writer.writerow([item['nama'], item['lokasi']])
    
    output.seek(0)
    
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=drivers.csv"}
    )

@api_router.get("/export/mobil/csv")
async def export_mobil_csv(current_user: dict = Depends(get_current_user)):
    mobil_list = await db.mobil.find({}, {"_id": 0}).to_list(10000)
    
    output = io.StringIO()
    writer = csv.writer(output)
    
    writer.writerow(['Kode Mobil', 'Jenis Mobil'])
    
    for item in mobil_list:
        writer.writerow([item['kode_mobil'], item['jenis_mobil']])
    
    output.seek(0)
    
    return StreamingResponse(
        iter([output.getvalue()]),
        media_type="text/csv",
        headers={"Content-Disposition": "attachment; filename=mobil.csv"}
    )

# ======================= SEED DATA =======================

@api_router.post("/seed")
async def seed_data(current_user: dict = Depends(get_current_user)):
    """Seed dummy data for testing"""
    # Clear existing data
    await db.drivers.delete_many({})
    await db.mobil.delete_many({})
    await db.keberangkatan.delete_many({})
    
    # Create drivers
    drivers_data = [
        {"nama": "Ahmad Rizki", "lokasi": "Pekanbaru"},
        {"nama": "Budi Santoso", "lokasi": "Duri"},
        {"nama": "Cahyo Pratama", "lokasi": "Dumai"},
        {"nama": "Dedi Kurniawan", "lokasi": "Bengkalis"},
        {"nama": "Eko Saputra", "lokasi": "Siak"},
    ]
    
    drivers = []
    for d in drivers_data:
        driver = Driver(nama=d['nama'], lokasi=d['lokasi'])
        driver_dict = driver.model_dump()
        driver_dict['created_at'] = driver_dict['created_at'].isoformat()
        await db.drivers.insert_one(driver_dict)
        drivers.append(driver)
    
    # Create mobil
    mobil_data = [
        {"kode_mobil": "PB-001", "jenis_mobil": "Hiace"},
        {"kode_mobil": "PB-002", "jenis_mobil": "Reborn"},
        {"kode_mobil": "PB-003", "jenis_mobil": "Hiace"},
        {"kode_mobil": "PB-004", "jenis_mobil": "Reborn"},
        {"kode_mobil": "PB-005", "jenis_mobil": "Hiace"},
    ]
    
    mobil_list = []
    for m in mobil_data:
        mobil = Mobil(kode_mobil=m['kode_mobil'], jenis_mobil=m['jenis_mobil'])
        mobil_dict = mobil.model_dump()
        mobil_dict['created_at'] = mobil_dict['created_at'].isoformat()
        await db.mobil.insert_one(mobil_dict)
        mobil_list.append(mobil)
    
    # Create keberangkatan
    import random
    
    dates = [
        "2024-01-05", "2024-01-12", "2024-01-19", "2024-01-26",
        "2024-02-02", "2024-02-09", "2024-02-16", "2024-02-23",
        "2024-03-01", "2024-03-08", "2024-03-15", "2024-03-22",
        "2024-04-05", "2024-04-12", "2024-04-19", "2024-04-26",
        "2024-05-03", "2024-05-10", "2024-05-17", "2024-05-24",
    ]
    
    for i, date_str in enumerate(dates):
        driver = random.choice(drivers)
        mobil = random.choice(mobil_list)
        
        jumlah_penumpang = random.randint(5, 15)
        tarif_penumpang = random.choice([150000, 175000, 200000, 250000])
        jumlah_paket = random.randint(0, 10)
        uang_paket = jumlah_paket * random.choice([25000, 30000, 35000])
        trip_ke = (i % 3) + 1
        
        date = datetime.fromisoformat(date_str)
        hari = get_day_name(date_str)
        bulan = get_month_name(date.month)
        tahun = str(date.year)
        
        jumlah_uang_penumpang = jumlah_penumpang * tarif_penumpang
        uang_pc, uang_bersih = calculate_uang(jumlah_uang_penumpang, uang_paket)
        
        keberangkatan = Keberangkatan(
            tanggal=date_str,
            hari=hari,
            bulan=bulan,
            tahun=tahun,
            kode_mobil=mobil.kode_mobil,
            driver_id=driver.id,
            driver_nama=driver.nama,
            jumlah_penumpang=jumlah_penumpang,
            tarif_penumpang=tarif_penumpang,
            jumlah_uang_penumpang=jumlah_uang_penumpang,
            jumlah_paket=jumlah_paket,
            uang_paket=uang_paket,
            uang_pc=uang_pc,
            uang_bersih=uang_bersih,
            trip_ke=trip_ke
        )
        
        keberangkatan_dict = keberangkatan.model_dump()
        keberangkatan_dict['created_at'] = keberangkatan_dict['created_at'].isoformat()
        await db.keberangkatan.insert_one(keberangkatan_dict)
    
    return {"message": "Data dummy berhasil dibuat", "drivers": len(drivers), "mobil": len(mobil_list), "keberangkatan": len(dates)}

# Root endpoint
@api_router.get("/")
async def root():
    return {"message": "Pekanbaru Transport Management API"}

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=os.environ.get('CORS_ORIGINS', '*').split(','),
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
