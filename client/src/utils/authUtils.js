import Cookies from 'js-cookie';

const isAuthenticated = () => {
    const token = Cookies.get('airdi-jwt-token');
    //Verify Token from server
    return !!token;
};

export { isAuthenticated };