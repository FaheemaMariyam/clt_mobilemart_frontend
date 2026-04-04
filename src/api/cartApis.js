import axiosInstance from './axiosInstance';

export const getCart = async () => {
    const response = await axiosInstance.get('cart/');
    return response.data;
};

export const addToCart = async (productId, quantity = 1) => {
    const response = await axiosInstance.post('cart/', {
        product_id: productId,
        quantity: quantity,
    });
    return response.data;
};

export const updateCartItem = async (itemId, quantity) => {
    const response = await axiosInstance.put(`cart/${itemId}/`, {
        quantity: quantity,
    });
    return response.data;
};

export const removeFromCart = async (itemId) => {
    const response = await axiosInstance.delete(`cart/${itemId}/`);
    return response.data;
};
