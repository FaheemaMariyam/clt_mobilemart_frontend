import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
    const { user, logout, isAdmin } = useAuth();
    const { cartCount } = useCart();
    const navigate = useNavigate();
    const location = useLocation();
    const [mobileOpen, setMobileOpen] = useState(false);

    const handleLogout = () => {
        logout();
        setMobileOpen(false);
        navigate('/login');
    };

    const closeMobile = () => setMobileOpen(false);

    const isActive = (path) => location.pathname === path;

    return (
        <header className="sticky top-0 z-50">
            <nav className="bg-black text-white shadow-lg">
                <div className="container mx-auto px-4 md:px-6">
                    <div className="flex justify-between items-center h-16">
                        <Link to="/" className="text-2xl font-black text-yellow-500 tracking-tight" onClick={closeMobile}>
                            MobileMart
                        </Link>

                        <div className="hidden md:flex gap-6 items-center font-medium text-sm">
                            <Link to="/" className={`hover:text-yellow-400 transition ${isActive('/') ? 'text-yellow-400' : ''}`}>Home</Link>
                            <Link to="/products" className={`hover:text-yellow-400 transition ${isActive('/products') ? 'text-yellow-400' : ''}`}>Shop</Link>
                            
                            {user ? (
                                <>
                                    {isAdmin ? (
                                        <Link to="/admin" className="hover:text-yellow-400 transition font-bold text-red-400">Admin</Link>
                                    ) : (
                                        <Link to="/cart" className="group relative flex items-center justify-center p-2.5 bg-white/5 hover:bg-yellow-500 rounded-2xl transition-all duration-300 border border-white/10 hover:border-yellow-500/50 shadow-xl overflow-hidden">
                                            <div className="absolute inset-0 bg-yellow-500 opacity-0 group-hover:opacity-10 transition-opacity"></div>
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white group-hover:text-black transition-colors" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                            {cartCount > 0 && (
                                                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black text-[9px] font-black px-1.5 py-0.5 rounded-full border-2 border-black animate-pulse">
                                                    {cartCount}
                                                </span>
                                            )}
                                        </Link>
                                    )}
                                    <Link to="/profile" className="hover:text-yellow-400 transition flex items-center gap-1">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                        Profile
                                    </Link>
                                    <button onClick={handleLogout} className="bg-yellow-500 text-black px-5 py-1.5 rounded-full font-bold hover:bg-yellow-400 transition transform hover:scale-105">Logout</button>
                                </>
                            ) : (
                                <>
                                    <Link to="/login" className="bg-yellow-500 text-black px-6 py-1.5 rounded-full font-bold hover:bg-yellow-400 transition transform hover:scale-105">Login</Link>
                                </>
                            )}
                        </div>

                        <div className="flex items-center gap-3 md:hidden">
                            {user && !isAdmin && (
                                <Link to="/cart" className="relative text-white" onClick={closeMobile}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                    {cartCount > 0 && (
                                        <span className="absolute -top-1.5 -right-2 bg-red-500 text-white text-[10px] font-bold px-1 py-0.5 rounded-full leading-none">
                                            {cartCount}
                                        </span>
                                    )}
                                </Link>
                            )}
                            <button
                                onClick={() => setMobileOpen(!mobileOpen)}
                                className="text-white focus:outline-none p-1"
                                aria-label="Toggle menu"
                            >
                                {mobileOpen ? (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                                ) : (
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" /></svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                <div className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out ${mobileOpen ? 'max-h-96 border-t border-gray-800' : 'max-h-0'}`}>
                    <div className="container mx-auto px-4 py-4 flex flex-col gap-3 text-sm font-medium bg-[#0a0a0a]">
                        <Link to="/" onClick={closeMobile} className={`py-2 px-3 rounded-lg transition ${isActive('/') ? 'bg-yellow-500/10 text-yellow-400' : 'hover:bg-gray-800'}`}>
                            Home
                        </Link>
                        <Link to="/products" onClick={closeMobile} className={`py-2 px-3 rounded-lg transition ${isActive('/products') ? 'bg-yellow-500/10 text-yellow-400' : 'hover:bg-gray-800'}`}>
                            Shop
                        </Link>

                        {user ? (
                            <>
                                {isAdmin ? (
                                    <Link to="/admin" onClick={closeMobile} className="py-2 px-3 rounded-lg transition text-red-400 hover:bg-gray-800 font-bold">
                                        Admin Dashboard
                                    </Link>
                                ) : (
                                    <Link to="/cart" onClick={closeMobile} className={`py-2 px-3 rounded-lg transition flex items-center justify-between ${isActive('/cart') ? 'bg-yellow-500/10 text-yellow-400' : 'hover:bg-gray-800'}`}>
                                        <span className="flex items-center gap-2">
                                            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" /></svg>
                                            Cart
                                        </span>
                                        {cartCount > 0 && (
                                            <span className="bg-red-500 text-white text-xs font-bold px-2 py-0.5 rounded-full">{cartCount}</span>
                                        )}
                                    </Link>
                                )}

                                <Link to="/profile" onClick={closeMobile} className={`py-2 px-3 rounded-lg transition flex items-center gap-2 ${isActive('/profile') ? 'bg-yellow-500/10 text-yellow-400' : 'hover:bg-gray-800'}`}>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>
                                    Profile Settings
                                </Link>

                                <div className="border-t border-gray-800 my-1"></div>

                                <button
                                    onClick={handleLogout}
                                    className="w-full bg-yellow-500 text-black py-2.5 rounded-xl font-bold hover:bg-yellow-400 transition text-center"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <div className="border-t border-gray-800 my-1"></div>
                                <Link to="/login" onClick={closeMobile} className="w-full bg-yellow-500 text-black py-2.5 rounded-xl font-bold hover:bg-yellow-400 transition text-center block">
                                    Login
                                </Link>
                                <Link to="/register" onClick={closeMobile} className="w-full border border-yellow-500 text-yellow-500 py-2.5 rounded-xl font-bold hover:bg-yellow-500/10 transition text-center block">
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </nav>
            <div className="bg-yellow-500 overflow-hidden py-1 border-b border-yellow-600">
                <div className="animate-marquee whitespace-nowrap text-xs font-bold text-black uppercase tracking-widest">
                    🎉 Special Offer! • We are giving you an offer of 1000/- OFF • Use Code: SAVE10 🎁 + Free Shipping • 🔥 Special Offer! • We are giving you an offer of 1000/- OFF • Use Code: SAVE10 🎁 + Free Shipping • 🎉 Special Offer! • We are giving you an offer of 1000/- OFF • Use Code: SAVE10 🎁 + Free Shipping • 
                </div>
            </div>
        </header>
    );
};

export default Navbar;
