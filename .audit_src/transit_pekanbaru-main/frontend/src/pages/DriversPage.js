import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import {
  Plus,
  Search,
  Edit2,
  Trash2,
  Download,
  ChevronLeft,
  ChevronRight,
  MapPin,
  User
} from 'lucide-react';
import { Card, CardContent } from '../components/ui/card';
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
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '../components/ui/table';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const DriversPage = () => {
  const { getAuthHeader } = useAuth();
  const [data, setData] = useState([]);
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
    nama: '',
    lokasi: ''
  });

  const limit = 10;

  const fetchData = async () => {
    setLoading(true);
    try {
      const [driversRes, countRes] = await Promise.all([
        axios.get(`${API_URL}/api/drivers`, {
          headers: getAuthHeader(),
          params: { page, limit, search: search || undefined }
        }),
        axios.get(`${API_URL}/api/drivers/count`, {
          headers: getAuthHeader(),
          params: { search: search || undefined }
        })
      ]);
      
      setData(driversRes.data);
      setTotalCount(countRes.data.count);
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
        nama: item.nama,
        lokasi: item.lokasi
      });
    } else {
      setEditItem(null);
      setFormData({
        nama: '',
        lokasi: ''
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
          `${API_URL}/api/drivers/${editItem.id}`,
          formData,
          { headers: getAuthHeader() }
        );
        toast.success('Data driver berhasil diperbarui');
      } else {
        await axios.post(
          `${API_URL}/api/drivers`,
          formData,
          { headers: getAuthHeader() }
        );
        toast.success('Driver berhasil ditambahkan');
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
        `${API_URL}/api/drivers/${deleteItem.id}`,
        { headers: getAuthHeader() }
      );
      toast.success('Driver berhasil dihapus');
      setIsDeleteDialogOpen(false);
      fetchData();
    } catch (error) {
      toast.error('Gagal menghapus data');
    }
  };

  const handleExport = () => {
    window.open(`${API_URL}/api/export/drivers/csv`, '_blank');
  };

  const totalPages = Math.ceil(totalCount / limit);

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-emerald-900">Data Driver</h1>
          <p className="text-emerald-600">Kelola data driver armada</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Button
            variant="outline"
            onClick={handleExport}
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            data-testid="export-drivers-btn"
          >
            <Download className="w-4 h-4 mr-2" />
            Export CSV
          </Button>
          <Button
            onClick={() => handleOpenDialog()}
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white"
            data-testid="add-driver-btn"
          >
            <Plus className="w-4 h-4 mr-2" />
            Tambah Driver
          </Button>
        </div>
      </div>

      {/* Search */}
      <Card className="border-emerald-100">
        <CardContent className="p-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
            <Input
              placeholder="Cari nama atau lokasi driver..."
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-10 border-emerald-200"
              data-testid="search-drivers-input"
            />
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
                  <TableHead className="text-emerald-900 font-semibold w-12">#</TableHead>
                  <TableHead className="text-emerald-900 font-semibold">Nama Driver</TableHead>
                  <TableHead className="text-emerald-900 font-semibold">Lokasi Tempat Tinggal</TableHead>
                  <TableHead className="text-emerald-900 font-semibold text-center">Aksi</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {loading ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12">
                      <div className="flex flex-col items-center gap-2">
                        <div className="w-8 h-8 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin" />
                        <span className="text-emerald-600">Memuat data...</span>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : data.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={4} className="text-center py-12 text-emerald-500">
                      Belum ada data driver
                    </TableCell>
                  </TableRow>
                ) : (
                  data.map((item, index) => (
                    <TableRow key={item.id} className="hover:bg-emerald-50/30" data-testid={`driver-row-${item.id}`}>
                      <TableCell className="text-emerald-500 font-mono">
                        {((page - 1) * limit) + index + 1}
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center shadow-sm">
                            <User className="w-5 h-5 text-white" />
                          </div>
                          <span className="font-medium text-emerald-900">{item.nama}</span>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2 text-emerald-600">
                          <MapPin className="w-4 h-4" />
                          {item.lokasi}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center justify-center gap-2">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleOpenDialog(item)}
                            className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
                            data-testid={`edit-driver-${item.id}`}
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
                            data-testid={`delete-driver-${item.id}`}
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
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="text-emerald-900">
              {editItem ? 'Edit Data Driver' : 'Tambah Driver Baru'}
            </DialogTitle>
            <DialogDescription>
              Isi form di bawah untuk {editItem ? 'memperbarui' : 'menambahkan'} data driver
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="nama">Nama Driver</Label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                <Input
                  id="nama"
                  value={formData.nama}
                  onChange={(e) => setFormData({ ...formData, nama: e.target.value })}
                  placeholder="Masukkan nama driver"
                  className="pl-10 border-emerald-200"
                  required
                  data-testid="input-driver-nama"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="lokasi">Lokasi Tempat Tinggal</Label>
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-emerald-400" />
                <Input
                  id="lokasi"
                  value={formData.lokasi}
                  onChange={(e) => setFormData({ ...formData, lokasi: e.target.value })}
                  placeholder="Contoh: Pekanbaru, Duri, Dumai"
                  className="pl-10 border-emerald-200"
                  required
                  data-testid="input-driver-lokasi"
                />
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
                data-testid="submit-driver-btn"
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
            <DialogTitle className="text-red-600">Hapus Driver</DialogTitle>
            <DialogDescription>
              Apakah Anda yakin ingin menghapus driver <strong>{deleteItem?.nama}</strong>? Tindakan ini tidak dapat dibatalkan.
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
              data-testid="confirm-delete-driver-btn"
            >
              Hapus
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default DriversPage;
