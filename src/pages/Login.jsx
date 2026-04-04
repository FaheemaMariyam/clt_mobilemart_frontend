import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await login(formData);
            toast.success('Logged in successfully!');
            navigate('/');
        } catch (error) {
            console.error('Login failed:', error);
            const backendError = error.response?.data;
            let msg = 'Login failed. Check your credentials.';
            
            if (backendError) {
                if (typeof backendError === 'string') {
                    msg = backendError;
                } else if (typeof backendError === 'object') {
                    // Flatten the error object to get the first available message
                    const extractMsg = (obj) => {
                        for (let key in obj) {
                            const val = obj[key];
                            if (typeof val === 'string') return val;
                            if (Array.isArray(val) && typeof val[0] === 'string') return val[0];
                            if (typeof val === 'object' && val !== null) return extractMsg(val);
                        }
                        return null;
                    };
                    msg = extractMsg(backendError) || JSON.stringify(backendError);
                }
            }
            toast.error(String(msg));
        }
    };

    return (
        <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-4 bg-gradient-to-br from-[#1E203B] to-[#12142B]">
            <div className="w-full max-w-4xl flex flex-col md:flex-row bg-[#1A1C29] rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
                
                {/* Left Side (Yellow) */}
                <div className="w-full md:w-1/2 bg-[#FFB000] p-12 flex flex-col items-center justify-center text-center">
                    <div className="bg-black p-6 rounded-2xl mb-8 shadow-lg">
                        <div className="w-16 h-16 border-4 border-yellow-500 rounded flex flex-col justify-between p-1 items-center">
                            <div className="w-6 h-1 bg-yellow-500 rounded mb-1"></div>
                            <div className="w-10 h-8 bg-yellow-500 rounded flex items-center justify-center">
                                <span className="text-black font-black text-xs">M</span>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-3xl font-bold text-black mb-2">Welcome Back</h2>
                    <p className="text-black/80 font-medium tracking-tight">Login to your MobileMart account</p>
                </div>

                {/* Right Side (Form) */}
                <div className="w-full md:w-1/2 p-10 md:p-14 flex flex-col justify-center text-white">
                    <h2 className="text-2xl font-bold mb-8 text-center">Login</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-3 bg-[#242736] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent focus:outline-none transition"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="you@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Password</label>
                            <input
                                type="password"
                                required
                                className="w-full px-4 py-3 bg-[#242736] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent focus:outline-none transition"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#FFB000] text-black font-bold py-3 mt-4 rounded-lg hover:bg-yellow-400 transition"
                        >
                            Login
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm font-medium text-gray-400 space-y-2">
                        <p>
                            New to MobileMart? <Link to="/register" className="text-yellow-500 hover:text-yellow-400 transition">Create an account</Link>
                        </p>
                        <p>
                            Forgot your password? <Link to="/forgot-password" title="Forgot Password Page Link" className="text-yellow-500 hover:text-yellow-400 transition">Reset here</Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Login;
