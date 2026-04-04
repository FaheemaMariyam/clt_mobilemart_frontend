import React, { useState } from 'react';
import { requestPasswordReset } from '../api/authApis';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaArrowLeft, FaCheckCircle } from 'react-icons/fa';

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            await requestPasswordReset(email);
            setSubmitted(true);
            toast.success('Reset link sent if account exists.');
        } catch (error) {
            toast.error('Failed to send reset link.');
        } finally {
            setLoading(false);
        }
    };

    if (submitted) {
        return (
            <div className="min-h-[calc(100vh-100px)] flex items-center justify-center p-6 bg-[#0F111A]">
                <div className="max-w-md w-full bg-[#1A1C29] p-10 rounded-[40px] border border-gray-800 text-center space-y-6 shadow-2xl">
                    <div className="w-20 h-20 bg-green-500/10 text-green-500 rounded-full flex items-center justify-center mx-auto border border-green-500/20">
                        <FaCheckCircle className="text-4xl" />
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight">Check Your Inbox</h2>
                    <p className="text-gray-400 text-sm leading-relaxed">
                        We've sent a recovery link to <span className="text-white font-bold">{email}</span>. 
                        Please follow the instructions in the email to reset your password.
                    </p>
                    <Link to="/login" className="inline-flex items-center gap-2 text-yellow-500 font-black uppercase text-xs tracking-widest hover:text-yellow-400 transition-colors">
                        <FaArrowLeft /> Back to Login
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
                        <h2 className="text-3xl font-black text-white uppercase tracking-tight">Account Recovery</h2>
                        <p className="text-gray-500 text-xs font-bold uppercase tracking-widest italic">Enter your email to receive a reset link</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="space-y-2">
                            <label className="text-[10px] font-black text-gray-500 uppercase tracking-[0.2em] ml-1">Email Address</label>
                            <div className="relative group">
                                <FaEnvelope className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-500 group-focus-within:text-yellow-500 transition-colors" />
                                <input 
                                    type="email" 
                                    required
                                    className="w-full bg-[#12142B] border border-gray-800 text-white pl-12 pr-4 py-4 rounded-2xl focus:ring-2 focus:ring-yellow-500 outline-none transition-all group-hover:border-gray-700" 
                                    placeholder="name@example.com"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        <button 
                            disabled={loading}
                            className="w-full bg-yellow-500 hover:bg-yellow-400 text-black font-black py-4 rounded-2xl transition-all uppercase tracking-widest text-xs shadow-lg shadow-yellow-500/10 disabled:opacity-50"
                        >
                            {loading ? 'Processing...' : 'Send Reset Link'}
                        </button>
                    </form>

                    <div className="text-center">
                        <Link to="/login" className="inline-flex items-center gap-2 text-gray-500 font-bold uppercase text-[10px] tracking-widest hover:text-white transition-colors">
                            <FaArrowLeft /> I remember my password
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPassword;
