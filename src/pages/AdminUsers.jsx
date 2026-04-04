import React, { useEffect, useState } from 'react';
import { getUsers, updateUser, deleteUser } from '../api/userApis';
import toast from 'react-hot-toast';
import { FaUserShield, FaUser, FaTrash, FaShieldAlt, FaUserEdit, FaEnvelope } from 'react-icons/fa';

const AdminUsers = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchUsers();
    }, []);

    const fetchUsers = async () => {
        try {
            const data = await getUsers();
            setUsers(data);
        } catch (error) {
            toast.error('Failed to fetch users');
        } finally {
            setLoading(false);
        }
    };

    const handleAccountStatus = async (user) => {
        const action = user.is_blocked ? 'UNBLOCK' : 'BLOCK';
        if (!window.confirm(`CONFIRM: ${action} account for ${user.first_name} ${user.last_name}?`)) return;
        
        try {
            await updateUser(user.id, { is_blocked: !user.is_blocked });
            toast.success(`Account ${user.is_blocked ? 'Restored' : 'Restricted'}`);
            fetchUsers();
        } catch (error) {
            toast.error('Operation failed');
        }
    };

    const handleDelete = async (user) => {
        if (window.confirm(`PERMANENTLY DELETE user ${user.first_name} ${user.last_name}?`)) {
            try {
                await deleteUser(user.id);
                toast.success('Account terminated');
                fetchUsers();
            } catch (error) {
                toast.error('Delete operation failed');
            }
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-500 mb-4"></div>
            <p className="font-bold uppercase tracking-widest text-xs opacity-60">Synchronizing User Accounts...</p>
        </div>
    );

    return (
        <div className="space-y-12">
            <div className="bg-[#1A1C29] p-6 sm:p-8 rounded-3xl border border-gray-800 shadow-xl flex flex-col sm:flex-row justify-between items-start sm:items-center gap-6 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-[50px] -mr-16 -mt-16"></div>
                <div className="relative">
                    <h2 className="text-3xl font-black text-white uppercase tracking-tight border-l-4 border-yellow-500 pl-4">Platform Intelligence</h2>
                    <p className="text-gray-500 text-sm font-bold mt-1 ml-5 italic uppercase tracking-widest">User Governance & Security</p>
                </div>
                <div className="bg-gray-800/50 px-6 py-3 rounded-2xl border border-gray-800 flex items-center gap-4">
                    <span className="text-xs font-black uppercase tracking-widest text-gray-400">{users.length} Registered Accounts</span>
                </div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6">
                {users.map((u) => (
                    <div key={u.id} className={`bg-[#1A1C29] p-10 rounded-[32px] border transition-all group relative overflow-hidden ${u.is_blocked ? 'border-red-500/50 grayscale opacity-80' : 'border-gray-800 hover:border-yellow-500/40'}`}>
                        <div className="absolute top-0 right-0 p-4">
                            <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest shadow-sm border ${
                                u.is_blocked 
                                ? 'bg-red-500/20 text-red-500 border-red-500/40 animate-pulse' 
                                : 'bg-green-500/10 text-green-400 border-green-500/20'
                            }`}>
                                {u.is_blocked ? 'Access Blocked' : 'Authenticated'}
                            </span>
                        </div>

                        <div className="flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left pt-6 sm:pt-0">
                            <div className={`w-20 h-20 rounded-3xl flex items-center justify-center border font-black text-2xl transition-all duration-500 shrink-0 ${u.is_blocked ? 'bg-red-500/10 text-red-500 border-red-500/20' : 'bg-yellow-500/10 text-yellow-500 border-yellow-500/20 group-hover:bg-yellow-500 group-hover:text-black'}`}>
                                {u.first_name?.[0]}{u.last_name?.[0]}
                            </div>
                            <div className="flex-1 w-full space-y-4">
                                <div>
                                    <h3 className="text-2xl font-black text-white tracking-tighter uppercase leading-none">{u.first_name} {u.last_name}</h3>
                                    <div className="flex items-center gap-2 mt-2 text-gray-500">
                                        <FaEnvelope className="text-xs text-yellow-500/50" />
                                        <span className="text-[11px] font-bold tracking-wide">{u.email}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                                    <div className="flex-1 w-full flex gap-2">
                                        <button 
                                            onClick={() => handleAccountStatus(u)}
                                            className={`flex-1 p-4 rounded-xl transition flex items-center justify-center gap-3 font-black uppercase tracking-widest text-[9px] border ${
                                                u.is_blocked 
                                                ? 'bg-green-500/10 text-green-400 border-green-500/20 hover:bg-green-500 hover:text-black' 
                                                : 'bg-gray-800/50 text-white border-gray-700 hover:bg-red-600 hover:border-transparent'
                                            }`}
                                        >
                                            {u.is_blocked ? <><FaShieldAlt /> Unblock Account</> : <><FaUserShield /> Restrict Access</>}
                                        </button>
                                        <button 
                                            onClick={() => handleDelete(u)}
                                            className="p-4 bg-gray-800/50 hover:bg-red-600 text-white rounded-xl transition border border-gray-700 hover:border-transparent"
                                        >
                                            <FaTrash size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );

};

export default AdminUsers;
