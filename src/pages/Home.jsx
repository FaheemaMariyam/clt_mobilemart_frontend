import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/productApis';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';
import toast from 'react-hot-toast';
import { FaImage, FaShoppingCart, FaCheckCircle, FaArrowRight } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import heroImage from '../assets/heroimage.jpg';

const Home = () => {
    const { isAdmin } = useAuth();
    const navigate = useNavigate();
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const { addToCart, isInCart } = useCart();

    useEffect(() => {
        if (isAdmin) {
            navigate('/admin');
            return;
        }
        fetchProducts();
    }, [isAdmin, navigate]);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data.results || data);
        } catch (error) {
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-20">Loading products...</div>;

    return (
        <div className="container mx-auto px-4 pt-8 space-y-12 pb-12">
            <div className="relative w-full min-h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-gray-800 flex items-center px-6 md:px-16 py-12 md:py-0">
                
                <div className="absolute inset-0 z-0">
                    <img 
                        src={heroImage} 
                        className="w-full h-full object-cover object-center" 
                        alt="Premium Hardware Catalog" 
                    />
                    <div className="absolute inset-0 bg-gradient-to-r from-[#0a0c1f] via-[#0a0c1f]/80 to-transparent md:via-[#0a0c1f]/50"></div>
                    <div className="absolute inset-0 bg-[#0a0c1f]/40 md:hidden"></div>
                </div>

                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 mix-blend-screen pointer-events-none">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/20 blur-[100px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-500/20 blur-[100px] rounded-full"></div>
                </div>

                <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                    <div className="max-w-xl text-center md:text-left flex flex-col items-center md:items-start justify-center">
                        <h1 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6 tracking-tight leading-tight">
                            Discover the Latest <br/><span className="text-yellow-500">Smartphones</span>
                        </h1>
                        <p className="text-gray-300 md:text-lg mb-10 max-w-md font-medium leading-relaxed">
                            Unleash the power of cutting-edge technology with top brands and exclusive deals.
                        </p>
                        <a href="#popular" className="inline-block bg-white text-black font-bold uppercase tracking-widest text-sm px-8 py-3.5 rounded-full hover:bg-yellow-500 transition shadow-[0_0_20px_rgba(255,255,255,0.3)] hover:shadow-[0_0_25px_rgba(255,176,0,0.5)]">
                            Shop Now
                        </a>
                    </div>
                </div>
            </div>

            <div id="popular" className="pt-4 pb-12">
                <div className="flex justify-between items-end mb-10">
                    <div>
                        <h2 className="text-3xl font-black text-white tracking-tighter uppercase px-4 border-l-4 border-yellow-500">Popular Devices</h2>
                        <p className="text-gray-500 font-bold uppercase tracking-widest text-[10px] mt-2">The most sought-after hardware in our catalog</p>
                    </div>
                    <Link to="/products" className="hidden md:flex items-center gap-2 text-yellow-500 font-black uppercase tracking-widest text-[10px] hover:text-white transition group">
                        Browse Full Inventory <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                    </Link>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {products.length > 0 ? (
                        products.slice(0, 4).map((product) => (
                            <ProductCard key={product.id} product={product} />
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-500 font-black uppercase tracking-widest text-xs py-20 bg-[#1A1C29] rounded-[2.5rem] border border-gray-800">
                            No devices currently active on the terminal.
                        </div>
                    )}
                </div>

                <div className="mt-12 text-center md:hidden">
                    <Link to="/products" className="inline-block bg-white text-black px-8 py-3.5 rounded-full font-black uppercase tracking-widest text-[10px] hover:bg-yellow-500 transition shadow-2xl">
                        View All Models
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Home;
