import React, { useState } from "react";
import './index.css';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import busService from "../../../../services/busService";

const GeneralSetting = ({ data, getData }) => {
    const [formData, setFormData] = useState({
        advanceBooking: data.advanceBooking,
        bufferTime: data.bufferTime,
        serviceFee: data.serviceFee
    });
    const [errors, setErrors] = useState({
        advanceBooking: false,
        bufferTime: false,
        serviceFee: false
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'advanceBooking' || name === 'bufferTime' || name === 'serviceFee') {
            const numberRegex = /^[0-9]*$/;
            if (!numberRegex.test(value)) {
                return;
            }
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const validateInputs = () => {
        const { advanceBooking, bufferTime, serviceFee } = formData;
        const errorsCopy = { ...errors };
        let hasErrors = false;
        if (!advanceBooking) {
            errorsCopy.advanceBooking = true;
            hasErrors = true;
        } else {
            errorsCopy.advanceBooking = false;
        }
        if (!bufferTime) {
            errorsCopy.bufferTime = true;
            hasErrors = true;
        } else {
            errorsCopy.bufferTime = false;
        }
        if (!serviceFee) {
            errorsCopy.serviceFee = true;
            hasErrors = true;
        } else {
            errorsCopy.serviceFee = false;
        }
        setErrors(errorsCopy);
        if (hasErrors) {
            return false;
        }
        else {
            return true;
        }
    };

    const handleUpdate = async () => {
        if (!validateInputs()) {
            return;
        }
        dispatch(ShowLoading());
        const payload = {
            advanceBooking: Number(formData.advanceBooking),
            bufferTime: Number(formData.bufferTime),
            serviceFee: Number(formData.serviceFee)
        }
        try {
            const response = await busService.updateBusAccess(payload);
            message.success(response);
            getData();
        } catch (error) {
            message.error(error.response.data);
        }
        dispatch(HideLoading());
    }

    return (
        <div className="general-setting">
            <div className="input-container">
                <label htmlFor="advanceBooking" className="label">Advanced Booking (days):</label>
                <input
                    type="text"
                    className="input"
                    id="advanceBooking"
                    name="advanceBooking"
                    value={formData.advanceBooking}
                    onChange={handleChange}
                />
                {errors.advanceBooking &&
                    <div className="error">This field can't be empty</div>
                }
            </div>
            <div className="input-container">
                <label htmlFor="bufferTime" className="label">Buffer Time (minutes):</label>
                <input
                    type="text"
                    className="input"
                    id="bufferTime"
                    name="bufferTime"
                    value={formData.bufferTime}
                    onChange={handleChange}
                />
                {errors.bufferTime &&
                    <div className="error">This field can't be empty</div>
                }
            </div>
            <div className="input-container">
                <label htmlFor="serviceFee" className="label">Service Fee ($):</label>
                <input
                    type="text"
                    className="input"
                    id="serviceFee"
                    name="serviceFee"
                    value={formData.serviceFee}
                    onChange={handleChange}
                />
                {errors.serviceFee &&
                    <div className="error">This field can't be empty</div>
                }
            </div>
            <button className="btn" disabled={JSON.stringify(data) === JSON.stringify(formData)} onClick={handleUpdate}>Update</button>
        </div>
    )
};

export default GeneralSetting;