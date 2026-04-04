import React from 'react';
import { Link } from 'react-router-dom';
import { FaShoppingCart, FaCheckCircle, FaStar, FaBolt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product }) => {
    const { addToCart, isInCart } = useCart();
    const { user } = useAuth();

    const inCart = isInCart(product.id);
    const isOutOfStock = product.stock <= 0;

    return (
        <div className="relative group w-full">
            {/* Glossy Background & Glow Frame */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-yellow-500/20 to-orange-500/0 rounded-[2rem] blur opacity-0 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
            
            <div className="relative bg-[#1A1C30]/80 backdrop-blur-xl border border-white/5 rounded-[2rem] overflow-hidden p-5 transition-all duration-500 transform group-hover:-translate-y-2 group-hover:border-yellow-500/30">
                
                {/* Badge Overlay */}
                {isOutOfStock ? (
                    <div className="absolute top-4 left-4 z-10 bg-red-600 text-white text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg">
                        Out of Stock
                    </div>
                ) : (
                    <div className="absolute top-4 left-4 z-10 bg-yellow-500 text-black text-[9px] font-black uppercase tracking-widest px-3 py-1 rounded-full shadow-lg flex items-center gap-1">
                        <FaBolt size={8} /> New Arrival
                    </div>
                )}

                {/* Main Product Image Container */}
                <Link to={user ? `/products/${product.id}` : '/login'} className="block h-52 bg-[#1E203B] rounded-2xl mb-5 overflow-hidden relative group/img">
                    {product.thumbnail ? (
                        <img 
                            src={product.thumbnail} 
                            alt={product.name} 
                            className="w-full h-full object-contain p-4 transition-transform duration-700 group-hover/img:scale-110" 
                        />
                    ) : (
                        <div className="w-full h-full flex flex-col items-center justify-center text-gray-700">
                            <span className="text-3xl mb-2 opacity-20">📱</span>
                            <span className="text-[10px] font-bold uppercase tracking-widest opacity-20 text-white">No Identity Found</span>
                        </div>
                    )}
                    
                    {/* Glass Overlay on Hover */}
                    <div className="absolute inset-0 bg-white/5 opacity-0 group-hover/img:opacity-100 transition-opacity"></div>
                </Link>

                {/* Content Section */}
                <div className="space-y-4 px-1">
                    <div className="flex justify-between items-start">
                        <div className="max-w-[70%]">
                            <p className="text-[10px] font-black text-yellow-500 uppercase tracking-widest mb-1 opacity-60">
                                {product.brand || 'Premium Model'}
                            </p>
                            <h3 className="text-xl font-bold text-white tracking-tight truncate leading-tight">
                                {product.name}
                            </h3>
                        </div>
                        <div className="text-right">
                            <p className="text-2xl font-black text-white leading-none tracking-tighter">
                                <span className="text-yellow-500 text-sm">$</span>
                                {product.price}
                            </p>
                        </div>
                    </div>

                    {/* Meta Info */}
                    <div className="flex items-center gap-3 pt-1">
                        <div className="flex text-yellow-500 gap-0.5">
                            <FaStar size={10} />
                            <FaStar size={10} />
                            <FaStar size={10} />
                            <FaStar size={10} />
                            <FaStar size={10} className="opacity-30" />
                        </div>
                        <span className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">
                            {product.stock} Units Left
                        </span>
                    </div>

                    {/* Action Button: Show only for authenticated users */}
                    {user && (
                        <button
                            onClick={(e) => {
                                e.preventDefault();
                                if (!user) return (window.location.href = '/login');
                                if (!inCart && !isOutOfStock) {
                                    addToCart(product.id, 1);
                                }
                            }}
                            disabled={inCart || isOutOfStock}
                            className={`w-full py-4 rounded-2xl font-black uppercase tracking-[0.2em] text-[10px] transition-all duration-300 flex items-center justify-center gap-3 shadow-2xl
                                ${inCart 
                                    ? 'bg-green-500/10 text-green-500 border border-green-500/30' 
                                    : isOutOfStock 
                                        ? 'bg-red-500/5 text-red-500/40 border border-red-500/10 cursor-not-allowed' 
                                        : 'bg-white text-black hover:bg-yellow-500 hover:shadow-[0_10px_20px_rgba(255,176,0,0.3)]'}`}
                        >
                            {inCart ? (
                                <>
                                    <FaCheckCircle size={14} /> Added to Cart
                                </>
                            ) : isOutOfStock ? (
                                'Sold Out'
                            ) : (
                                <>
                                    <FaShoppingCart size={14} /> ADD TO CART
                                </>
                            )}
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
