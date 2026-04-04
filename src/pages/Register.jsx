import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import toast from 'react-hot-toast';

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
            console.error('Registration failed:', error);
            const errorMsg = error.response?.data ? 
                Object.values(error.response.data).flat().join(', ') : 
                'Registration failed. Try again.';
            toast.error(errorMsg);
        }
    };

    return (
        <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-4 bg-gradient-to-br from-[#1E203B] to-[#12142B]">
            <div className="w-full max-w-4xl flex flex-col md:flex-row bg-[#1A1C29] rounded-2xl shadow-2xl overflow-hidden border border-gray-800">
                
                {/* Left Side (Yellow) */}
                <div className="w-full md:w-1/3 md:min-w-[300px] bg-[#FFB000] p-10 flex flex-col items-center justify-center text-center">
                    <div className="bg-black p-5 rounded-2xl mb-8 shadow-lg">
                        <div className="w-14 h-14 border-4 border-yellow-500 rounded flex flex-col justify-between p-1 items-center">
                            <div className="w-5 h-1 bg-yellow-500 rounded mb-1"></div>
                            <div className="w-8 h-6 bg-yellow-500 rounded flex items-center justify-center">
                                <span className="text-black font-black text-xs">M</span>
                            </div>
                        </div>
                    </div>
                    <h2 className="text-2xl font-bold text-black mb-2">Join Today</h2>
                    <p className="text-black/80 font-medium tracking-tight text-sm">Create your new MobileMart account</p>
                </div>

                {/* Right Side (Form) */}
                <div className="w-full md:w-2/3 p-8 md:p-10 flex flex-col justify-center text-white">
                    <h2 className="text-2xl font-bold mb-6 text-center">Register</h2>
                    
                    <form onSubmit={handleSubmit} className="space-y-4">
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">First Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2.5 bg-[#242736] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent focus:outline-none transition text-sm"
                                    value={formData.first_name}
                                    onChange={(e) => setFormData({ ...formData, first_name: e.target.value })}
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Last Name</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-4 py-2.5 bg-[#242736] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent focus:outline-none transition text-sm"
                                    value={formData.last_name}
                                    onChange={(e) => setFormData({ ...formData, last_name: e.target.value })}
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Email</label>
                            <input
                                type="email"
                                required
                                className="w-full px-4 py-2.5 bg-[#242736] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent focus:outline-none transition text-sm"
                                value={formData.email}
                                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                                placeholder="you@example.com"
                            />
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Password</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-2.5 bg-[#242736] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent focus:outline-none transition text-sm"
                                    value={formData.password}
                                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                                    placeholder="••••••••"
                                />
                            </div>
                            <div>
                                <label className="block text-xs font-semibold text-gray-400 mb-1.5 uppercase">Confirm</label>
                                <input
                                    type="password"
                                    required
                                    className="w-full px-4 py-2.5 bg-[#242736] border border-gray-700 text-white rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent focus:outline-none transition text-sm"
                                    value={formData.password2}
                                    onChange={(e) => setFormData({ ...formData, password2: e.target.value })}
                                    placeholder="••••••••"
                                />
                            </div>
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#FFB000] text-black font-bold py-3 mt-2 rounded-lg hover:bg-yellow-400 transition"
                        >
                            Register
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
