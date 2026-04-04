import axiosInstance from './axiosInstance';

export const login = async (credentials) => {
    const response = await axiosInstance.post('auth/login/', credentials);
    return response.data;
};

export const register = async (userData) => {
    const response = await axiosInstance.post('auth/register/', userData);
    return response.data;
};

export const logout = async (refreshToken) => {
    const response = await axiosInstance.post('auth/logout/', { refresh: refreshToken });
    return response.data;
};

export const changePassword = async (passwords) => {
    const response = await axiosInstance.post('auth/change-password/', passwords);
    return response.data;
};

export const requestPasswordReset = async (email) => {
    const response = await axiosInstance.post('auth/reset-password-request/', { email });
    return response.data;
};

export const resetPasswordConfirm = async (data) => {
    const response = await axiosInstance.post('auth/reset-password-confirm/', data);
    return response.data;
};

export const getDashboardStats = async () => {
    const response = await axiosInstance.get('auth/dashboard-stats/');
    return response.data;
};

