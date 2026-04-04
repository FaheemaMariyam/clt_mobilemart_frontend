import React, { useState } from 'react';
import { useSearchParams, useNavigate, Link } from 'react-router-dom';
import { resetPasswordConfirm } from '../api/authApis';
import toast from 'react-hot-toast';
import { FaLock, FaArrowLeft, FaShieldAlt } from 'react-icons/fa';

const ResetPassword = () => {
    const [searchParams] = useSearchParams();
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        new_password: '',
        confirm_password: ''
    });
    const [loading, setLoading] = useState(false);

    const uid = searchParams.get('uid');
    const token = searchParams.get('token');

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.new_password !== formData.confirm_password) {
            return toast.error('Passwords do not match.');
        }

        setLoading(true);
        try {
            await resetPasswordConfirm({
                uid,
                token,
                new_password: formData.new_password
            });
            toast.success('Password reset successfully!');
            navigate('/login');
        } catch (error) {
            toast.error('Reset failed. Link may be invalid or expired.');
        } finally {
            setLoading(false);
        }
    };

    if (!uid || !token) {
        return (
            <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-6 bg-[#0F111A]">
                <div className="max-w-md w-full bg-[#1A1C29] p-10 rounded-[40px] border border-red-500/20 text-center space-y-6 shadow-2xl">
                    <div className="w-20 h-20 bg-red-500/10 text-red-500 rounded-full flex items-center justify-center mx-auto border border-red-500/20">
                        <FaShieldAlt className="text-4xl" />
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">Invalid Link</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">The security token is missing or corrupted. Please request a new link.</p>
                    <Link to="/forgot-password" title="Go to Forgot Password" className="inline-block bg-white/5 hover:bg-white/10 text-white px-8 py-4 rounded-2xl border border-white/10 font-black uppercase text-xs tracking-widest transition-all">
                        Request New Link
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-6 bg-[#0F111A]">
            <div className="max-w-md w-full bg-[#1A1C29] p-10 rounded-[40px] border border-gray-800 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-[60px] -mr-16 -mt-16"></div>
                
                <div className="relative space-y-8">
                    <div className="space-y-2">
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Secure Update</h2>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest italic">Define your new access credentials</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-4">
                            <InputField 
                                label="New Password"
                                type="password"
                                value={formData.new_password}
                                onChange={(val) => setFormData({...formData, new_password: val})}
                                placeholder="••••••••"
                            />
                            <InputField 
                                label="Confirm New Password"
                                type="password"
                                value={formData.confirm_password}
                                onChange={(val) => setFormData({...formData, confirm_password: val})}
                                placeholder="••••••••"
                            />
                        </div>

                        <button 
                            disabled={loading}
                            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-xs shadow-lg shadow-yellow-500/10 disabled:opacity-50"
                        >
                            {loading ? 'Securing Account...' : 'Reset Password'}
                        </button>
                    </form>

                    <div className="text-center">
                        <Link to="/login" className="inline-flex items-center gap-2 text-gray-500 font-bold uppercase text-[10px] tracking-widest hover:text-white transition-colors">
                            <FaArrowLeft /> Cancel and Return
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputField = ({ label, type, value, onChange, placeholder }) => (
    <div className="space-y-2">
        <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">{label}</label>
        <div className="relative group">
            <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-500 transition-colors" />
            <input 
                type={type} 
                required
                className="w-full bg-[#12142B] border border-gray-800 text-white pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all group-hover:border-gray-700" 
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    </div>
);

export default ResetPassword;
