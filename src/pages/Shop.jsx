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
    const [allBrands, setAllBrands] = useState(['All']);

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
            const params = {};
            if (debouncedSearch) params.search = debouncedSearch;
            if (selectedBrand !== 'All') params.brand = selectedBrand;
            
            const data = await getProducts(params);
            const productList = data.results || data;
            setProducts(productList);

            // Update brands list only if it's currently just ['All'] (initial load)
            if (allBrands.length === 1 && productList.length > 0) {
                const uniqueBrands = ['All', ...new Set(productList.map(p => p.brand).filter(Boolean))];
                setAllBrands(uniqueBrands);
            }
        } catch (error) {
            console.error('Fetch error:', error);
        } finally {
            setLoading(false);
        }
    };

    // Brands logic is now handled in fetchProducts for state stability

    return (
        <div className="container mx-auto px-4 py-12 min-h-screen">
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

                    <div className="w-full lg:w-64">
                        <label className="block text-[10px] font-black uppercase tracking-widest text-gray-500 mb-3 ml-2">Manufacturer Filter</label>
                        <select 
                            value={selectedBrand}
                            onChange={(e) => setSelectedBrand(e.target.value)}
                            className="w-full bg-[#0D0F21] border border-gray-800 text-white p-5 rounded-2xl outline-none focus:ring-2 focus:ring-yellow-500 transition-all font-black uppercase tracking-widest text-xs"
                        >
                            {allBrands.map(b => <option key={b} value={b}>{b}</option>)}
                        </select>
                    </div>
                </div>
            </div>

            {/* Logic: Grid Rendering */}
            {loading ? (
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
