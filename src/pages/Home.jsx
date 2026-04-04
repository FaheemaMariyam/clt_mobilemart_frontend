import React, { useEffect, useState } from 'react';
import { getProducts } from '../api/productApis';
import { Link } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FaImage, FaShoppingCart, FaCheckCircle } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

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
            console.error('Failed to fetch products:', error);
            toast.error('Failed to load products');
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <div className="text-center mt-20">Loading products...</div>;

    return (
        <div className="container mx-auto px-4 pt-8 space-y-12 pb-12">
            {/* Hero Container */}
            <div className="relative w-full h-[500px] rounded-3xl overflow-hidden bg-gradient-to-br from-[#12142B] via-slate-900 to-[#1E203B] shadow-2xl border border-gray-800 flex items-center px-8 md:px-16">
                {/* Decorative background elements */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
                    <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/10 blur-[100px] rounded-full"></div>
                    <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-yellow-500/10 blur-[100px] rounded-full"></div>
                </div>

                <div className="relative z-10 w-full flex flex-col md:flex-row items-center justify-between gap-8 h-full">
                    {/* Left: Text Content */}
                    <div className="max-w-xl text-center md:text-left flex flex-col items-center md:items-start justify-center pt-10 md:pt-0">
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
                    
                    {/* Right: Image Space/Placeholder */}
                    <div className="hidden md:flex w-full md:w-1/2 h-full items-center justify-center relative">
                        {/* 
                            USER: Replace the div below with your actual smartphone image. 
                            Suggested styling for image: <img src="your-image.png" className="max-h-[120%] rotate-12 absolute right-0" alt="Smartphone" /> 
                        */}
                        <div className="w-[300px] h-[500px] border-4 border-dashed border-gray-600/50 rounded-3xl flex items-center justify-center text-center p-6 bg-gray-800/20 rotate-12 absolute right-10">
                            <span className="text-gray-500 font-bold uppercase tracking-widest text-sm">Add Phone<br/>Image Here</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Popular Mobiles Section */}
            <div id="popular" className="pt-4">
                <h2 className="text-3xl font-black text-white text-center mb-10 tracking-wide uppercase">Popular Mobiles</h2>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                    {products.length > 0 ? (
                        products.map((product) => (
                            <Link to={`/products/${product.id}`} key={product.id} className="bg-[#1A1C29] p-4 rounded-2xl shadow-xl hover:shadow-2xl transition border border-gray-800 overflow-hidden block group">
                                <div className="h-56 bg-[#242736] mb-5 rounded-xl flex items-center justify-center overflow-hidden relative border border-gray-800/50">
                                    {product.thumbnail ? (
                                        <img src={product.thumbnail} alt={product.name} className="object-contain h-full w-full p-4 group-hover:scale-110 transition-transform duration-500" />
                                    ) : (
                                        <div className="flex flex-col items-center text-gray-600">
                                            <FaImage size={40} />
                                            <span className="text-xs mt-2 font-medium">No image available</span>
                                        </div>
                                    )}
                                    
                                    {/* Add to Cart Overlay Button */}
                                    <button
                                        onClick={(e) => {
                                            e.preventDefault();
                                            if (!isInCart(product.id)) {
                                                addToCart(product.id, 1);
                                            }
                                        }}
                                        disabled={isInCart(product.id) || product.stock <= 0}
                                        className={`absolute bottom-3 right-3 p-3 rounded-xl shadow-lg transition-all transform hover:scale-110 flex items-center justify-center 
                                            ${isInCart(product.id) 
                                                ? 'bg-green-500 text-white cursor-default shadow-green-500/20' 
                                                : product.stock > 0 
                                                    ? 'bg-yellow-500 text-black hover:bg-yellow-400' 
                                                    : 'bg-gray-700 text-gray-500 cursor-not-allowed'}`}
                                    >
                                        {isInCart(product.id) ? <FaCheckCircle size={18} /> : <FaShoppingCart size={18} />}
                                    </button>
                                </div>
                                <div className="space-y-1.5 px-2 pb-2">
                                    <h3 className="text-lg font-bold text-white group-hover:text-yellow-500 transition-colors truncate">{product.name}</h3>
                                    <p className="text-yellow-500 font-extrabold text-xl">${product.price}</p>
                                    <p className="text-xs text-gray-400 line-clamp-2 mt-2">{product.description}</p>
                                </div>
                            </Link>
                        ))
                    ) : (
                        <div className="col-span-full text-center text-gray-400 font-medium py-20 bg-[#1A1C29] rounded-2xl border border-gray-800">
                            No products found. Start by adding one from the Admin!
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;
