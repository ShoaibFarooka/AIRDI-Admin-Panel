import axiosInstance from './axiosInstance';

const busService = {
    fetchBusesInfo: async () => {
        try {
            const response = await axiosInstance.get(`/admin/get-buses-info`);
            return response.data;
        } catch (error) {
            console.error('Error fetching info:', error);
            throw error;
        }
    },
    fetchBusPassengerList: async (payload) => {
        try {
            const response = await axiosInstance.post(`/admin/get-passenger-list`, payload);
            return response.data;
        } catch (error) {
            console.error('Error fetching passengers:', error);
            throw error;
        }
    },
    fetchPassenger: async (payload) => {
        try {
            const response = await axiosInstance.post(`/admin/search-passenger`, payload);
            return response.data;
        } catch (error) {
            console.error('Error fetching passenger:', error);
            throw error;
        }
    },
    checkInPassenger: async (bookingId, payload) => {
        try {
            const response = await axiosInstance.patch(`/admin/check-in-passenger/${bookingId}`, payload);
            return response.data;
        } catch (error) {
            console.error('Error checking in passenger:', error);
            throw error;
        }
    },
    filterPassengers: async (payload) => {
        try {
            const response = await axiosInstance.post(`/admin/get-filtered-passengers`, payload);
            return response.data;
        } catch (error) {
            console.error('Error filtering passengers:', error);
            throw error;
        }
    },
    downloadBooking: async (bookingId) => {
        try {
            const response = await axiosInstance.get(`/booking/download-ticket/${bookingId}`, {
                responseType: 'arraybuffer',
                headers: {
                    Accept: 'application/pdf',
                },
            });
            return response;
        } catch (error) {
            throw error;
        }
    },
    getBusAccessForCheckout: async () => {
        try {
            const response = await axiosInstance.get(`/buses/get-access`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getBusAccess: async () => {
        try {
            const response = await axiosInstance.get(`/admin/get-bus-access`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateBusAccess: async (payload) => {
        try {
            const response = await axiosInstance.patch(`/admin/update-bus-access`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    addVoucher: async (payload) => {
        try {
            const response = await axiosInstance.post(`/admin/add-voucher`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateVoucher: async (voucherId, payload) => {
        try {
            const response = await axiosInstance.patch(`/admin/update-voucher/${voucherId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    addExtra: async (payload) => {
        try {
            const response = await axiosInstance.post(`/admin/add-extra`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateExtra: async (extraId, payload) => {
        try {
            const response = await axiosInstance.patch(`/admin/update-extra/${extraId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    deleteExtra: async (extraId) => {
        try {
            const response = await axiosInstance.delete(`/admin/delete-extra/${extraId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAllDepartures: async () => {
        try {
            const response = await axiosInstance.get(`/buses/get-all-departure-points`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAllArrivals: async () => {
        try {
            const response = await axiosInstance.get(`/buses/get-all-arrival-points`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getAllBuses: async (payload) => {
        try {
            const response = await axiosInstance.post(`/buses/find-bus`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    verifyBooking: async (bookingId) => {
        try {
            const response = await axiosInstance.get(`/booking/verify-ticket/${bookingId}`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    createRoute: async (payload) => {
        try {
            const response = await axiosInstance.post(`/admin/create-route`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    getRoutes: async () => {
        try {
            const response = await axiosInstance.get(`/admin/get-routes`);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
    updateRoute: async (routeId, payload) => {
        try {
            const response = await axiosInstance.patch(`/admin/update-route/${routeId}`, payload);
            return response.data;
        } catch (error) {
            throw error;
        }
    },
};


export default busService;