import axiosInstance from './axiosInstance';

const paymentService = {
    buyTicket: async (payload) => {
        try {
            const response = await axiosInstance.post(`/admin/buy-ticket`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};

export default paymentService;