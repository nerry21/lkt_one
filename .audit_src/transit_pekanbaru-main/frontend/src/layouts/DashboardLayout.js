import { useState } from 'react';
import { Outlet, NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { 
  LayoutDashboard, 
  Bus, 
  Users, 
  Car, 
  LogOut, 
  Menu, 
  X,
  ChevronRight,
  Bell,
  User
} from 'lucide-react';
import { Button } from '../components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '../components/ui/dropdown-menu';
import { toast } from 'sonner';

const menuItems = [
  { 
    path: '/dashboard', 
    icon: LayoutDashboard, 
    label: 'Dashboard',
    end: true
  },
  { 
    path: '/dashboard/keberangkatan', 
    icon: Bus, 
    label: 'Data Keberangkatan'
  },
  { 
    path: '/dashboard/drivers', 
    icon: Users, 
    label: 'Data Driver'
  },
  { 
    path: '/dashboard/mobil', 
    icon: Car, 
    label: 'Data Mobil'
  },
];

const DashboardLayout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    toast.success('Logout berhasil', { description: 'Sampai jumpa kembali!' });
    navigate('/login');
  };

  return (
    <div className="min-h-screen bg-emerald-50/50">
      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <aside className={`
        fixed top-0 left-0 z-50 h-full w-72
        bg-gradient-to-b from-emerald-900 to-emerald-950
        transform transition-transform duration-300 ease-in-out
        lg:translate-x-0
        ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-between p-6 border-b border-emerald-800/50">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center shadow-lg shadow-emerald-500/30">
              <Bus className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-white font-bold text-lg tracking-tight">Pekanbaru</h1>
              <p className="text-emerald-400 text-xs">Transit System</p>
            </div>
          </div>
          <button 
            onClick={() => setSidebarOpen(false)}
            className="lg:hidden text-emerald-400 hover:text-white transition-colors"
            data-testid="close-sidebar-btn"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        
        {/* Navigation */}
        <nav className="p-4 space-y-2">
          {menuItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              onClick={() => setSidebarOpen(false)}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl
                transition-all duration-200 group
                ${isActive 
                  ? 'bg-gradient-to-r from-emerald-600/50 to-emerald-500/30 text-white border-l-4 border-emerald-400' 
                  : 'text-emerald-300 hover:text-white hover:bg-white/5'
                }
              `}
              data-testid={`nav-${item.label.toLowerCase().replace(/\s+/g, '-')}`}
            >
              <item.icon className="w-5 h-5" />
              <span className="font-medium">{item.label}</span>
              <ChevronRight className="w-4 h-4 ml-auto opacity-0 group-hover:opacity-100 transition-opacity" />
            </NavLink>
          ))}
        </nav>
        
        {/* Sidebar Footer */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-emerald-800/50">
          <div className="flex items-center gap-3 px-4 py-3 rounded-xl bg-emerald-800/30">
            <div className="w-10 h-10 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center">
              <User className="w-5 h-5 text-white" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white font-medium text-sm truncate">{user?.nama || 'Admin'}</p>
              <p className="text-emerald-400 text-xs truncate">{user?.email}</p>
            </div>
          </div>
        </div>
      </aside>
      
      {/* Main Content */}
      <div className="lg:pl-72">
        {/* Header */}
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-emerald-100">
          <div className="flex items-center justify-between px-4 lg:px-8 py-4">
            {/* Mobile Menu Button */}
            <button 
              onClick={() => setSidebarOpen(true)}
              className="lg:hidden p-2 rounded-lg text-emerald-700 hover:bg-emerald-50 transition-colors"
              data-testid="open-sidebar-btn"
            >
              <Menu className="w-6 h-6" />
            </button>
            
            {/* Page Title - Hidden on mobile */}
            <div className="hidden lg:block">
              <h2 className="text-xl font-bold text-emerald-900">Sistem Manajemen Transportasi</h2>
              <p className="text-emerald-600 text-sm">Kelola armada dan keberangkatan dengan mudah</p>
            </div>
            
            {/* Mobile Title */}
            <div className="lg:hidden flex items-center gap-2">
              <Bus className="w-6 h-6 text-emerald-600" />
              <span className="font-bold text-emerald-900">Pekanbaru Transit</span>
            </div>
            
            {/* Header Actions */}
            <div className="flex items-center gap-3">
              {/* Notifications */}
              <button 
                className="relative p-2 rounded-lg text-emerald-600 hover:bg-emerald-50 transition-colors"
                data-testid="notifications-btn"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-amber-500 rounded-full" />
              </button>
              
              {/* User Dropdown */}
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button 
                    variant="ghost" 
                    className="flex items-center gap-2 hover:bg-emerald-50"
                    data-testid="user-menu-btn"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-emerald-500 to-emerald-400 flex items-center justify-center">
                      <User className="w-4 h-4 text-white" />
                    </div>
                    <span className="hidden sm:inline text-emerald-800 font-medium">
                      {user?.nama?.split(' ')[0] || 'Admin'}
                    </span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56">
                  <DropdownMenuLabel>
                    <div>
                      <p className="font-medium">{user?.nama}</p>
                      <p className="text-sm text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem 
                    onClick={handleLogout}
                    className="text-red-600 focus:text-red-600 cursor-pointer"
                    data-testid="logout-btn"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Keluar
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </header>
        
        {/* Page Content */}
        <main className="p-4 lg:p-8">
          <Outlet />
        </main>
        
        {/* Footer */}
        <footer className="border-t border-emerald-100 bg-white/50 px-4 lg:px-8 py-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2 text-emerald-600">
              <Bus className="w-5 h-5" />
              <span className="font-medium">Pekanbaru Transit System</span>
            </div>
            <p className="text-emerald-500 text-sm">
              © 2024 Pekanbaru Transit. Semua hak dilindungi.
            </p>
          </div>
        </footer>
      </div>
    </div>
  );
};

export default DashboardLayout;
