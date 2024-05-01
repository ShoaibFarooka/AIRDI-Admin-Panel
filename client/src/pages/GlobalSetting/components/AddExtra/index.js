import React, { useState } from "react";
import './index.css';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import busService from "../../../../services/busService";

const AddExtra = ({ getData, setAddExtra }) => {
    const [formData, setFormData] = useState({
        name: '',
        price: '',
    });
    const [errors, setErrors] = useState({
        name: false,
        price: false,
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'price') {
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
        const { name, price } = formData;
        const errorsCopy = { ...errors };
        let hasErrors = false;
        if (!name) {
            errorsCopy.name = true;
            hasErrors = true;
        } else {
            errorsCopy.name = false;
        }
        if (!price) {
            errorsCopy.price = true;
            hasErrors = true;
        } else {
            errorsCopy.price = false;
        }
        setErrors(errorsCopy);
        if (hasErrors) {
            return false;
        }
        else {
            return true;
        }
    };

    const handleAdd = async () => {
        if (!validateInputs()) {
            return;
        }
        dispatch(ShowLoading());
        const payload = {
            name: formData.name,
            price: Number(formData.price)
        }
        try {
            const response = await busService.addExtra(payload);
            message.success(response);
            setAddExtra(false);
            getData();
        } catch (error) {
            message.error(error.response.data);
        }
        dispatch(HideLoading());
    }

    return (
        <div className="add-extra">
            <div className="input-container">
                <label htmlFor="name" className="label">Name:</label>
                <input
                    type="text"
                    className="input"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                />
                {errors.name &&
                    <div className="error">This field can't be empty</div>
                }
            </div>
            <div className="input-container">
                <label htmlFor="price" className="label">Price ($):</label>
                <input
                    type="text"
                    className="input"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                />
                {errors.price &&
                    <div className="error">This field can't be empty</div>
                }
            </div>
            <div className="btns-container-2">
                <button className="btn" onClick={() => setAddExtra(false)}>Cancel</button>
                <button className="btn" onClick={handleAdd}>Add</button>
            </div>
        </div>
    )
};

export default AddExtra;