import { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { 
  TrendingUp, 
  Users, 
  Car, 
  Bus, 
  DollarSign, 
  Package,
  RefreshCw,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '../components/ui/card';
import { Button } from '../components/ui/button';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  PieChart,
  Pie,
  Cell
} from 'recharts';

const API_URL = process.env.REACT_APP_BACKEND_URL;

const formatCurrency = (value) => {
  return new Intl.NumberFormat('id-ID', {
    style: 'currency',
    currency: 'IDR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  }).format(value);
};

const COLORS = ['#059669', '#10B981', '#34D399', '#6EE7B7', '#A7F3D0'];

const DashboardPage = () => {
  const { getAuthHeader } = useAuth();
  const [stats, setStats] = useState(null);
  const [revenueData, setRevenueData] = useState([]);
  const [mobilRevenue, setMobilRevenue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [seeding, setSeeding] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
      const [statsRes, revenueRes, mobilRes] = await Promise.all([
        axios.get(`${API_URL}/api/statistics/dashboard`, { headers: getAuthHeader() }),
        axios.get(`${API_URL}/api/statistics/revenue-chart`, { headers: getAuthHeader() }),
        axios.get(`${API_URL}/api/statistics/mobil-revenue`, { headers: getAuthHeader() })
      ]);
      
      setStats(statsRes.data);
      setRevenueData(revenueRes.data);
      setMobilRevenue(mobilRes.data);
    } catch (error) {
      toast.error('Gagal memuat data', { description: 'Silakan coba lagi' });
    } finally {
      setLoading(false);
    }
  };

  const handleSeedData = async () => {
    setSeeding(true);
    try {
      await axios.post(`${API_URL}/api/seed`, {}, { headers: getAuthHeader() });
      toast.success('Data dummy berhasil dibuat!');
      fetchData();
    } catch (error) {
      toast.error('Gagal membuat data dummy');
    } finally {
      setSeeding(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const statCards = [
    {
      title: 'Total Pendapatan Bersih',
      value: stats?.total_uang_bersih || 0,
      format: 'currency',
      icon: DollarSign,
      color: 'emerald',
      trend: '+12.5%',
      trendUp: true
    },
    {
      title: 'Uang PC (15%)',
      value: stats?.total_uang_pc || 0,
      format: 'currency',
      icon: TrendingUp,
      color: 'amber',
      trend: '+8.2%',
      trendUp: true
    },
    {
      title: 'Total Keberangkatan',
      value: stats?.total_keberangkatan || 0,
      format: 'number',
      icon: Bus,
      color: 'blue',
      trend: '+15 trip',
      trendUp: true
    },
    {
      title: 'Total Penumpang',
      value: stats?.total_penumpang || 0,
      format: 'number',
      icon: Users,
      color: 'purple',
      trend: '+120 orang',
      trendUp: true
    },
    {
      title: 'Total Driver',
      value: stats?.total_drivers || 0,
      format: 'number',
      icon: Users,
      color: 'teal',
      trend: 'Aktif',
      trendUp: true
    },
    {
      title: 'Total Mobil',
      value: stats?.total_mobil || 0,
      format: 'number',
      icon: Car,
      color: 'indigo',
      trend: 'Operasional',
      trendUp: true
    }
  ];

  const getColorClass = (color) => {
    const colors = {
      emerald: 'from-emerald-500 to-emerald-400',
      amber: 'from-amber-500 to-amber-400',
      blue: 'from-blue-500 to-blue-400',
      purple: 'from-purple-500 to-purple-400',
      teal: 'from-teal-500 to-teal-400',
      indigo: 'from-indigo-500 to-indigo-400'
    };
    return colors[color] || colors.emerald;
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-emerald-600 font-medium">Memuat data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Header Actions */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl lg:text-3xl font-bold text-emerald-900">Dashboard</h1>
          <p className="text-emerald-600">Ringkasan statistik dan performa armada</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={fetchData}
            className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
            data-testid="refresh-dashboard-btn"
          >
            <RefreshCw className="w-4 h-4 mr-2" />
            Refresh
          </Button>
          <Button
            onClick={handleSeedData}
            disabled={seeding}
            className="bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white"
            data-testid="seed-data-btn"
          >
            {seeding ? (
              <>
                <RefreshCw className="w-4 h-4 mr-2 animate-spin" />
                Memproses...
              </>
            ) : (
              <>
                <Package className="w-4 h-4 mr-2" />
                Buat Data Dummy
              </>
            )}
          </Button>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-6">
        {statCards.map((stat, index) => (
          <Card 
            key={index} 
            className="relative overflow-hidden border-emerald-100 hover:shadow-lg transition-all duration-300"
            data-testid={`stat-card-${stat.title.toLowerCase().replace(/\s+/g, '-')}`}
          >
            <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${getColorClass(stat.color)} opacity-10 rounded-full -translate-y-1/2 translate-x-1/2`} />
            <CardContent className="p-6">
              <div className="flex items-start justify-between">
                <div>
                  <p className="text-emerald-600 text-sm font-medium mb-1">{stat.title}</p>
                  <p className="text-2xl lg:text-3xl font-bold text-emerald-900">
                    {stat.format === 'currency' 
                      ? formatCurrency(stat.value)
                      : stat.value.toLocaleString('id-ID')}
                  </p>
                  <div className="flex items-center gap-1 mt-2">
                    {stat.trendUp ? (
                      <ArrowUpRight className="w-4 h-4 text-emerald-500" />
                    ) : (
                      <ArrowDownRight className="w-4 h-4 text-red-500" />
                    )}
                    <span className={`text-sm font-medium ${stat.trendUp ? 'text-emerald-500' : 'text-red-500'}`}>
                      {stat.trend}
                    </span>
                  </div>
                </div>
                <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getColorClass(stat.color)} flex items-center justify-center shadow-lg`}>
                  <stat.icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Revenue Chart */}
        <Card className="border-emerald-100" data-testid="revenue-chart-card">
          <CardHeader>
            <CardTitle className="text-emerald-900">Grafik Pendapatan</CardTitle>
            <CardDescription>Pendapatan bersih dan Uang PC per bulan</CardDescription>
          </CardHeader>
          <CardContent>
            {revenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                  <XAxis 
                    dataKey="bulan" 
                    stroke="#047857"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="#047857"
                    tick={{ fontSize: 12 }}
                    tickFormatter={(value) => `${(value / 1000000).toFixed(0)}jt`}
                  />
                  <Tooltip 
                    formatter={(value) => formatCurrency(value)}
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #d1fae5',
                      borderRadius: '8px'
                    }}
                  />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="uang_bersih" 
                    name="Pendapatan Bersih"
                    stroke="#059669" 
                    strokeWidth={3}
                    dot={{ fill: '#059669', strokeWidth: 2 }}
                  />
                  <Line 
                    type="monotone" 
                    dataKey="uang_pc" 
                    name="Uang PC"
                    stroke="#f59e0b" 
                    strokeWidth={3}
                    dot={{ fill: '#f59e0b', strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-emerald-500">
                Belum ada data keberangkatan
              </div>
            )}
          </CardContent>
        </Card>

        {/* Passenger Chart */}
        <Card className="border-emerald-100" data-testid="passenger-chart-card">
          <CardHeader>
            <CardTitle className="text-emerald-900">Jumlah Penumpang</CardTitle>
            <CardDescription>Total penumpang per bulan</CardDescription>
          </CardHeader>
          <CardContent>
            {revenueData.length > 0 ? (
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={revenueData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#d1fae5" />
                  <XAxis 
                    dataKey="bulan" 
                    stroke="#047857"
                    tick={{ fontSize: 12 }}
                  />
                  <YAxis 
                    stroke="#047857"
                    tick={{ fontSize: 12 }}
                  />
                  <Tooltip 
                    contentStyle={{
                      backgroundColor: 'white',
                      border: '1px solid #d1fae5',
                      borderRadius: '8px'
                    }}
                  />
                  <Bar 
                    dataKey="penumpang" 
                    name="Penumpang"
                    fill="#10B981" 
                    radius={[4, 4, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-[300px] flex items-center justify-center text-emerald-500">
                Belum ada data keberangkatan
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Mobil Revenue */}
      <Card className="border-emerald-100" data-testid="mobil-revenue-card">
        <CardHeader>
          <CardTitle className="text-emerald-900">Pendapatan per Mobil</CardTitle>
          <CardDescription>Total pendapatan bersih berdasarkan kode mobil</CardDescription>
        </CardHeader>
        <CardContent>
          {mobilRevenue.length > 0 ? (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={mobilRevenue}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="total_uang_bersih"
                    nameKey="kode_mobil"
                    label={({ kode_mobil }) => kode_mobil}
                  >
                    {mobilRevenue.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(value)} />
                </PieChart>
              </ResponsiveContainer>
              
              <div className="space-y-3">
                {mobilRevenue.map((item, index) => (
                  <div 
                    key={item.kode_mobil}
                    className="flex items-center justify-between p-4 rounded-xl bg-emerald-50/50 border border-emerald-100"
                  >
                    <div className="flex items-center gap-3">
                      <div 
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <div>
                        <p className="font-semibold text-emerald-900">{item.kode_mobil}</p>
                        <p className="text-sm text-emerald-600">{item.total_trips} trip</p>
                      </div>
                    </div>
                    <p className="font-bold text-emerald-700">{formatCurrency(item.total_uang_bersih)}</p>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="h-[200px] flex items-center justify-center text-emerald-500">
              Belum ada data pendapatan per mobil
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default DashboardPage;
