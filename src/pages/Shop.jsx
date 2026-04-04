import React, { useState, useEffect, useMemo } from 'react';
import { getProducts } from '../api/productApis';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../context/AuthContext';
import { FaSearch, FaFilter, FaTimes, FaGamepad, FaLaptop, FaMobileAlt } from 'react-icons/fa';

const Shop = () => {
    const { user } = useAuth();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [debouncedSearch, setDebouncedSearch] = useState('');
    const [selectedBrand, setSelectedBrand] = useState('All');
    const [priceRange, setPriceRange] = useState(2500);

    // Debounce Logic
    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedSearch(searchTerm);
        }, 500);
        return () => clearTimeout(handler);
    }, [searchTerm]);

    useEffect(() => {
        fetchProducts();
    }, [debouncedSearch, selectedBrand]);

    const fetchProducts = async () => {
        setLoading(true);
        try {
            const params = {
                search: debouncedSearch !== '' ? debouncedSearch : undefined,
                brand: selectedBrand !== 'All' ? selectedBrand : undefined,
                max_price: priceRange !== 2500 ? priceRange : undefined
            };
            const data = await getProducts(params);
            setProducts(data.results || data);
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    const brands = useMemo(() => {
        const uniqueBrands = ['All', ...new Set(products.map(p => p.brand).filter(Boolean))];
        return uniqueBrands;
    }, [products.length > 0]);

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen bg-black">
            {/* Header / Intro */}
            <div className="max-w-2xl mb-16">
                <h1 className="text-5xl font-black text-white uppercase tracking-tighter mb-4 leading-tight">
                    Premium <br /><span className="text-yellow-500">Identity Inventory</span>
                </h1>
                <div className="w-20 h-1.5 bg-yellow-500 rounded-full mb-6"></div>
                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs leading-relaxed">
                    Explore our curated collection of high-performance mobile devices. 
                    Authorized access only for verified terminal users.
                </p>
            </div>

            {/* Terminal Interface: Search & Filters */}
            <div className="bg-[#12142B] border border-gray-800 rounded-[2.5rem] p-8 mb-12 shadow-3xl">
                <div className="flex flex-col lg:flex-row gap-8 items-end">
                    
                    {/* Search Component */}
                    <div className="flex-1 w-full group">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 ml-2">Search Terminal</label>
                        <div className="relative">
                            <FaSearch className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-600 group-focus-within:text-yellow-500 transition-colors" />
                            <input 
                                type="text"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                placeholder="Query model, brand, or specs..."
                                className="w-full bg-[#0D0F21] border border-gray-800 text-white p-5 pl-14 rounded-2xl outline-none focus:ring-2 focus:ring-yellow-500 transition-all font-bold placeholder-gray-800"
                            />
                            {searchTerm && (
                                <button onClick={() => setSearchTerm('')} className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 hover:text-white">
                                    <FaTimes />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Brand Filter */}
                    <div className="w-full lg:w-64">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 ml-2">Manufacturer Filter</label>
                        <select 
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="w-full bg-[#0D0F21] border border-gray-800 text-white p-5 rounded-2xl outline-none focus:ring-2 focus:ring-yellow-500 transition-all font-black uppercase tracking-widest text-xs"
                        >
                            {brands.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>

                    {/* Price Slider */}
                    <div className="w-full lg:w-80">
                        <div className="flex justify-between items-center mb-3 ml-2">
                            <label className="text-[10px] font-black uppercase tracking-widest text-gray-500">Max Value Limit</label>
                            <span className="text-yellow-500 font-black text-xs">${priceRange}</span>
                        </div>
                        <div className="px-2">
                            <input 
                                type="range" 
                                min="0" 
                                max="2500" 
                                step="50"
                                value={priceRange}
                                onChange={(e) => setPriceRange(e.target.value)}
                                onMouseUp={fetchProducts}
                                className="w-full h-2 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-yellow-500"
                            />
                        </div>
                    </div>
                </div>
            </div>

            {/* Logic: Grid Rendering */}
            {!user ? (
                <div className="bg-[#1A1C30]/50 backdrop-blur-md border border-white/5 rounded-[3rem] p-20 text-center space-y-8">
                    <div className="w-20 h-20 bg-yellow-500/10 border border-yellow-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_50px_rgba(255,176,0,0.1)]">
                        <FaMobileAlt className="text-yellow-500 text-3xl" />
                    </div>
                    <h2 className="text-3xl font-black text-white uppercase tracking-tighter">Encrypted Content</h2>
                    <p className="text-gray-500 font-bold max-w-md mx-auto text-sm leading-relaxed uppercase tracking-widest">
                        To maintain competitive integrity, our live inventory is reserved for registered members. Please identify yourself to proceed.
                    </p>
                    <div className="pt-6">
                        <a href="/login" className="bg-white text-black px-12 py-4 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-yellow-500 transition-all hover:scale-105 shadow-2xl">
                            Request Access Key
                        </a>
                    </div>
                </div>
            ) : loading ? (
                <div className="flex flex-col items-center justify-center py-40">
                    <div className="w-16 h-16 border-4 border-yellow-500/20 border-t-yellow-500 rounded-full animate-spin"></div>
                    <p className="text-gray-600 font-black uppercase tracking-[0.3em] text-[8px] mt-8">Decrypting Database...</p>
                </div>
            ) : products.length > 0 ? (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {products.map(p => (
                        <ProductCard key={p.id} product={p} />
                    ))}
                </div>
            ) : (
                <div className="text-center py-40 bg-[#1A1C30]/20 rounded-[3rem] border border-gray-800">
                    <p className="text-gray-700 font-black uppercase tracking-widest text-xs">No devices matched your query signature.</p>
                </div>
            )}
        </div>
    );
};

export default Shop;
