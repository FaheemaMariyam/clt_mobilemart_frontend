import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';
import heroImage from '../assets/heroimage.jpg';

const Register = () => {
    const [formData, setFormData] = useState({ 
        email: '', 
        password: '', 
        password2: '', 
        first_name: '', 
        last_name: '' 
    });
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await register(formData);
            toast.success('Registration successful! Please login.');
            navigate('/login');
        } catch (error) {
            const errorMsg = error.response?.data ? 
                Object.values(error.response.data).flat().join(', ') : 
                'Registration failed. Try again.';
            toast.error(errorMsg);
        }
    };

    return (
        <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-4 bg-black">
            <div className="w-full max-w-5xl flex flex-col md:flex-row bg-[#0D0F21] rounded-[2.5rem] shadow-3xl overflow-hidden border border-gray-800 h-full md:h-[650px]">
                
                <div className="w-full md:w-5/12 relative flex flex-col items-center justify-center text-center p-12 min-h-[300px] md:min-h-full">
                    <img src={heroImage} className="absolute inset-0 w-full h-full object-cover object-left" alt="MobileMart Identity" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black via-[#12142B]/80 to-transparent md:bg-gradient-to-tr"></div>
                    <div className="absolute inset-0 bg-yellow-500/10 mix-blend-color"></div>

                    <div className="relative z-10 w-full flex flex-col items-center justify-center h-full pt-20 pb-4">
                        <div className="bg-white/5 backdrop-blur-xl p-6 rounded-[2rem] mb-6 border border-white/10 shadow-2xl">
                            <div className="w-16 h-16 border-2 border-yellow-500 rounded-2xl flex flex-col justify-between p-1 items-center bg-black/50 shadow-inner">
                                <div className="w-5 h-1 bg-yellow-500 rounded-full mb-1"></div>
                                <div className="w-10 h-8 bg-yellow-500 rounded-xl flex items-center justify-center">
                                    <span className="text-black font-black text-lg">M</span>
                                </div>
                            </div>
                        </div>
                        <h2 className="text-5xl font-black text-white mb-2 tracking-tighter drop-shadow-2xl">Join<br/>Today</h2>
                        <p className="text-yellow-500 font-bold uppercase tracking-[0.2em] text-[10px] mt-4">Create Your Profile</p>
                    </div>
                </div>

                <div className="w-full md:w-7/12 p-8 md:p-14 flex flex-col justify-center bg-[#12142B] relative">
                    <h2 className="text-3xl font-black text-white mb-8 tracking-tighter uppercase border-l-4 border-yellow-500 pl-4">Account Creation</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-[0.2em]">First Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-5 py-3.5 bg-[#0D0F21] border border-gray-800 text-white font-bold rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition placeholder-gray-700 text-sm"
                                    value={formData.first_name}
                                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-[0.2em]">Last Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-5 py-3.5 bg-[#0D0F21] border border-gray-800 text-white font-bold rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition placeholder-gray-700 text-sm"
                                    value={formData.last_name}
                                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-[0.2em]">Registered Email</label>
                            <input
                                type="email"
                                required
                                className="w-full px-5 py-3.5 bg-[#0D0F21] border border-gray-800 text-white font-bold rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition placeholder-gray-700 text-sm"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="terminal@example.com"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-[0.2em]"> PASSWORD</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-5 py-3.5 bg-[#0D0F21] border border-gray-800 text-white font-bold rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition placeholder-gray-700 text-sm"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-black text-gray-500 mb-2 uppercase tracking-[0.2em]">Confirm PASSWORD</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-5 py-3.5 bg-[#0D0F21] border border-gray-800 text-white font-bold rounded-2xl focus:ring-2 focus:ring-yellow-500 focus:border-transparent outline-none transition placeholder-gray-700 text-sm"
                                    value={formData.password2}
                                    onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-yellow-500 text-black font-black uppercase tracking-widest text-[11px] py-4 mt-4 rounded-[20px] hover:bg-yellow-400 transition hover:shadow-[0_0_20px_rgba(255,176,0,0.4)]"
                        >
                            Register Account
                        </button>
                    </form>

                    <div className="mt-6 text-center text-sm font-medium text-gray-400">
                        <p>
                            Already have an account? <Link to="/login" className="text-yellow-500 hover:text-yellow-400 transition">Login here</Link>
                        </p>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Register;
