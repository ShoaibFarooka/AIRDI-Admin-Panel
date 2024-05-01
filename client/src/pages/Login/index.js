import React, { useState } from "react";
import './index.css';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import { useNavigate, useLocation } from "react-router-dom";
import Cookies from 'js-cookie';
import { TbEye } from "react-icons/tb";
import { TbEyeOff } from "react-icons/tb";
import { isValidEmail } from "../../utils/validationUtils";
import userService from '../../services/userService';

const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: ''
    });
    const [errors, setErrors] = useState({
        email: false,
        password: false
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();

    const validateInputs = () => {
        const { email, password } = formData;
        const errorsCopy = { ...errors };
        let hasErrors = false;

        // Validate email
        if (!email || !isValidEmail(email)) {
            errorsCopy.email = true;
            hasErrors = true;
        } else {
            errorsCopy.email = false;
        }

        // Validate password
        if (!password) {
            errorsCopy.password = true;
            hasErrors = true;
        } else {
            errorsCopy.password = false;
        }
        setErrors(errorsCopy);
        if (hasErrors) {
            return false;
        }
        else {
            return true;
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleSubmit = async () => {
        if (!validateInputs()) {
            return;
        }
        try {
            dispatch(ShowLoading());
            const response = await userService.loginAdmin(formData);
            if (response.token) {
                Cookies.set('airdi-jwt-token', response.token, {
                    secure: true,
                    sameSite: 'Lax'
                });
                const from = location.state?.from.pathname;
                navigate(from || '/');
            }
        } catch (error) {
            message.error(error.response.data);
        }
        dispatch(HideLoading());
    };

    return (
        <div className="login-page">
            <div className="section-1">
                <div className="logo-container">
                    <img className="logo" src={'https://i.ibb.co/zh78QW3/Airdi-Logo.png'} alt="airdi-logo" />
                </div>
            </div>
            <div className="section-2">
                <div className="content">
                    <div className="title">Login</div>
                    <div>
                        <input
                            type="text"
                            className="input"
                            placeholder="Email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                        />
                        {errors.email && <div className="error-message">Please enter the valid email</div>}
                    </div>
                    <div className="password-container">
                        <input
                            type={showPassword ? 'text' : 'password'}
                            className="input"
                            placeholder="Password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        {!showPassword ?
                            <TbEye className="icon" size={26} onClick={() => setShowPassword(!showPassword)} />
                            :
                            <TbEyeOff className="icon" size={26} onClick={() => setShowPassword(!showPassword)} />
                        }
                        {errors.password && <div className="error-message">Please enter the password</div>}
                    </div>
                    <div className="forget-div">
                        <div >Forget Password?</div>
                    </div>
                    <button className="login-btn" onClick={handleSubmit}>Login</button>
                </div>
            </div>
        </div>
    )
};

export default Login;