import React, { useEffect, useState } from 'react';
import { FaBox, FaUsers, FaShieldAlt, FaUserSlash } from 'react-icons/fa';
import { getDashboardStats } from '../api/authApis';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area, PieChart, Pie, Cell 
} from 'recharts';
import toast from 'react-hot-toast';

const AdminOverview = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchStats();
    }, []);

    const fetchStats = async () => {
        try {
            const data = await getDashboardStats();
            setStats(data);
        } catch (error) {
            toast.error('Failed to sync dashboard stats');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-500 mb-4"></div>
            <p className="font-bold uppercase tracking-widest text-xs opacity-60">Initializing Core Intelligence...</p>
        </div>
    );

    return (
        <div className="space-y-12 animate-in fade-in slide-in-from-bottom-6 duration-1000">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
                <StatCard 
                    icon={FaUsers} 
                    label="Total Intelligence" 
                    value={stats?.total_users || 0} 
                    sub="Registered Accounts"
                    color="from-yellow-400 to-yellow-600"
                />
                <StatCard 
                    icon={FaBox} 
                    label="Storage Units" 
                    value={stats?.total_products || 0} 
                    sub="Inventory Models"
                    color="from-blue-400 to-blue-600"
                />
                <StatCard 
                    icon={FaUserSlash} 
                    label="Containment Unit" 
                    value={stats?.blocked_users || 0} 
                    sub="Restricted Access"
                    color="from-red-400 to-red-600"
                />
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-4 sm:gap-8">
                <div className="bg-[#141621] p-6 sm:p-10 rounded-[30px] sm:rounded-[40px] border border-gray-800 shadow-2xl relative overflow-hidden group">
                    <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-3xl pointer-events-none"></div>
                    <div className="mb-10">
                        <h3 className="text-xl font-black text-white uppercase tracking-tight">System Growth</h3>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 italic">Account Registration Velocity (7 Days)</p>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={stats?.user_growth}>
                                <defs>
                                    <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#EAB308" stopOpacity={0.3}/>
                                        <stop offset="95%" stopColor="#EAB308" stopOpacity={0}/>
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2D2E3D" vertical={false}/>
                                <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false}/>
                                <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false}/>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1A1C29', border: '1px solid #333', borderRadius: '16px' }}
                                    itemStyle={{ color: '#EAB308', fontWeight: 'bold', fontSize: '12px' }}
                                />
                                <Area type="monotone" dataKey="users" stroke="#EAB308" strokeWidth={4} fillOpacity={1} fill="url(#colorUsers)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-[#141621] p-6 sm:p-10 rounded-[30px] sm:rounded-[40px] border border-gray-800 shadow-2xl relative overflow-hidden group">
                    <div className="mb-10">
                        <h3 className="text-xl font-black text-white uppercase tracking-tight">Distribution Matrix</h3>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 italic">Asset Allocation Status</p>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={stats?.product_distribution}>
                                <CartesianGrid strokeDasharray="3 3" stroke="#2D2E3D" vertical={false}/>
                                <XAxis dataKey="name" stroke="#666" fontSize={10} tickLine={false} axisLine={false}/>
                                <YAxis stroke="#666" fontSize={10} tickLine={false} axisLine={false}/>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1A1C29', border: '1px solid #333', borderRadius: '16px' }}
                                    cursor={{ fill: '#ffffff05' }}
                                />
                                <Bar dataKey="value" fill="#EAB308" radius={[10, 10, 0, 0]} barSize={40} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </div>

                <div className="bg-[#141621] p-6 sm:p-10 rounded-[30px] sm:rounded-[40px] border border-gray-800 shadow-2xl relative overflow-hidden group">
                    <div className="mb-10 text-center">
                        <h3 className="text-xl font-black text-white uppercase tracking-tight">Security Distribution</h3>
                        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-widest mt-1 italic">Active vs Restricted Ratio</p>
                    </div>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={[
                                        { name: 'Active', value: (stats?.total_users || 0) - (stats?.blocked_users || 0) },
                                        { name: 'Blocked', value: stats?.blocked_users || 0 },
                                    ]}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={60}
                                    outerRadius={80}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    <Cell fill="#22C55E" />
                                    <Cell fill="#EF4444" />
                                </Pie>
                                <Tooltip 
                                    contentStyle={{ backgroundColor: '#1A1C29', border: '1px solid #333', borderRadius: '16px' }}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex justify-center gap-6 mt-4">
                        <StatusLegend color="bg-green-500" label="Active" />
                        <StatusLegend color="bg-red-500" label="Restricted" />
                    </div>
                </div>
            </div>

            <div className="bg-[#12142B] p-6 sm:p-10 rounded-[30px] sm:rounded-[40px] border border-gray-800 flex flex-col sm:flex-row items-center justify-between gap-6 border-dashed relative overflow-hidden">
                <div className="absolute inset-0 bg-yellow-500/5 opacity-20 pointer-events-none"></div>
                <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 relative text-center sm:text-left">
                    <div className="w-16 h-16 bg-yellow-500/10 rounded-full flex items-center justify-center border border-yellow-500/20 shrink-0">
                        <FaShieldAlt className="text-yellow-500 text-2xl" />
                    </div>
                    <div>
                        <h4 className="text-white font-black text-lg uppercase tracking-tight">Encryption Protocol Active</h4>
                        <p className="text-gray-600 font-bold text-[10px] uppercase tracking-widest leading-relaxed">System Health: 100% • Zero Vulnerabilities Detected</p>
                    </div>
                </div>
                <div className="hidden lg:flex gap-3 relative">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="w-1.5 h-10 bg-yellow-500/30 rounded-full transition-all duration-1000 animate-pulse" style={{ animationDelay: `${i * 150}ms` }}></div>
                    ))}
                </div>
            </div>
        </div>
    );
};

const StatCard = ({ icon: Icon, label, value, sub, color }) => (
    <div className="bg-[#1A1C29] p-6 sm:p-10 rounded-[30px] sm:rounded-[40px] border border-gray-800 shadow-2xl relative overflow-hidden group hover:border-yellow-500/30 transition-all duration-500">
        <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-[0.03] blur-3xl -mr-16 -mt-16 group-hover:opacity-[0.08] transition-opacity`}></div>
        <div className="flex items-center gap-8 relative">
            <div className={`w-16 h-16 bg-gradient-to-br ${color} p-[1px] rounded-3xl`}>
                <div className="w-full h-full bg-[#1A1C29] rounded-[23px] flex items-center justify-center">
                    <Icon className="text-2xl text-white opacity-80 group-hover:scale-110 transition-transform duration-500" />
                </div>
            </div>
            <div>
                <h4 className="text-[10px] font-black text-gray-500 uppercase tracking-widest mb-1">{label}</h4>
                <div className="flex items-baseline gap-2">
                    <span className="text-4xl font-black text-white tracking-widest">{value}</span>
                    <span className="text-[9px] font-bold text-gray-700 uppercase tracking-widest">{sub}</span>
                </div>
            </div>
        </div>
    </div>
);

const StatusLegend = ({ color, label }) => (
    <div className="flex items-center gap-2">
        <div className={`w-2.5 h-2.5 ${color} rounded-full`}></div>
        <span className="text-[10px] font-bold text-gray-500 uppercase tracking-widest">{label}</span>
    </div>
);

export default AdminOverview;
