import axiosInstance from './axiosInstance';

const saleService = {
    fetchSalesReport: async (payload) => {
        try {
            const response = await axiosInstance.post(`/admin/get-sales-report`, payload);
            return response.data;
        } catch (error) {
            console.error('Error fetching sales report:', error);
            throw error;
        }
    },
};

export default saleService;