import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { changePassword } from '../api/authApis';
import toast from 'react-hot-toast';
import { FaUser, FaLock, FaShieldAlt, FaEnvelope, FaFingerprint } from 'react-icons/fa';

const Profile = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        old_password: '',
        new_password: '',
        confirm_password: ''
    });
    const [loading, setLoading] = useState(false);

    const handlePasswordChange = async (e) => {
        e.preventDefault();
        if (formData.new_password !== formData.confirm_password) {
            return toast.error('New passwords do not match.');
        }

        setLoading(true);
        try {
            await changePassword({
                old_password: formData.old_password,
                new_password: formData.new_password
            });
            toast.success('Security updated: Password changed.');
            setFormData({ old_password: '', new_password: '', confirm_password: '' });
        } catch (error) {
            const errorMsg = error.response?.data?.detail || 'Update failed. Check your current password.';
            toast.error(errorMsg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-6 py-12 max-w-6xl space-y-12">
            <header className="space-y-2">
                <h1 className="text-4xl font-black text-white uppercase tracking-tighter italic">Identity Management</h1>
                <p className="text-gray-500 text-xs font-bold uppercase tracking-[0.3em]">Personal account control panel</p>
            </header>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                
                {/* User Card */}
                <div className="lg:col-span-1 space-y-6">
                    <div className="bg-[#1A1C29] p-10 rounded-[40px] border border-gray-800 relative overflow-hidden shadow-2xl">
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-[50px] -mr-16 -mt-16"></div>
                        <div className="flex flex-col items-center text-center space-y-6 relative">
                            <div className="w-24 h-24 bg-yellow-500/10 text-yellow-500 rounded-3xl flex items-center justify-center border border-yellow-500/20 font-black text-3xl">
                                {user?.first_name?.[0]}{user?.last_name?.[0]}
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight">{user?.first_name} {user?.last_name}</h2>
                                <p className="text-gray-500 text-sm font-medium">{user?.email}</p>
                            </div>
                            <div className="w-full pt-6 border-t border-gray-800 space-y-4">
                                <ProfileDetailIcon icon={FaEnvelope} label="Email Verified" value={user?.email} />
                                <ProfileDetailIcon icon={FaFingerprint} label="Member Type" value={user?.role === 'admin' ? 'Administrative' : 'Regular User'} />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Security Section */}
                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-[#1A1C29] p-10 rounded-[40px] border border-gray-800 shadow-2xl space-y-10">
                        <div className="flex items-center gap-6">
                            <div className="w-14 h-14 bg-red-500/10 text-red-500 rounded-2xl flex items-center justify-center border border-red-500/20">
                                <FaShieldAlt className="text-2xl" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-white uppercase tracking-tight">Security Hardening</h3>
                                <p className="text-gray-500 text-xs font-bold uppercase tracking-widest italic mt-1">Update your access credentials</p>
                            </div>
                        </div>

                        <form onSubmit={handlePasswordChange} className="space-y-6 max-w-md">
                            <InputField 
                                label="Current Password"
                                type="password"
                                icon={FaLock}
                                value={formData.old_password}
                                onChange={(val) => setFormData({...formData, old_password: val})}
                                placeholder="••••••••"
                            />
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <InputField 
                                    label="New Password"
                                    type="password"
                                    icon={FaLock}
                                    value={formData.new_password}
                                    onChange={(val) => setFormData({...formData, new_password: val})}
                                    placeholder="••••••••"
                                />
                                <InputField 
                                    label="Confirm New"
                                    type="password"
                                    icon={FaLock}
                                    value={formData.confirm_password}
                                    onChange={(val) => setFormData({...formData, confirm_password: val})}
                                    placeholder="••••••••"
                                />
                            </div>
                            <button 
                                disabled={loading}
                                className="bg-white text-black px-12 py-4 rounded-2xl font-black uppercase text-xs tracking-widest hover:bg-yellow-500 transition-all shadow-lg hover:shadow-yellow-500/20 disabled:opacity-50"
                            >
                                {loading ? 'Updating...' : 'Commit Changes'}
                            </button>
                        </form>
                    </div>
                </div>

            </div>
        </div>
    );
};

const ProfileDetailIcon = ({ icon: Icon, label, value }) => (
    <div className="flex items-center gap-3 text-left">
        <Icon className="text-gray-600 text-xs" />
        <div>
            <p className="text-[8px] font-black uppercase text-gray-600 tracking-widest">{label}</p>
            <p className="text-[10px] font-bold text-gray-400 break-all">{value}</p>
        </div>
    </div>
);

const InputField = ({ label, type, icon: Icon, value, onChange, placeholder }) => (
    <div className="space-y-2">
        <label className="text-[9px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">{label}</label>
        <div className="relative group">
            <Icon className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-500 transition-colors" />
            <input 
                type={type} 
                required
                className="w-full bg-[#12142B] border border-gray-800 text-white pl-12 pr-4 py-3.5 rounded-2xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all group-hover:border-gray-700" 
                placeholder={placeholder}
                value={value}
                onChange={(e) => onChange(e.target.value)}
            />
        </div>
    </div>
);

export default Profile;
