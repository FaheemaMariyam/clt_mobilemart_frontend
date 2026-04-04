import React, { useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { FaChartPie, FaBox, FaUsers, FaSignOutAlt, FaShieldAlt, FaUserCircle, FaBars, FaTimes } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const navigate = useNavigate();
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    const activeClass = "p-4 bg-yellow-500 text-black rounded-2xl transition font-black uppercase tracking-widest text-[10px] flex items-center gap-3 shadow-lg shadow-yellow-500/20";
    const inactiveClass = "p-4 hover:bg-gray-800 text-gray-400 hover:text-white rounded-2xl transition font-black uppercase tracking-widest text-[10px] flex items-center gap-3 group";

    return (
        <div className="flex flex-col lg:flex-row min-h-screen bg-[#0F111A]">
            
            {/* Mobile Top Bar */}
            <div className="lg:hidden bg-[#141621] p-6 border-b border-gray-800 flex justify-between items-center z-30 sticky top-0">
                <h1 className="text-xl font-black text-white tracking-widest uppercase italic">
                    Mobile<span className="text-yellow-500">Mart</span>
                </h1>
                <button 
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    className="text-white p-2 focus:outline-none"
                >
                    {isMobileMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
                </button>
            </div>

            {/* Sidebar (Responsive overlay on mobile, fixed left on desktop) */}
            <aside className={`
                fixed inset-0 z-40 bg-[#141621] border-r border-gray-800 flex-col 
                overflow-y-auto transition-transform transform 
                ${isMobileMenuOpen ? 'translate-x-0 flex' : '-translate-x-full hidden'} 
                lg:translate-x-0 lg:flex lg:w-80 lg:sticky lg:top-0 lg:h-screen lg:relative
            `}>
                
                {/* Brand Logo Section (Visible mainly on desktop) */}
                <div className="p-10 border-b border-gray-800/50 hidden lg:block">
                    <h1 className="text-2xl font-black text-white tracking-widest uppercase italic">
                        Mobile<span className="text-yellow-500">Mart</span>
                    </h1>
                    <p className="text-[9px] font-bold text-gray-500 uppercase tracking-[0.4em] mt-1 pr-1">Admin OS v1.2</p>
                </div>

                {/* User Context Section */}
                <div className="p-8 border-b border-gray-800/50 bg-gradient-to-b from-gray-800/5 to-transparent">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-yellow-500/10 text-yellow-500 rounded-2xl flex items-center justify-center border border-yellow-500/20 font-black shrink-0">
                            <FaUserCircle className="text-2xl opacity-50" />
                        </div>
                        <div className="flex-1 min-w-0">
                            <h3 className="text-xs font-black text-white uppercase tracking-wider truncate leading-none mb-1">
                                {user?.first_name || 'Administrator'}
                            </h3>
                            <div className="flex items-center gap-2">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse shadow-[0_0_5px_rgba(34,197,94,0.5)] shrink-0"></span>
                                <span className="text-[8px] font-black text-gray-500 uppercase tracking-widest truncate">Active System Manager</span>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Navigation Section */}
                <nav className="flex-1 p-6 space-y-2">
                    <div className="mb-4">
                        <span className="text-[8px] font-black text-gray-600 uppercase tracking-widest ml-4">Core Management</span>
                    </div>
                    <NavLink to="/admin" end onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : inactiveClass}>
                        <FaChartPie className="shrink-0" />
                        Overview Summary
                    </NavLink>
                    <NavLink to="/admin/products" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : inactiveClass}>
                        <FaBox className="shrink-0" />
                        Storage & Inventory
                    </NavLink>
                    <NavLink to="/admin/users" onClick={() => setIsMobileMenuOpen(false)} className={({ isActive }) => isActive ? activeClass : inactiveClass}>
                        <FaUsers className="shrink-0" />
                        Account Governance
                    </NavLink>
                </nav>

                {/* System Action Section */}
                <div className="p-6 mt-auto border-t border-gray-800/50">
                    <button 
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center gap-3 p-4 text-[10px] font-black text-red-500 hover:text-white uppercase tracking-widest bg-red-500/5 hover:bg-red-500/20 rounded-2xl transition border border-red-500/20 border-dashed"
                    >
                        <FaSignOutAlt className="shrink-0" />
                        Terminate Session
                    </button>
                    <div className="mt-4 flex items-center justify-center gap-2 opacity-30">
                        <FaShieldAlt className="text-gray-500 text-[8px] shrink-0" />
                        <span className="text-[8px] font-bold text-gray-600 uppercase tracking-widest text-center">Secure Admin Access Only</span>
                    </div>
                </div>
            </aside>

            {/* Main Content Area */}
            <main className="flex-1 p-4 sm:p-8 lg:p-12 relative overflow-y-auto">
                <div className="max-w-7xl mx-auto space-y-8 animate-in fade-in duration-700 mt-4 lg:mt-0">
                    <div className="flex items-center justify-between">
                        <div className="space-y-1">
                            <h2 className="text-[10px] font-black text-gray-600 uppercase tracking-[0.3em]">Work Station</h2>
                            <p className="text-sm font-bold text-gray-400 capitalize">Welcome back, {user?.first_name || 'Admin'} • Environment is Stable</p>
                        </div>
                    </div>

                    {/* Actual dynamic dashboard content */}
                    <div className="bg-[#1A1C29]/50 border border-gray-800 rounded-[20px] md:rounded-[40px] p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-sm min-h-[80vh]">
                        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-yellow-500/5 blur-[120px] -mr-64 -mt-64 pointer-events-none"></div>
                        <Outlet />
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminDashboard;
