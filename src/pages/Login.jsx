import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import heroImage from '../assets/heroimage.jpg';

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
        <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-4 bg-black">
            <div className="w-full max-w-5xl flex flex-col md:flex-row bg-[#0D0F21] rounded-[2.5rem] shadow-3xl overflow-hidden border border-gray-800 h-full md:h-[600px]">
                
                {/* Left Side (Image Panel) */}
                <div className="w-full md:w-1/2 relative flex flex-col items-center justify-center text-center p-12 min-h-[300px] md:min-h-full">
                    {/* Background Image */}
                    <img src={heroImage} className="absolute inset-0 w-full h-full object-cover object-left" alt="MobileMart Identity" />
                    {/* Dark gradient mapping & Yellow tint for brand integration */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-[#12142B]/80 to-transparent"></div>
                    <div className="absolute inset-0 bg-yellow-500/10 mix-blend-color"></div>

                    {/* Content on top of Image */}
                    <div className="relative z-10 w-full flex flex-col items-center justify-center h-full pt-20 pb-4">
                        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] mb-6 border border-white/10 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
                            <div className="w-16 h-16 border-2 border-yellow-500 rounded-2xl flex flex-col justify-between p-1 items-center bg-black/50 shadow-inner">
                                <div className="w-5 h-1 bg-yellow-500 rounded-full mb-1"></div>
                                <div className="w-10 h-8 bg-yellow-500 rounded-xl flex items-center justify-center">
                                    <span className="text-black font-black text-lg">M</span>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-5xl font-black text-white mb-2 tracking-tighter drop-shadow-2xl">Welcome<br/>Back</h2>
                        <p className="text-yellow-500 font-bold uppercase tracking-[0.2em] text-[10px] mt-4">Secure Terminal Access</p>
                    </div>
                </div>

                {/* Right Side (Form) */}
                <div className="w-full md:w-1/2 p-10 md:p-16 flex flex-col justify-center bg-[#12142B] relative">
                    <h2 className="text-3xl font-black text-white mb-8 tracking-tighter uppercase border-l-4 border-yellow-500 pl-4">Identity Verification</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-[0.2em]">Registered Email</label>
                            <input
                                type="email"
                                required
                                className="w-full px-5 py-4 bg-[#0D0F21] border border-gray-800 text-white font-bold rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition placeholder-gray-700"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="terminal@example.com"
                            />
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-[0.2em]">Access Key</label>
                            <input
                                type="password"
                                required
                                className="w-full px-5 py-4 bg-[#0D0F21] border border-gray-800 text-white font-bold rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition placeholder-gray-700"
                                value={formData.password}
                                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                placeholder="••••••••"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 text-black font-black uppercase tracking-widest text-[11px] py-5 mt-6 rounded-[20px] hover:bg-yellow-400 transition hover:shadow-[0_0_20px_rgba(255,176,0,0.4)]"
                        >
                            Authenticate Session
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
