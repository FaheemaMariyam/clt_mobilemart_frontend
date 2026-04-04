import React, { useEffect, useState, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getProductById } from '../api/productApis';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';
import toast from 'react-hot-toast';
import { FaShoppingCart, FaArrowLeft, FaPlay, FaCheckCircle } from 'react-icons/fa';

const ProductDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { user } = useAuth();
    const { addToCart, isInCart } = useCart();
    
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [activeMedia, setActiveMedia] = useState(null);
    const [addingToCart, setAddingToCart] = useState(false);

    useEffect(() => {
        const fetchProductListings = async () => {
            try {
                const data = await getProductById(id);
                setProduct(data);
                // Set the primary image as the initial active media
                if (data.image1) setActiveMedia({ type: 'image', url: data.image1 });
                else if (data.image2) setActiveMedia({ type: 'image', url: data.image2 });
                else if (data.image3) setActiveMedia({ type: 'image', url: data.image3 });
                else if (data.video) setActiveMedia({ type: 'video', url: data.video });
            } catch (error) {
                console.error('Fetch error:', error);
                toast.error('Product not found');
                navigate('/products');
            } finally {
                setLoading(false);
            }
        };
        fetchProductListings();
    }, [id, navigate]);

    const handleAddToCart = async () => {
        setAddingToCart(true);
        const success = await addToCart(product.id, 1);
        if (!success && !user) navigate('/login');
        setAddingToCart(false);
    };

    if (loading) return <div className="text-center py-20 text-xl font-semibold">Loading Product Details...</div>;
    if (!product) return null;

    // Helper to format specifications safely
    const renderSpecs = () => {
        if (!product.specifications) return <p className="text-gray-500 italic">No specifications provided.</p>;
        
        let specString = '';
        if (typeof product.specifications === 'string') {
            specString = product.specifications;
        } else if (product.specifications.detail) {
            specString = product.specifications.detail;
        } else {
            specString = JSON.stringify(product.specifications);
        }

        return (
            <div className="bg-[#242736] p-5 rounded-2xl border border-gray-800 text-sm text-gray-300 leading-relaxed shadow-inner">
                {specString}
            </div>
        );
    };

    return (
        <div className="max-w-6xl mx-auto py-8 px-4 text-white">
            <button 
                onClick={() => navigate('/products')} 
                className="flex items-center text-yellow-500 hover:text-yellow-400 mb-6 font-bold transition"
            >
                <FaArrowLeft className="mr-2" /> Back to Shop
            </button>

            <div className="bg-[#1A1C29] rounded-3xl shadow-2xl overflow-hidden border border-gray-800">
                <div className="grid grid-cols-1 md:grid-cols-2">
                    
                    {/* Media Section */}
                    <div className="bg-[#12142B] p-6 lg:p-10 flex flex-col justify-center border-r border-gray-800 relative shadow-inner">
                        <div className="aspect-square bg-[#242736] rounded-2xl border border-gray-800 overflow-hidden mb-6 relative flex items-center justify-center">
                            {activeMedia ? (
                                activeMedia.type === 'video' ? (
                                    <video src={activeMedia.url} controls className="w-full h-full object-cover" />
                                ) : (
                                    <img src={activeMedia.url} alt={product.name} className="w-full h-full object-contain p-6 hover:scale-105 transition-transform duration-500" />
                                )
                            ) : (
                                <span className="text-gray-500 font-semibold italic text-lg">No Media Available</span>
                            )}
                        </div>

                        {/* Thumbnails */}
                        <div className="flex gap-4 justify-center overflow-x-auto py-2">
                            {product.image1 && (
                                <button onClick={() => setActiveMedia({ type: 'image', url: product.image1 })} className={`w-20 h-20 rounded-xl border-2 overflow-hidden flex-shrink-0 transition bg-[#1A1C29] ${activeMedia?.url === product.image1 ? 'border-yellow-500 shadow-[0_0_15px_rgba(255,176,0,0.3)] transform scale-110' : 'border-gray-700 hover:border-gray-500'}`}>
                                    <img src={product.image1} alt="Thumbnail 1" className="w-full h-full object-cover p-1" />
                                </button>
                            )}
                            {product.image2 && (
                                <button onClick={() => setActiveMedia({ type: 'image', url: product.image2 })} className={`w-20 h-20 rounded-xl border-2 overflow-hidden flex-shrink-0 transition bg-[#1A1C29] ${activeMedia?.url === product.image2 ? 'border-yellow-500 shadow-[0_0_15px_rgba(255,176,0,0.3)] transform scale-110' : 'border-gray-700 hover:border-gray-500'}`}>
                                    <img src={product.image2} alt="Thumbnail 2" className="w-full h-full object-cover p-1" />
                                </button>
                            )}
                            {product.image3 && (
                                <button onClick={() => setActiveMedia({ type: 'image', url: product.image3 })} className={`w-20 h-20 rounded-xl border-2 overflow-hidden flex-shrink-0 transition bg-[#1A1C29] ${activeMedia?.url === product.image3 ? 'border-yellow-500 shadow-[0_0_15px_rgba(255,176,0,0.3)] transform scale-110' : 'border-gray-700 hover:border-gray-500'}`}>
                                    <img src={product.image3} alt="Thumbnail 3" className="w-full h-full object-cover p-1" />
                                </button>
                            )}
                            {product.video && (
                                <button onClick={() => setActiveMedia({ type: 'video', url: product.video })} className={`w-20 h-20 rounded-xl border-2 bg-black overflow-hidden flex-shrink-0 flex items-center justify-center relative transition ${activeMedia?.url === product.video ? 'border-yellow-500 shadow-[0_0_15px_rgba(255,176,0,0.3)] transform scale-110' : 'border-gray-700 hover:border-gray-500'}`}>
                                    <video src={product.video} className="w-full h-full object-cover opacity-50" />
                                    <FaPlay className={`${activeMedia?.url === product.video ? 'text-yellow-500' : 'text-white'} absolute text-2xl z-10`} />
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Details Section */}
                    <div className="p-8 lg:p-12 flex flex-col justify-between">
                        <div>
                            <span className="bg-yellow-500/10 text-yellow-500 text-xs font-black px-4 py-1.5 rounded-full uppercase tracking-widest border border-yellow-500/20">
                                {product.brand || 'No Brand'}
                            </span>
                            <h1 className="text-4xl lg:text-5xl font-black text-white mt-6 mb-4 tracking-tight">{product.name}</h1>
                            
                            <div className="flex items-center gap-5 mb-8">
                                <p className="text-4xl font-black text-yellow-500">${product.price}</p>
                                {product.stock > 0 ? (
                                    <span className="text-green-400 font-bold bg-green-500/10 px-3 py-1.5 rounded-lg text-sm border border-green-500/20 shadow-[0_0_10px_rgba(74,222,128,0.1)]">
                                        In Stock ({product.stock})
                                    </span>
                                ) : (
                                    <span className="text-red-400 font-bold bg-red-500/10 px-3 py-1.5 rounded-lg text-sm border border-red-500/20">
                                        Out of Stock
                                    </span>
                                )}
                            </div>

                            <hr className="my-8 border-gray-800" />

                            <div className="mb-8">
                                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                    <span className="w-2 h-6 bg-yellow-500 rounded-full inline-block"></span> Description
                                </h3>
                                <p className="text-gray-400 leading-relaxed text-[15px]">
                                    {product.description || <span className="italic">No description available.</span>}
                                </p>
                            </div>

                            <div className="mb-10">
                                <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-2">
                                    <span className="w-2 h-6 bg-blue-500 rounded-full inline-block"></span> Specifications
                                </h3>
                                <div className="bg-[#242736] p-5 rounded-xl border border-gray-800 text-sm text-gray-300 leading-relaxed shadow-inner">
                                    {renderSpecs()}
                                </div>
                            </div>
                        </div>

                        {/* Action Area */}
                        <div className="mt-auto pt-8">
                            <button 
                                onClick={handleAddToCart}
                                disabled={addingToCart || product.stock <= 0 || isInCart(product.id)}
                                className={`w-full flex items-center justify-center gap-3 py-5 rounded-2xl text-xl font-black uppercase tracking-wide transition-all shadow-xl
                                    ${isInCart(product.id)
                                        ? 'bg-green-500 text-white cursor-default shadow-green-500/20'
                                        : product.stock > 0 && !addingToCart 
                                            ? 'bg-yellow-500 hover:bg-yellow-400 text-black hover:shadow-[0_0_20px_rgba(255,176,0,0.5)] transform hover:-translate-y-1' 
                                            : 'bg-gray-800 text-gray-600 border border-gray-700 cursor-not-allowed'}`}
                            >
                                {isInCart(product.id) ? <FaCheckCircle /> : <FaShoppingCart />}
                                {isInCart(product.id) 
                                    ? 'Already in Cart' 
                                    : addingToCart ? 'Adding to Cart...' : (product.stock > 0 ? 'Add to Cart' : 'Out of Stock')}
                            </button>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
