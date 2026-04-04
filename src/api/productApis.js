import axiosInstance from './axiosInstance';

export const getProducts = async (params = {}) => {
    const response = await axiosInstance.get('products/', { params });
    return response.data;
};

export const getProductById = async (id) => {
    const response = await axiosInstance.get(`products/${id}/`);
    return response.data;
};

export const createProduct = async (formData) => {
    const response = await axiosInstance.post('products/', formData);
    return response.data;
};

export const updateProduct = async (id, formData) => {
    const response = await axiosInstance.patch(`products/${id}/`, formData);
    return response.data;
};

export const deleteProduct = async (id) => {
    const response = await axiosInstance.delete(`products/${id}/`);
    return response.data;
};
