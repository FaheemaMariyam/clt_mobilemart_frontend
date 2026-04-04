import axiosInstance from './axiosInstance';

export const getUsers = async () => {
    const response = await axiosInstance.get('auth/users/');
    return response.data;
};

export const updateUser = async (id, userData) => {
    const response = await axiosInstance.patch(`auth/users/${id}/`, userData);
    return response.data;
};

export const deleteUser = async (id) => {
    const response = await axiosInstance.delete(`auth/users/${id}/`);
    return response.data;
};
