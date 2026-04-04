import React, { useEffect, useState } from 'react';
import { getProducts, deleteProduct, createProduct, updateProduct } from '../api/productApis';
import toast from 'react-hot-toast';
import { FaEdit, FaTrash, FaPlus, FaImage, FaVideo, FaTimes, FaEye, FaChevronRight } from 'react-icons/fa';

const AdminProducts = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [isEditMode, setIsEditMode] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    
    const [formData, setFormData] = useState({ 
        name: '', 
        brand: '', 
        price: '', 
        description: '', 
        stock: '10',
        specifications: '' 
    });
    const [media, setMedia] = useState({
        image1: null,
        image2: null,
        image3: null,
        video: null
    });

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async () => {
        try {
            const data = await getProducts();
            setProducts(data.results || data);
        } catch (error) {
            toast.error('Failed to fetch products');
        } finally {
            setLoading(false);
        }
    };

    const handleFileChange = (e, field) => {
        setMedia({ ...media, [field]: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        const data = new FormData();
        Object.keys(formData).forEach(key => {
            if (key === 'specifications') {
                data.append(key, JSON.stringify({ detail: formData[key] }));
            } else {
                data.append(key, formData[key]);
            }
        });

        if (media.image1) data.append('image1', media.image1);
        if (media.image2) data.append('image2', media.image2);
        if (media.image3) data.append('image3', media.image3);
        if (media.video) data.append('video', media.video);

        try {
            if (selectedProduct) {
                await updateProduct(selectedProduct.id, data);
                toast.success('Product updated');
            } else {
                await createProduct(data);
                toast.success('Product created');
            }
            setShowModal(false);
            fetchProducts();
            resetForm();
        } catch (error) {
            console.error('Submit error:', error.response?.data);
            toast.error('Failed to save product');
        }
    };

    const resetForm = () => {
        setSelectedProduct(null);
        setFormData({ name: '', brand: '', price: '', description: '', stock: '10', specifications: '' });
        setMedia({ image1: null, image2: null, image3: null, video: null });
        setIsEditMode(false);
    };

    const openModal = (product = null, edit = false) => {
        if (product) {
            setSelectedProduct(product);
            const specsData = product.specifications;
            let displaySpecs = '';
            if (specsData) {
                if (typeof specsData === 'string') displaySpecs = specsData;
                else if (specsData.detail) displaySpecs = specsData.detail;
                else displaySpecs = JSON.stringify(specsData);
            }

            setFormData({
                name: product.name,
                brand: product.brand || '',
                price: product.price || '',
                description: product.description || '',
                stock: product.stock || '10',
                specifications: displaySpecs
            });
            setIsEditMode(edit);
        } else {
            resetForm();
            setIsEditMode(true);
        }
        setShowModal(true);
    };

    const handleDelete = async (id) => {
        if (window.confirm('Delete this product permanently?')) {
            try {
                await deleteProduct(id);
                toast.success('Product deleted');
                setShowModal(false);
                fetchProducts();
            } catch (error) {
                toast.error('Failed to delete');
            }
        }
    };

    if (loading) return (
        <div className="flex flex-col items-center justify-center py-20 text-white">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-yellow-500 mb-4"></div>
            <p className="font-bold uppercase tracking-widest text-xs opacity-60">Synchronizing Inventory...</p>
        </div>
    );

    return (
        <div className="space-y-10 text-white">
            <div className="flex justify-between items-center bg-[#1A1C29] p-8 rounded-3xl border border-gray-800 shadow-xl">
                <div>
                    <h2 className="text-3xl font-black tracking-tight uppercase border-l-4 border-yellow-500 pl-4">Product Catalog</h2>
                    <p className="text-gray-500 text-sm font-bold mt-1 ml-5 italic">Exclusive Admin View</p>
                </div>
                <button 
                    onClick={() => openModal()} 
                    className="bg-yellow-500 text-black px-8 py-3.5 rounded-2xl flex items-center gap-3 hover:bg-yellow-400 transition font-black uppercase tracking-widest text-xs shadow-[0_10px_20px_rgba(255,176,0,0.2)]"
                >
                    <FaPlus size={14} /> New Device
                </button>
            </div>

            <div className="grid grid-cols-1 gap-4">
                {products.map((p) => (
                    <div 
                        key={p.id} 
                        onClick={() => openModal(p)}
                        className="bg-[#1A1C29] p-4 rounded-3xl border border-gray-800 hover:border-yellow-500/50 transition-all cursor-pointer group flex items-center justify-between"
                    >
                        <div className="flex items-center gap-6">
                            <div className="w-20 h-20 bg-[#12142B] rounded-2xl overflow-hidden border border-gray-800 p-2 transform group-hover:scale-105 transition-transform">
                                <img src={p.thumbnail || p.image1} alt={p.name} className="w-full h-full object-contain" />
                            </div>
                            <div>
                                <h3 className="text-xl font-black text-white group-hover:text-yellow-500 transition-colors uppercase tracking-tight">{p.name}</h3>
                                <div className="flex items-center gap-4 mt-1">
                                    <span className="text-[10px] font-black uppercase tracking-widest text-gray-500 px-3 py-1 bg-gray-800/50 rounded-full">{p.brand}</span>
                                    <span className="text-yellow-500 font-black tracking-widest text-sm">${p.price}</span>
                                </div>
                            </div>
                        </div>
                        <div className="flex items-center gap-4 px-6">
                            <span className={`text-[10px] font-black uppercase px-4 py-2 rounded-xl ${p.stock > 0 ? 'bg-green-500/10 text-green-400' : 'bg-red-500/10 text-red-500'}`}>
                                {p.stock} In Stock
                            </span>
                            <FaChevronRight className="text-gray-700 group-hover:text-yellow-500 transition-colors" />
                        </div>
                    </div>
                ))}
            </div>

            {/* Comprehensive Detail / Edit Modal */}
            {showModal && (
                <div className="fixed inset-0 bg-black/90 backdrop-blur-xl flex justify-center p-4 z-[70] overflow-y-auto">
                    <div className="bg-[#1A1C29] rounded-[48px] max-w-5xl w-full p-8 lg:p-12 shadow-3xl border border-gray-800 my-auto md:my-10 h-fit relative overflow-hidden">
                        
                        {/* Modal Header */}
                        <div className="flex justify-between items-start mb-10">
                            <div>
                                <h2 className="text-4xl font-black text-white uppercase tracking-tighter flex items-center gap-4">
                                    <span className="w-4 h-10 bg-yellow-500 rounded-full shadow-[0_0_20px_rgba(255,176,0,0.5)]"></span>
                                    {isEditMode ? (selectedProduct ? 'Update Inventory' : 'Add New Device') : 'Device Information'}
                                </h2>
                                <p className="text-gray-500 font-bold uppercase tracking-widest text-xs mt-2 ml-8">Product Management Portal</p>
                            </div>
                            <button onClick={() => setShowModal(false)} className="p-4 bg-gray-800/50 hover:bg-gray-700 text-white rounded-2xl transition">
                                <FaTimes size={24} />
                            </button>
                        </div>

                        {!isEditMode ? (
                            /* VIEW DETAIL MODE */
                            <div className="space-y-12">
                                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
                                    {/* Gallery & Video */}
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-3 gap-4 h-64">
                                            <img src={selectedProduct.image1 || selectedProduct.thumbnail} className="w-full h-full object-cover rounded-3xl border border-gray-800 bg-[#12142B] p-2" alt="View 1" />
                                            <img src={selectedProduct.image2 || selectedProduct.thumbnail} className="w-full h-full object-cover rounded-3xl border border-gray-800 opacity-50 bg-[#12142B] p-2" alt="View 2" />
                                            <img src={selectedProduct.image3 || selectedProduct.thumbnail} className="w-full h-full object-cover rounded-3xl border border-gray-800 opacity-30 bg-[#12142B] p-2" alt="View 3" />
                                        </div>
                                        {selectedProduct.video && (
                                            <div className="aspect-video w-full rounded-3xl overflow-hidden border border-gray-800 shadow-2xl relative group">
                                                <video src={selectedProduct.video} controls className="w-full h-full object-cover" />
                                                <div className="absolute top-4 left-4 bg-red-600 text-white px-4 py-1 text-[8px] font-black uppercase tracking-widest rounded-full opacity-0 group-hover:opacity-100 transition-opacity">Live Promo</div>
                                            </div>
                                        )}
                                    </div>

                                    {/* Product Details info */}
                                    <div className="space-y-8">
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500 opacity-50 mb-3 block">Specifications</label>
                                            <p className="text-2xl font-black text-white leading-tight">{formData.specifications || 'Standard Model'}</p>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500 opacity-50 mb-3 block">Market Value</label>
                                            <p className="text-5xl font-black text-yellow-500">${selectedProduct.price}</p>
                                        </div>
                                        <div>
                                            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-yellow-500 opacity-50 mb-3 block">Product Insight</label>
                                            <p className="text-gray-400 font-medium leading-relaxed italic">"{selectedProduct.description}"</p>
                                        </div>
                                        <div className="flex gap-4 pt-4">
                                            <button 
                                                onClick={() => setIsEditMode(true)}
                                                className="flex-1 bg-yellow-500 text-black py-5 rounded-3xl font-black uppercase tracking-widest text-xs flex items-center justify-center gap-3 hover:bg-yellow-400 transition shadow-[0_15px_30px_rgba(255,176,0,0.2)]"
                                            >
                                                <FaEdit /> Modify Record
                                            </button>
                                            <button 
                                                onClick={() => handleDelete(selectedProduct.id)}
                                                className="px-8 bg-red-600/10 text-red-500 py-5 rounded-3xl font-black uppercase tracking-widest text-xs hover:bg-red-600 hover:text-white transition border border-red-600/20"
                                            >
                                                <FaTrash />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            /* EDIT MODE */
                            <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-10">
                                <div className="space-y-6">
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-[0.2em]">Model Identity</label>
                                        <input 
                                            type="text" required 
                                            className="w-full bg-[#12142B] border border-gray-800 p-5 rounded-[24px] focus:ring-2 focus:ring-yellow-500 outline-none transition font-bold text-white placeholder-gray-700" 
                                            value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} placeholder="Device Name"
                                        />
                                    </div>
                                    <div className="grid grid-cols-2 gap-6">
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-[0.2em]">Brand Agency</label>
                                            <input 
                                                type="text" 
                                                className="w-full bg-[#12142B] border border-gray-800 p-5 rounded-[24px] focus:ring-2 focus:ring-yellow-500 outline-none transition font-bold text-white placeholder-gray-700" 
                                                value={formData.brand} onChange={(e) => setFormData({...formData, brand: e.target.value})} placeholder="e.g. Apple"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-[0.2em]">Listing Price ($)</label>
                                            <input 
                                                type="number" step="0.01" 
                                                className="w-full bg-[#12142B] border border-gray-800 p-5 rounded-[24px] focus:ring-2 focus:ring-yellow-500 outline-none transition font-bold text-white" 
                                                value={formData.price} onChange={(e) => setFormData({...formData, price: e.target.value})} placeholder="0.00"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-[0.2em]">Inventory Count</label>
                                            <input 
                                                type="number" 
                                                className="w-full bg-[#12142B] border border-gray-800 p-5 rounded-[24px] focus:ring-2 focus:ring-yellow-500 outline-none transition font-bold text-white" 
                                                value={formData.stock} onChange={(e) => setFormData({...formData, stock: e.target.value})} placeholder="0"
                                            />
                                        </div>
                                        <div>
                                            <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-[0.2em]">Specifications</label>
                                            <input 
                                                type="text" 
                                                className="w-full bg-[#12142B] border border-gray-800 p-5 rounded-[24px] focus:ring-2 focus:ring-yellow-500 outline-none transition font-bold text-white" 
                                                value={formData.specifications} onChange={(e) => setFormData({...formData, specifications: e.target.value})} placeholder="e.g. 5G, 256GB"
                                            />
                                        </div>
                                    </div>
                                    <div>
                                        <label className="block text-[10px] font-black text-gray-500 mb-3 uppercase tracking-[0.2em]">Catalog Description</label>
                                        <textarea 
                                            rows="4" 
                                            className="w-full bg-[#12142B] border border-gray-800 p-5 rounded-[24px] focus:ring-2 focus:ring-yellow-500 outline-none transition font-bold text-white resize-none" 
                                            value={formData.description} onChange={(e) => setFormData({...formData, description: e.target.value})} placeholder="Describe the model..."
                                        />
                                    </div>
                                </div>

                                <div className="space-y-6">
                                    <div className="bg-[#12142B] rounded-[32px] p-8 border border-gray-800 border-dashed">
                                        <h3 className="text-xs font-black uppercase tracking-widest text-gray-500 mb-8 flex items-center gap-3">
                                            <FaPlus size={10} className="text-yellow-500" /> Upload Media Bundle
                                        </h3>
                                        <div className="space-y-5">
                                            <MediaInput icon={FaImage} label="Main Perspective" onChange={(e) => handleFileChange(e, 'image1')} />
                                            <MediaInput icon={FaImage} label="Side Profile" onChange={(e) => handleFileChange(e, 'image2')} />
                                            <MediaInput icon={FaImage} label="Detailed Close-up" onChange={(e) => handleFileChange(e, 'image3')} />
                                            <MediaInput icon={FaVideo} label="Video Presentation" onChange={(e) => handleFileChange(e, 'video')} accent="text-red-500" />
                                        </div>
                                    </div>
                                    <div className="flex gap-4 pt-4">
                                        <button 
                                            type="button" 
                                            onClick={() => selectedProduct ? setIsEditMode(false) : setShowModal(false)}
                                            className="flex-1 bg-gray-800/10 text-white font-black py-5 rounded-[24px] border border-gray-800 hover:bg-gray-800 transition uppercase text-xs tracking-widest"
                                        >
                                            Discard
                                        </button>
                                        <button 
                                            type="submit" 
                                            className="flex-1 bg-yellow-500 text-black py-5 rounded-[24px] font-black uppercase tracking-widest text-xs hover:bg-yellow-400 transition shadow-[0_15px_30px_rgba(255,176,0,0.2)]"
                                        >
                                            {selectedProduct ? 'Save Modification' : 'Publish Model'}
                                        </button>
                                    </div>
                                </div>
                            </form>
                        )}
                    </div>
                </div>
            )}
        </div>
    );

};

const MediaInput = ({ icon: Icon, label, onChange, accent = "text-yellow-500" }) => (
    <div className="flex items-center gap-4 bg-[#1A1C29] p-4 rounded-2xl border border-gray-800">
        <Icon className={`${accent} text-xl shrink-0`} />
        <div className="flex-1 overflow-hidden">
            <span className="block text-[9px] font-black uppercase tracking-widest text-gray-600 mb-1">{label}</span>
            <input type="file" onChange={onChange} className="text-[10px] text-gray-500 file:hidden" />
        </div>
    </div>
);

export default AdminProducts;
