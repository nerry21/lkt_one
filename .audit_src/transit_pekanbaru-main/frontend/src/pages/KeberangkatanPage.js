import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { id } from 'date-fns/locale';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Download,
  Filter,
  X,
  ChevronLeft,
  ChevronRight,
  Calendar as CalendarIcon
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from '../components/ui/dialog';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../components/ui/select';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';
import { Calendar } from '../components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '../components/ui/popover';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const KeberangkatanPage = () => {
  const { getAuthHeader } = useAuth();
  const [data, setData] = useState([]);
  const [drivers, setDrivers] = useState([]);
  const [mobilList, setMobilList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [totalCount, setTotalCount] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [deleteItem, setDeleteItem] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const [formData, setFormData] = useState({
    tanggal: new Date().toISOString().split('T')[0],
    kode_mobil: '',
    driver_id: '',
    jumlah_penumpang: 0,
    tarif_penumpang: 150000,
    jumlah_paket: 0,
    uang_paket: 0,
    trip_ke: 1
  });

  const limit = 10;

  const fetchData = async () => {
    setLoading(true);
    try {
      const [keberangkatanRes, countRes, driversRes, mobilRes] = await Promise.all([
        axios.get(`${API_URL}/api/keberangkatan`, {
          headers: getAuthHeader(),
          params: { page, limit, search: search || undefined }
        }),
        axios.get(`${API_URL}/api/keberangkatan/count`, {
          headers: getAuthHeader(),
          params: { search: search || undefined }
        }),
        axios.get(`${API_URL}/api/drivers/all`, { headers: getAuthHeader() }),
        axios.get(`${API_URL}/api/mobil/all`, { headers: getAuthHeader() })
      ]);
      
      setData(keberangkatanRes.data);
      setTotalCount(countRes.data.count);
      setDrivers(driversRes.data);
      setMobilList(mobilRes.data);
    } catch (error) {
      toast.error('Gagal memuat data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, search]);

  const handleOpenDialog = (item = null) => {
    if (item) {
      setEditItem(item);
      setFormData({
        tanggal: item.tanggal,
        kode_mobil: item.kode_mobil,
        driver_id: item.driver_id,
        jumlah_penumpang: item.jumlah_penumpang,
        tarif_penumpang: item.tarif_penumpang,
        jumlah_paket: item.jumlah_paket,
        uang_paket: item.uang_paket,
        trip_ke: item.trip_ke
      });
    } else {
      setEditItem(null);
      setFormData({
        tanggal: new Date().toISOString().split('T')[0],
        kode_mobil: mobilList[0]?.kode_mobil || '',
        driver_id: drivers[0]?.id || '',
        jumlah_penumpang: 0,
        tarif_penumpang: 150000,
        jumlah_paket: 0,
        uang_paket: 0,
        trip_ke: 1
      });
    }
    setIsDialogOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      if (editItem) {
        await axios.put(
          `${API_URL}/api/keberangkatan/${editItem.id}`,
          formData,
          { headers: getAuthHeader() }
        );
        toast.success('Data berhasil diperbarui');
      } else {
        await axios.post(
          `${API_URL}/api/keberangkatan`,
          formData,
          { headers: getAuthHeader() }
        );
        toast.success('Data berhasil ditambahkan');
      }
      setIsDialogOpen(false);
      fetchData();
    } catch (error) {
      toast.error('Gagal menyimpan data', { description: error.response?.data?.detail });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async () => {
    try {
      await axios.delete(
        `${API_URL}/api/keberangkatan/${deleteItem.id}`,
        { headers: getAuthHeader() }
      );
      toast.success('Data berhasil dihapus');
      setIsDeleteDialogOpen(false);
      fetchData();
    } catch (error) {
      toast.error('Gagal menghapus data');
    }
  };

  const handleExport = () => {
    window.open(`${API_URL}/api/export/keberangkatan/csv`, '_blank');
  };

  const totalPages = Math.ceil(totalCount / limit);

  // Calculate preview values
  const jumlahUangPenumpang = formData.jumlah_penumpang * formData.tarif_penumpang;
  const total = jumlahUangPenumpang + formData.uang_paket;
  const uangPC = total * 0.15;
  const uangBersih = total * 0.85;

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-emerald-900">Data Keberangkatan</h1>
          <p className="text-emerald-600">Kelola data keberangkatan Pekanbaru</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={handleExport}
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            data-testid="export-keberangkatan-btn"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button
            onClick={() => handleOpenDialog()}
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white"
            data-testid="add-keberangkatan-btn"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Data
          </Button>
        </div>
      </div>

      {/* Search & Filter */}
      <Card className="border-emerald-100">
        <CardContent className="p-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
              <Input
                placeholder="Cari kode mobil atau driver..."
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setPage(1);
                }}
                className="pl-10 border-emerald-200"
                data-testid="search-keberangkatan-input"
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Table */}
      <Card className="border-emerald-100 overflow-hidden">
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="bg-emerald-50/50 hover:bg-emerald-50/50">
                  <TableHead className="text-emerald-900 font-semibold">Hari</TableHead>
                  <TableHead className="text-emerald-900 font-semibold">Tanggal</TableHead>
                  <TableHead className="text-emerald-900 font-semibold">Kode Mobil</TableHead>
                  <TableHead className="text-emerald-900 font-semibold">Driver</TableHead>
                  <TableHead className="text-emerald-900 font-semibold text-right">Penumpang</TableHead>
                  <TableHead className="text-emerald-900 font-semibold text-right">Uang Penumpang</TableHead>
                  <TableHead className="text-emerald-900 font-semibold text-right">Paket</TableHead>
                  <TableHead className="text-emerald-900 font-semibold text-right">Uang Paket</TableHead>
                  <TableHead className="text-emerald-900 font-semibold text-right">Uang PC (15%)</TableHead>
                  <TableHead className="text-emerald-900 font-semibold text-right">Uang Bersih</TableHead>
                  <TableHead className="text-emerald-900 font-semibold text-center">Trip</TableHead>
                  <TableHead className="text-emerald-900 font-semibold text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={12} className="text-center py-12">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-emerald-600">Memuat data...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={12} className="text-center py-12 text-emerald-500">
                      Belum ada data keberangkatan
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((item) => (
                    <TableRow key={item.id} className="hover:bg-emerald-50/30" data-testid={`keberangkatan-row-${item.id}`}>
                      <TableCell className="font-medium text-emerald-800">{item.hari}</TableCell>
                      <TableCell>{item.tanggal}</TableCell>
                      <TableCell>
                        <span className="px-2 py-1 bg-emerald-100 text-emerald-700 rounded-md text-sm font-medium">
                          {item.kode_mobil}
                        </span>
                      </TableCell>
                      <TableCell>{item.driver_nama}</TableCell>
                      <TableCell className="text-right">{item.jumlah_penumpang}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.jumlah_uang_penumpang)}</TableCell>
                      <TableCell className="text-right">{item.jumlah_paket}</TableCell>
                      <TableCell className="text-right font-mono text-sm">{formatCurrency(item.uang_paket)}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-amber-600">{formatCurrency(item.uang_pc)}</TableCell>
                      <TableCell className="text-right font-mono text-sm font-bold text-emerald-600">{formatCurrency(item.uang_bersih)}</TableCell>
                      <TableCell className="text-center">
                        <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
                          #{item.trip_ke}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenDialog(item)}
                            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                            data-testid={`edit-keberangkatan-${item.id}`}
                          >
                            <Edit2 className="w-4 h-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              setDeleteItem(item);
                              setIsDeleteDialogOpen(true);
                            }}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50"
                            data-testid={`delete-keberangkatan-${item.id}`}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
          
          {/* Pagination */}
          {totalPages > 1 && (
            <div className="flex items-center justify-between px-4 py-3 border-t border-emerald-100">
              <p className="text-sm text-emerald-600">
                Menampilkan {((page - 1) * limit) + 1} - {Math.min(page * limit, totalCount)} dari {totalCount} data
              </p>
              <div className="flex items-center gap-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.max(1, p - 1))}
                  disabled={page === 1}
                  className="border-emerald-200"
                  data-testid="prev-page-btn"
                >
                  <ChevronLeft className="w-4 h-4" />
                </Button>
                <span className="text-sm text-emerald-700 px-3">
                  {page} / {totalPages}
                </span>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                  disabled={page === totalPages}
                  className="border-emerald-200"
                  data-testid="next-page-btn"
                >
                  <ChevronRight className="w-4 h-4" />
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Add/Edit Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-emerald-900">
              {editItem ? 'Edit Data Keberangkatan' : 'Tambah Data Keberangkatan'}
            </DialogTitle>
            <DialogDescription>
              Isi form di bawah untuk {editItem ? 'memperbarui' : 'menambahkan'} data keberangkatan
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Tanggal */}
              <div className="space-y-2">
                <Label htmlFor="tanggal">Tanggal</Label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal border-emerald-200"
                      data-testid="date-picker-trigger"
                    >
                      <CalendarIcon className="mr-2 h-4 w-4" />
                      {formData.tanggal ? format(new Date(formData.tanggal), 'dd MMMM yyyy', { locale: id }) : 'Pilih tanggal'}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={formData.tanggal ? new Date(formData.tanggal) : undefined}
                      onSelect={(date) => {
                        if (date) {
                          setFormData({ ...formData, tanggal: format(date, 'yyyy-MM-dd') });
                        }
                      }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Kode Mobil */}
              <div className="space-y-2">
                <Label htmlFor="kode_mobil">Kode Mobil</Label>
                <Select
                  value={formData.kode_mobil}
                  onValueChange={(value) => setFormData({ ...formData, kode_mobil: value })}
                >
                  <SelectTrigger className="border-emerald-200" data-testid="select-kode-mobil">
                    <SelectValue placeholder="Pilih mobil" />
                  </SelectTrigger>
                  <SelectContent>
                    {mobilList.map((mobil) => (
                      <SelectItem key={mobil.id} value={mobil.kode_mobil}>
                        {mobil.kode_mobil} - {mobil.jenis_mobil}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Driver */}
              <div className="space-y-2">
                <Label htmlFor="driver_id">Driver</Label>
                <Select
                  value={formData.driver_id}
                  onValueChange={(value) => setFormData({ ...formData, driver_id: value })}
                >
                  <SelectTrigger className="border-emerald-200" data-testid="select-driver">
                    <SelectValue placeholder="Pilih driver" />
                  </SelectTrigger>
                  <SelectContent>
                    {drivers.map((driver) => (
                      <SelectItem key={driver.id} value={driver.id}>
                        {driver.nama} - {driver.lokasi}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Trip Ke */}
              <div className="space-y-2">
                <Label htmlFor="trip_ke">Trip Ke</Label>
                <Input
                  id="trip_ke"
                  type="number"
                  min="1"
                  value={formData.trip_ke}
                  onChange={(e) => setFormData({ ...formData, trip_ke: parseInt(e.target.value) || 1 })}
                  className="border-emerald-200"
                  data-testid="input-trip-ke"
                />
              </div>

              {/* Jumlah Penumpang */}
              <div className="space-y-2">
                <Label htmlFor="jumlah_penumpang">Jumlah Penumpang</Label>
                <Input
                  id="jumlah_penumpang"
                  type="number"
                  min="0"
                  value={formData.jumlah_penumpang}
                  onChange={(e) => setFormData({ ...formData, jumlah_penumpang: parseInt(e.target.value) || 0 })}
                  className="border-emerald-200"
                  data-testid="input-jumlah-penumpang"
                />
              </div>

              {/* Tarif Penumpang */}
              <div className="space-y-2">
                <Label htmlFor="tarif_penumpang">Tarif per Penumpang (Rp)</Label>
                <Input
                  id="tarif_penumpang"
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.tarif_penumpang}
                  onChange={(e) => setFormData({ ...formData, tarif_penumpang: parseInt(e.target.value) || 0 })}
                  className="border-emerald-200"
                  data-testid="input-tarif-penumpang"
                />
              </div>

              {/* Jumlah Paket */}
              <div className="space-y-2">
                <Label htmlFor="jumlah_paket">Jumlah Paket</Label>
                <Input
                  id="jumlah_paket"
                  type="number"
                  min="0"
                  value={formData.jumlah_paket}
                  onChange={(e) => setFormData({ ...formData, jumlah_paket: parseInt(e.target.value) || 0 })}
                  className="border-emerald-200"
                  data-testid="input-jumlah-paket"
                />
              </div>

              {/* Uang Paket */}
              <div className="space-y-2">
                <Label htmlFor="uang_paket">Total Uang Paket (Rp)</Label>
                <Input
                  id="uang_paket"
                  type="number"
                  min="0"
                  step="1000"
                  value={formData.uang_paket}
                  onChange={(e) => setFormData({ ...formData, uang_paket: parseInt(e.target.value) || 0 })}
                  className="border-emerald-200"
                  data-testid="input-uang-paket"
                />
              </div>
            </div>

            {/* Calculation Preview */}
            <div className="p-4 bg-emerald-50 rounded-xl border border-emerald-100 space-y-2">
              <h4 className="font-semibold text-emerald-900">Preview Perhitungan:</h4>
              <div className="grid grid-cols-2 gap-2 text-sm">
                <span className="text-emerald-600">Uang Penumpang:</span>
                <span className="font-mono text-right">{formatCurrency(jumlahUangPenumpang)}</span>
                <span className="text-emerald-600">Uang Paket:</span>
                <span className="font-mono text-right">{formatCurrency(formData.uang_paket)}</span>
                <span className="text-emerald-600">Total:</span>
                <span className="font-mono text-right font-semibold">{formatCurrency(total)}</span>
                <span className="text-amber-600 font-medium">Uang PC (15%):</span>
                <span className="font-mono text-right text-amber-600 font-semibold">{formatCurrency(uangPC)}</span>
                <span className="text-emerald-700 font-medium">Uang Bersih (85%):</span>
                <span className="font-mono text-right text-emerald-700 font-bold">{formatCurrency(uangBersih)}</span>
              </div>
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsDialogOpen(false)}
                className="border-emerald-200"
              >
                Batal
              </Button>
              <Button
                type="submit"
                disabled={isSubmitting}
                className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white"
                data-testid="submit-keberangkatan-btn"
              >
                {isSubmitting ? 'Menyimpan...' : (editItem ? 'Perbarui' : 'Simpan')}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-red-600">Hapus Data Keberangkatan</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus data keberangkatan ini? Tindakan ini tidak dapat dibatalkan.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Batal
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              data-testid="confirm-delete-btn"
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default KeberangkatanPage;
