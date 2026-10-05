import React, { useState } from 'react';
import { User, Bell, ChevronDown, Scissors, ShieldCheck, Sparkles, CheckCircle2 } from 'lucide-react';
import { db } from '../../services/db';
import { User as UserType, NotificationItem } from '../../types';

interface HeaderProps {
  currentUser: UserType;
  onRoleSwitch: (role: 'customer' | 'admin', customerId?: string) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onOpenNotifications: () => void;
  unreadCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  currentUser,
  onRoleSwitch,
  activeTab,
  setActiveTab,
  onOpenNotifications,
  unreadCount,
}) => {
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const customers = db.getCustomers();

  return (
    <header className="sticky top-0 z-40 bg-[#FAF7F2]/95 backdrop-blur-md border-b border-[#E8E1D5]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        {/* Zone 1: Brand title, single line text element wordmark */}
        <div className="flex items-center gap-3">
          <button
            onClick={() => setActiveTab('home')}
            className="text-left group cursor-pointer"
          >
            <span className="font-serif text-2xl sm:text-3xl font-semibold tracking-tight text-[#1A1716] group-hover:text-[#6B1D2F] transition-colors">
              Thread & Style
            </span>
            <span className="hidden sm:inline-block ml-3 text-xs tracking-widest uppercase font-medium text-[#7C7164]">
              Haute Couture Atelier
            </span>
          </button>
        </div>

        {/* Zone 2: 4-6 clean nav links with subtle hover underlines */}
        <nav className="hidden lg:flex items-center gap-7 text-sm font-medium text-[#544B41]">
          <button
            onClick={() => setActiveTab('home')}
            className={`transition-colors relative py-1 hover:text-[#1A1716] cursor-pointer ${
              activeTab === 'home' ? 'text-[#6B1D2F] font-semibold' : ''
            }`}
          >
            Atelier
            {activeTab === 'home' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6B1D2F] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('designs')}
            className={`transition-colors relative py-1 hover:text-[#1A1716] cursor-pointer ${
              activeTab === 'designs' ? 'text-[#6B1D2F] font-semibold' : ''
            }`}
          >
            Collections
            {activeTab === 'designs' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6B1D2F] rounded-full" />
            )}
          </button>

          <button
            onClick={() => setActiveTab('designer')}
            className={`transition-colors relative py-1 hover:text-[#1A1716] cursor-pointer ${
              activeTab === 'designer' ? 'text-[#6B1D2F] font-semibold' : ''
            }`}
          >
            Custom Designer
            {activeTab === 'designer' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6B1D2F] rounded-full" />
            )}
          </button>

          {currentUser.role === 'customer' ? (
            <>
              <button
                onClick={() => setActiveTab('customer_dashboard')}
                className={`transition-colors relative py-1 hover:text-[#1A1716] cursor-pointer ${
                  activeTab === 'customer_dashboard' ? 'text-[#6B1D2F] font-semibold' : ''
                }`}
              >
                My Orders & Timeline
                {activeTab === 'customer_dashboard' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6B1D2F] rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('measurements')}
                className={`transition-colors relative py-1 hover:text-[#1A1716] cursor-pointer ${
                  activeTab === 'measurements' ? 'text-[#6B1D2F] font-semibold' : ''
                }`}
              >
                Measurements
                {activeTab === 'measurements' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6B1D2F] rounded-full" />
                )}
              </button>
            </>
          ) : (
            <>
              <button
                onClick={() => setActiveTab('admin_dashboard')}
                className={`transition-colors relative py-1 hover:text-[#1A1716] cursor-pointer ${
                  activeTab === 'admin_dashboard' ? 'text-[#6B1D2F] font-semibold' : ''
                }`}
              >
                Admin Console
                {activeTab === 'admin_dashboard' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6B1D2F] rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('admin_orders')}
                className={`transition-colors relative py-1 hover:text-[#1A1716] cursor-pointer ${
                  activeTab === 'admin_orders' ? 'text-[#6B1D2F] font-semibold' : ''
                }`}
              >
                Manage Orders
                {activeTab === 'admin_orders' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6B1D2F] rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('admin_fabrics')}
                className={`transition-colors relative py-1 hover:text-[#1A1716] cursor-pointer ${
                  activeTab === 'admin_fabrics' ? 'text-[#6B1D2F] font-semibold' : ''
                }`}
              >
                Fabrics
                {activeTab === 'admin_fabrics' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6B1D2F] rounded-full" />
                )}
              </button>

              <button
                onClick={() => setActiveTab('admin_tailors')}
                className={`transition-colors relative py-1 hover:text-[#1A1716] cursor-pointer ${
                  activeTab === 'admin_tailors' ? 'text-[#6B1D2F] font-semibold' : ''
                }`}
              >
                Tailors
                {activeTab === 'admin_tailors' && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6B1D2F] rounded-full" />
                )}
              </button>
            </>
          )}

          <button
            onClick={() => setActiveTab('appointments')}
            className={`transition-colors relative py-1 hover:text-[#1A1716] cursor-pointer ${
              activeTab === 'appointments' ? 'text-[#6B1D2F] font-semibold' : ''
            }`}
          >
            Appointments
            {activeTab === 'appointments' && (
              <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#6B1D2F] rounded-full" />
            )}
          </button>
        </nav>

        {/* Zone 3: 1-2 primary actions */}
        <div className="flex items-center gap-3">
          {/* Notification Bell */}
          <button
            onClick={onOpenNotifications}
            className="relative p-2.5 rounded-full text-[#544B41] hover:text-[#1A1716] hover:bg-[#EFE9DE] transition-colors cursor-pointer"
            title="Notifications"
          >
            <Bell className="w-5 h-5" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 w-4 h-4 bg-[#6B1D2F] text-white text-[10px] font-bold rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>

          {/* Role & Persona Switcher */}
          <div className="relative">
            <button
              onClick={() => setShowRoleMenu(!showRoleMenu)}
              className="flex items-center gap-2 pl-3 pr-2.5 py-1.5 rounded-full bg-[#EFE9DE] border border-[#DDD4C5] text-xs font-medium text-[#2C2723] hover:border-[#6B1D2F]/40 transition-colors cursor-pointer"
            >
              <span className="w-2 h-2 rounded-full bg-[#6B1D2F]" />
              <span className="max-w-[110px] truncate">{currentUser.name}</span>
              <span className="text-[10px] px-1.5 py-0.5 rounded bg-white/70 text-[#6B1D2F] font-semibold uppercase">
                {currentUser.role}
              </span>
              <ChevronDown className="w-3.5 h-3.5 text-[#6E645A]" />
            </button>

            {showRoleMenu && (
              <div className="absolute right-0 mt-2 w-72 bg-[#FAF7F2] border border-[#DDD4C5] rounded-xl shadow-xl py-2 z-50 animate-in fade-in zoom-in-95 duration-100">
                <div className="px-3 py-2 border-b border-[#E8E1D5]">
                  <p className="text-xs text-[#7C7164]">Logged in as</p>
                  <p className="text-sm font-semibold text-[#1A1716] truncate">{currentUser.name}</p>
                  <p className="text-xs text-[#8C8275]">{currentUser.email}</p>
                </div>

                <div className="px-3 py-1.5 text-[11px] font-semibold text-[#7C7164] uppercase tracking-wider">
                  Switch Active Role
                </div>

                {/* Admin Persona */}
                <button
                  onClick={() => {
                    onRoleSwitch('admin');
                    setShowRoleMenu(false);
                    setActiveTab('admin_dashboard');
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-[#F1ECE1] transition-colors ${
                    currentUser.role === 'admin' ? 'bg-[#ECE5D8] font-semibold text-[#6B1D2F]' : 'text-[#3E3831]'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="w-4 h-4 text-[#6B1D2F]" />
                    <div>
                      <p>Meera Krishnan</p>
                      <p className="text-[10px] text-[#7C7164]">Boutique Owner / Admin</p>
                    </div>
                  </div>
                  {currentUser.role === 'admin' && <CheckCircle2 className="w-4 h-4 text-[#6B1D2F]" />}
                </button>

                <div className="border-t border-[#E8E1D5] my-1" />
                <div className="px-3 py-1 text-[11px] font-semibold text-[#7C7164] uppercase tracking-wider">
                  Test As Customer
                </div>

                {/* Customers list */}
                <div className="max-h-48 overflow-y-auto">
                  {customers.slice(0, 5).map((cust) => (
                    <button
                      key={cust.id}
                      onClick={() => {
                        onRoleSwitch('customer', cust.id);
                        setShowRoleMenu(false);
                        setActiveTab('customer_dashboard');
                      }}
                      className={`w-full text-left px-3 py-1.5 text-xs flex items-center justify-between hover:bg-[#F1ECE1] transition-colors ${
                        currentUser.role === 'customer' && currentUser.name === cust.name
                          ? 'bg-[#ECE5D8] font-semibold text-[#6B1D2F]'
                          : 'text-[#3E3831]'
                      }`}
                    >
                      <div>
                        <p>{cust.name}</p>
                        <p className="text-[10px] text-[#7C7164]">{cust.city}</p>
                      </div>
                      {currentUser.role === 'customer' && currentUser.name === cust.name && (
                        <CheckCircle2 className="w-4 h-4 text-[#6B1D2F]" />
                      )}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Quick CTA */}
          <button
            onClick={() => setActiveTab('designer')}
            className="hidden sm:inline-flex items-center gap-1.5 px-4 py-2 rounded-lg bg-[#6B1D2F] text-white text-xs font-semibold hover:bg-[#521322] transition-colors shadow-xs cursor-pointer"
          >
            <Scissors className="w-3.5 h-3.5" />
            <span>Design Outfit</span>
          </button>
        </div>
      </div>

      {/* Mobile sub-navigation bar */}
      <div className="lg:hidden flex items-center justify-around py-2 border-t border-[#EAE3D7] bg-[#F7F2E9] text-xs font-medium text-[#655C50] overflow-x-auto px-2">
        <button
          onClick={() => setActiveTab('home')}
          className={`px-2 py-1 rounded cursor-pointer ${activeTab === 'home' ? 'text-[#6B1D2F] font-bold bg-[#ECE3D5]' : ''}`}
        >
          Atelier
        </button>
        <button
          onClick={() => setActiveTab('designs')}
          className={`px-2 py-1 rounded cursor-pointer ${activeTab === 'designs' ? 'text-[#6B1D2F] font-bold bg-[#ECE3D5]' : ''}`}
        >
          Collections
        </button>
        <button
          onClick={() => setActiveTab('designer')}
          className={`px-2 py-1 rounded cursor-pointer ${activeTab === 'designer' ? 'text-[#6B1D2F] font-bold bg-[#ECE3D5]' : ''}`}
        >
          Customizer
        </button>
        {currentUser.role === 'customer' ? (
          <>
            <button
              onClick={() => setActiveTab('customer_dashboard')}
              className={`px-2 py-1 rounded cursor-pointer ${activeTab === 'customer_dashboard' ? 'text-[#6B1D2F] font-bold bg-[#ECE3D5]' : ''}`}
            >
              My Orders
            </button>
            <button
              onClick={() => setActiveTab('measurements')}
              className={`px-2 py-1 rounded cursor-pointer ${activeTab === 'measurements' ? 'text-[#6B1D2F] font-bold bg-[#ECE3D5]' : ''}`}
            >
              Measurements
            </button>
          </>
        ) : (
          <button
            onClick={() => setActiveTab('admin_dashboard')}
            className={`px-2 py-1 rounded cursor-pointer ${activeTab.startsWith('admin') ? 'text-[#6B1D2F] font-bold bg-[#ECE3D5]' : ''}`}
          >
            Admin
          </button>
        )}
        <button
          onClick={() => setActiveTab('appointments')}
          className={`px-2 py-1 rounded cursor-pointer ${activeTab === 'appointments' ? 'text-[#6B1D2F] font-bold bg-[#ECE3D5]' : ''}`}
        >
          Appointments
        </button>
      </div>
    </header>
  );
};
