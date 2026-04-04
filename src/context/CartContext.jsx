import React, { createContext, useState, useContext, useEffect } from 'react';
import { getCart, addToCart as apiAddToCart, updateCartItem, removeFromCart as apiRemoveFromCart } from '../api/cartApis';
import { useAuth } from './AuthContext';
import toast from 'react-hot-toast';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
    const { user } = useAuth();
    const [cartItems, setCartItems] = useState([]);
    const [cartTotal, setCartTotal] = useState(0);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (user && user.role !== 'admin') {
            fetchCart();
        } else {
            setCartItems([]);
            setCartTotal(0);
        }
    }, [user]);

    const fetchCart = async () => {
        setLoading(true);
        try {
            const data = await getCart();
            setCartItems(data.items || []);
            setCartTotal(data.grand_total || 0);
        } catch (error) {
            console.error("Failed to fetch cart", error);
        } finally {
            setLoading(false);
        }
    };

    const addToCart = async (productId, quantity = 1) => {
        if (!user) {
            toast.error('Please login to add items to your cart.');
            return false;
        }
        if (user.role === 'admin') {
            toast.error('Admins cannot purchase products.');
            return false;
        }

        try {
            await apiAddToCart(productId, quantity);
            toast.success('Added to Cart!');
            await fetchCart(); // Refresh cart to get the latest state and total
            return true;
        } catch (error) {
            toast.error('Failed to add to cart.');
            return false;
        }
    };

    const updateQuantity = async (itemId, quantity) => {
        if (quantity < 1) return; // Prevent negative/zero from UI
        
        const item = cartItems.find(i => i.id === itemId);
        if (item && quantity > item.product.stock) {
            toast.error(`Exceeds available stock (${item.product.stock})`);
            return;
        }

        try {
            await updateCartItem(itemId, quantity);
            await fetchCart();
        } catch (error) {
            toast.error('Failed to update quantity.');
        }
    };

    const removeFromCart = async (itemId) => {
        try {
            await apiRemoveFromCart(itemId);
            toast.success('Removed from cart');
            await fetchCart();
        } catch (error) {
            toast.error('Failed to remove item.');
        }
    };

    const isInCart = (productId) => {
        return cartItems.some(item => item.product.id === productId);
    };

    const cartCount = cartItems.length;

    return (
        <CartContext.Provider value={{
            cartItems,
            cartTotal,
            cartCount,
            loading,
            fetchCart,
            addToCart,
            updateQuantity,
            removeFromCart,
            isInCart
        }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => useContext(CartContext);
