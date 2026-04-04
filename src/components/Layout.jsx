import React from 'react';
import Navbar from './Navbar';
import { Toaster } from 'react-hot-toast';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
    const { isAdmin } = useAuth();

    return (
        <div className="min-h-screen bg-[#0f172a] flex flex-col">
            {!isAdmin && <Navbar />}
            <main className="flex-1 w-full flex flex-col">
                {children}
            </main>
            <Toaster position="top-right" />
        </div>
    );
};

export default Layout;
