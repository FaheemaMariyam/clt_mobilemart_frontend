import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate, Link } from 'react-router-dom';
import { FaTrash, FaPlus, FaMinus, FaImage, FaArrowLeft, FaShoppingCart } from 'react-icons/fa';

const Cart = () => {
    const { cartItems, cartTotal, loading, updateQuantity, removeFromCart } = useCart();
    const navigate = useNavigate();

    if (loading && cartItems.length === 0) {
        return <div className="text-center py-20 text-xl font-semibold">Loading Cart...</div>;
    }

    if (cartItems.length === 0) {
        return (
            <div className="max-w-4xl mx-auto py-20 px-4 text-center text-white">
                <div className="w-64 h-64 mx-auto bg-[#1A1C29] rounded-full flex items-center justify-center border border-gray-800 shadow-2xl mb-8">
                    <FaShoppingCart className="text-gray-700 size-32" />
                </div>
                <h2 className="text-4xl font-black text-white mt-8 mb-4 tracking-tight">Your Cart is Empty</h2>
                <p className="text-gray-400 mb-10 font-medium">Looks like you haven't added anything to your cart yet.</p>
                <button 
                    onClick={() => navigate('/products')} 
                    className="bg-yellow-500 text-black font-black uppercase tracking-widest px-10 py-4 rounded-full hover:bg-yellow-400 transition shadow-[0_0_20px_rgba(255,176,0,0.3)] hover:shadow-[0_0_30px_rgba(255,176,0,0.5)] transform hover:-translate-y-1"
                >
                    Start Shopping
                </button>
            </div>
        );
    }

    return (
        <div className={`container mx-auto py-10 px-4 text-white transition duration-300 ${loading ? 'opacity-50 pointer-events-none' : 'opacity-100'}`}>
            <button 
                onClick={() => navigate('/products')} 
                className="flex items-center text-yellow-500 hover:text-yellow-400 mb-8 font-bold transition group"
            >
                <FaArrowLeft className="mr-2 group-hover:-translate-x-1 transition-transform" /> Continue Shopping
            </button>

            <h1 className="text-4xl font-black text-white mb-10 tracking-tight uppercase border-l-8 border-yellow-500 pl-6">Shopping Cart</h1>

            <div className="flex flex-col lg:flex-row gap-10">
                {/* Cart Items List */}
                <div className="flex-1 space-y-6">
                    {cartItems.map((item) => (
                        <div key={item.id} className="bg-[#1A1C29] rounded-2xl shadow-xl border border-gray-800 p-6 flex items-center flex-col sm:flex-row gap-8 transition-all hover:border-gray-700">
                            
                            {/* Product Image */}
                            <Link to={`/products/${item.product.id}`} className="w-28 h-28 sm:w-36 sm:h-36 bg-[#12142B] rounded-2xl overflow-hidden border border-gray-800 flex-shrink-0 flex items-center justify-center p-4 group">
                                {item.product.thumbnail ? (
                                    <img src={item.product.thumbnail} alt={item.product.name} className="w-full h-full object-contain group-hover:scale-110 transition-transform duration-500" />
                                ) : (
                                    <FaImage className="text-gray-700 text-4xl" />
                                )}
                            </Link>

                            {/* Product Info */}
                            <div className="flex-1 text-center sm:text-left">
                                <p className="text-xs tracking-[0.2em] uppercase text-yellow-500 font-black mb-1.5 opacity-80">{item.product.brand}</p>
                                <Link to={`/products/${item.product.id}`}>
                                    <h3 className="text-2xl font-black text-white hover:text-yellow-400 transition tracking-tight leading-tight">{item.product.name}</h3>
                                </Link>
                                <p className="text-yellow-500 font-black text-xl mt-3">${item.product.price}</p>
                            </div>

                            {/* Quantity Controls */}
                            <div className="flex flex-col items-center gap-4 bg-[#12142B] px-4 py-3 rounded-2xl border border-gray-800">
                                <div className="flex items-center gap-3">
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                        disabled={item.quantity <= 1}
                                        className="w-10 h-10 flex items-center justify-center bg-[#242736] hover:bg-gray-700 text-white rounded-xl disabled:opacity-30 transition border border-gray-700"
                                    >
                                        <FaMinus size={10} />
                                    </button>
                                    <span className="w-10 text-center font-black text-lg">{item.quantity}</span>
                                    <button 
                                        onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                        disabled={item.quantity >= item.product.stock}
                                        className="w-10 h-10 flex items-center justify-center bg-[#242736] hover:bg-gray-700 text-white rounded-xl disabled:opacity-30 transition border border-gray-700"
                                    >
                                        <FaPlus size={10} />
                                    </button>
                                </div>
                                <button 
                                    onClick={() => removeFromCart(item.id)}
                                    className="text-red-400 hover:text-red-300 text-xs font-black uppercase tracking-widest flex items-center gap-1.5 transition mt-1"
                                >
                                    <FaTrash size={10} /> Remove Item
                                </button>
                            </div>

                            {/* Item Total */}
                            <div className="w-full sm:w-28 text-center sm:text-right">
                                <p className="text-gray-500 text-[10px] uppercase font-black tracking-widest mb-1">Subtotal</p>
                                <p className="font-black text-2xl text-white">
                                    ${(item.product.price * item.quantity).toFixed(2)}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Summary Card */}
                <div className="w-full lg:w-[380px]">
                    <div className="bg-[#1A1C29] rounded-3xl shadow-2xl border border-gray-800 p-8 h-fit sticky top-28 overflow-hidden relative">
                        {/* Static Glow decoration */}
                        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/5 blur-[60px] rounded-full -mr-16 -mt-16"></div>
                        
                        <h2 className="text-2xl font-black text-white mb-8 tracking-tight flex items-center gap-3">
                            <span className="w-2 h-7 bg-yellow-500 rounded-full inline-block"></span>
                            Order Summary
                        </h2>
                        
                        <div className="space-y-4 mb-8">
                            <div className="flex justify-between text-gray-400 font-medium">
                                <span>Items ({cartItems.length})</span>
                                <span className="text-white font-bold">${cartTotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-400 font-medium">
                                <span>Shipping</span>
                                <span className="text-green-400 font-bold uppercase text-xs tracking-widest">Free</span>
                            </div>
                            <div className="flex justify-between text-gray-400 font-medium">
                                <span>Taxes (Included)</span>
                                <span className="text-white font-bold">$0.00</span>
                            </div>
                        </div>
                        
                        <hr className="border-gray-800 my-8" />
                        
                        <div className="flex justify-between items-center mb-10">
                            <span className="text-lg font-black text-white uppercase tracking-tight">Total Amount</span>
                            <span className="text-3xl font-black text-yellow-500">${cartTotal.toFixed(2)}</span>
                        </div>
                        

                        <div className="mt-8 flex items-center justify-center gap-4 opacity-30 grayscale">
                            {/* Dummy payment icons */}
                            <div className="w-10 h-6 bg-white/20 rounded"></div>
                            <div className="w-10 h-6 bg-white/20 rounded"></div>
                            <div className="w-10 h-6 bg-white/20 rounded"></div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );

};

export default Cart;
