import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail, Lock, User, Bus, ArrowRight } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Label } from '../components/ui/label';

const LoginPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [nama, setNama] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  
  const { login, register } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    
    try {
      if (isLogin) {
        await login(email, password);
        toast.success('Login berhasil!', { description: 'Selamat datang kembali' });
      } else {
        await register(email, password, nama);
        toast.success('Registrasi berhasil!', { description: 'Akun Anda telah dibuat' });
      }
    } catch (error) {
      const message = error.response?.data?.detail || 'Terjadi kesalahan';
      toast.error(isLogin ? 'Login gagal' : 'Registrasi gagal', { description: message });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex">
      {/* Left Side - Image */}
      <div className="hidden lg:flex lg:w-[60%] relative overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1606188521935-278fd50f7a36?crop=entropy&cs=srgb&fm=jpg&ixid=M3w3NDQ2NDN8MHwxfHNlYXJjaHwyfHxsdXh1cnklMjBidXMlMjBvbiUyMGhpZ2h3YXklMjBzY2VuaWMlMjBpbmRvbmVzaWF8ZW58MHx8fHwxNzczMjQyNDYzfDA&ixlib=rb-4.1.0&q=85)'
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/90 via-emerald-800/80 to-emerald-700/70" />
        
        {/* Content on image */}
        <div className="relative z-10 flex flex-col justify-between p-12 text-white">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
              <Bus className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold tracking-tight">Pekanbaru Transit</h1>
              <p className="text-emerald-200 text-sm">Management System</p>
            </div>
          </div>
          
          {/* Quote */}
          <div className="max-w-lg">
            <blockquote className="text-4xl font-bold leading-tight mb-6 text-balance">
              "Mengantar Anda dengan Aman & Nyaman"
            </blockquote>
            <p className="text-emerald-100 text-lg leading-relaxed">
              Sistem manajemen transportasi terpadu untuk pengelolaan armada, 
              driver, dan keberangkatan yang lebih efisien.
            </p>
          </div>
          
          {/* Stats */}
          <div className="flex gap-8">
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-3xl font-bold">500+</p>
              <p className="text-emerald-200 text-sm">Perjalanan/Bulan</p>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-3xl font-bold">50+</p>
              <p className="text-emerald-200 text-sm">Armada Aktif</p>
            </div>
            <div className="p-4 rounded-xl bg-white/10 backdrop-blur-sm">
              <p className="text-3xl font-bold">98%</p>
              <p className="text-emerald-200 text-sm">Kepuasan Pelanggan</p>
            </div>
          </div>
        </div>
      </div>
      
      {/* Right Side - Form */}
      <div className="w-full lg:w-[40%] flex items-center justify-center p-8 bg-white">
        <div className="w-full max-w-md">
          {/* Mobile Logo */}
          <div className="lg:hidden flex items-center gap-3 mb-8 justify-center">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-emerald-600 to-emerald-500 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Bus className="w-7 h-7 text-white" />
            </div>
            <div>
              <h1 className="text-xl font-bold text-emerald-900">Pekanbaru Transit</h1>
              <p className="text-emerald-600 text-sm">Management System</p>
            </div>
          </div>
          
          {/* Form Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-emerald-900 mb-2">
              {isLogin ? 'Selamat Datang!' : 'Buat Akun Baru'}
            </h2>
            <p className="text-emerald-600">
              {isLogin 
                ? 'Masuk ke akun Anda untuk melanjutkan' 
                : 'Daftar untuk mulai menggunakan sistem'}
            </p>
          </div>
          
          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            {!isLogin && (
              <div className="space-y-2 animate-fade-in">
                <Label htmlFor="nama" className="text-emerald-800 font-medium">
                  Nama Lengkap
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                  <Input
                    id="nama"
                    type="text"
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="Masukkan nama lengkap"
                    className="pl-11 h-12 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl"
                    required={!isLogin}
                    data-testid="register-nama-input"
                  />
                </div>
              </div>
            )}
            
            <div className="space-y-2">
              <Label htmlFor="email" className="text-emerald-800 font-medium">
                Email
              </Label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="nama@email.com"
                  className="pl-11 h-12 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl"
                  required
                  data-testid="login-email-input"
                />
              </div>
            </div>
            
            <div className="space-y-2">
              <Label htmlFor="password" className="text-emerald-800 font-medium">
                Password
              </Label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-emerald-400" />
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Masukkan password"
                  className="pl-11 pr-11 h-12 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500/20 rounded-xl"
                  required
                  data-testid="login-password-input"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-emerald-400 hover:text-emerald-600 transition-colors"
                  data-testid="toggle-password-visibility"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>
            
            <Button
              type="submit"
              disabled={isLoading}
              className="w-full h-12 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-700 hover:to-emerald-600 text-white font-semibold rounded-xl shadow-lg shadow-emerald-500/30 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98]"
              data-testid="login-submit-btn"
            >
              {isLoading ? (
                <div className="flex items-center gap-2">
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  <span>Memproses...</span>
                </div>
              ) : (
                <div className="flex items-center gap-2">
                  <span>{isLogin ? 'Masuk' : 'Daftar'}</span>
                  <ArrowRight className="w-5 h-5" />
                </div>
              )}
            </Button>
          </form>
          
          {/* Toggle Login/Register */}
          <div className="mt-6 text-center">
            <p className="text-emerald-600">
              {isLogin ? 'Belum punya akun?' : 'Sudah punya akun?'}
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="ml-2 text-emerald-700 font-semibold hover:text-emerald-800 transition-colors"
                data-testid="toggle-auth-mode"
              >
                {isLogin ? 'Daftar sekarang' : 'Masuk'}
              </button>
            </p>
          </div>
          
          {/* Footer */}
          <div className="mt-12 pt-6 border-t border-emerald-100 text-center">
            <p className="text-sm text-emerald-500">
              © 2024 Pekanbaru Transit. Semua hak dilindungi.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
