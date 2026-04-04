import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
    return (
        <footer className="bg-[#05070e] text-white py-14 px-6 md:px-16 shadow-[inset_0_10px_30px_rgba(0,0,0,0.5)] border-t border-gray-800/50 mt-auto">
            <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-12 text-center md:text-left">
                <div className="flex flex-col items-center md:items-start">
                    <h2 className="text-3xl font-black text-yellow-500 mb-4 tracking-tighter uppercase flex items-center justify-center md:justify-start gap-2">
                        <span className="bg-yellow-500 text-black px-2 py-0.5 rounded-md text-xl">M</span>
                        MobileMart
                    </h2>
                    <p className="text-gray-500 text-[11px] font-bold tracking-widest uppercase leading-loose max-w-xs">
                        Your premium terminal for cutting-edge mobile hardware. Experience next-level technology today.
                    </p>
                </div>
                <div>
                    <h3 className="text-lg font-black mb-6 uppercase tracking-[0.2em] text-white text-[12px] border-b-2 border-yellow-500/30 pb-2 inline-block">Quick Links</h3>
                    <ul className="space-y-4 text-xs font-bold tracking-widest uppercase text-gray-400">
                        <li><Link to="/" className="hover:text-yellow-500 transition hover:pl-2">Home</Link></li>
                        <li><Link to="/products" className="hover:text-yellow-500 transition hover:pl-2">Shop</Link></li>
                        <li><Link to="/cart" className="hover:text-yellow-500 transition hover:pl-2">Cart</Link></li>
                        <li><Link to="/profile" className="hover:text-yellow-500 transition hover:pl-2">Profile</Link></li>
                    </ul>
                </div>
                <div>
                    <h3 className="text-lg font-black mb-6 uppercase tracking-[0.2em] text-white text-[12px] border-b-2 border-yellow-500/30 pb-2 inline-block">Contact</h3>
                    <ul className="space-y-4 text-xs font-bold tracking-widest uppercase text-gray-500">
                        <li className="hover:text-gray-300 transition cursor-pointer">support@mobilemart.com</li>
                        <li className="hover:text-gray-300 transition cursor-pointer">1-800-MOBILE</li>
                        <li className="hover:text-gray-300 transition cursor-pointer">Tech Hub, Silicon Valley</li>
                    </ul>
                </div>
            </div>
            <div className="container mx-auto mt-16 pt-8 border-t border-gray-800/50 text-center text-[10px] font-black uppercase tracking-[0.3em] text-gray-700">
                &copy; {new Date().getFullYear()} MobileMart Global. All rights reserved.
            </div>
        </footer>
    );
};

export default Footer;
