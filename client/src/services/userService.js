import axiosInstance from './axiosInstance';

const userService = {
    loginAdmin: async (payload) => {
        try {
            const response = await axiosInstance.post(`/admin/login`, payload);
            return response.data;
        } catch (error) {
            console.error('Error fetching user:', error);
            throw error;
        }
    },
};

export default userService;