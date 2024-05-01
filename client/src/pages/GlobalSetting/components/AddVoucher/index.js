import React, { useState } from "react";
import './index.css';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import busService from "../../../../services/busService";

const GeneralSetting = ({ getData, setAddVoucher }) => {
    const [formData, setFormData] = useState({
        code: '',
        value: '',
        type: '',
        isOneTimeUse: true
    });
    const [errors, setErrors] = useState({
        code: false,
        value: false,
        type: false
    });
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'value') {
            const numberRegex = /^[0-9]*$/;
            if (!formData.type) {
                return message.error('Please choose type first')
            }
            else if (!numberRegex.test(value)) {
                return;
            }
        }
        if (name === 'code') {
            setFormData({
                ...formData,
                [name]: value.toUpperCase()
            });
        }
        else if (name === 'usageLimit') {
            setFormData({
                ...formData,
                isOneTimeUse: value === 'oneTimeUse'
            })
        }
        else {
            setFormData({
                ...formData,
                [name]: value
            });
        }
    };

    const validateInputs = () => {
        const { code, value, type } = formData;
        const errorsCopy = { ...errors };
        let hasErrors = false;
        if (!code) {
            errorsCopy.code = true;
            hasErrors = true;
        } else {
            errorsCopy.code = false;
        }
        if (!value || (type == 'percentage' && value > 100)) {
            errorsCopy.value = true;
            hasErrors = true;
        } else {
            errorsCopy.value = false;
        }
        if (!type) {
            errorsCopy.type = true;
            hasErrors = true;
        } else {
            errorsCopy.type = false;
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

        try {
            const response = await busService.addVoucher(formData);
            message.success(response);
            setAddVoucher(false);
            getData();
        } catch (error) {
            message.error(error.response.data);
        }
        dispatch(HideLoading());
    }

    return (
        <div className="add-voucher">
            <div className="input-container">
                <label htmlFor="code" className="label">Code:</label>
                <input
                    type="text"
                    className="input"
                    id="code"
                    name="code"
                    value={formData.code}
                    onChange={handleChange}
                />
                {errors.code &&
                    <div className="error">This field can't be empty</div>
                }
            </div>
            <div className="input-container">
                <label htmlFor="type" className="label">Type:</label>
                <select
                    className="input"
                    id="type"
                    name="type"
                    value={formData.type}
                    onChange={handleChange}
                >
                    <option value='' disabled >Please Choose</option>
                    <option value='fix'>Fix</option>
                    <option value='percentage'>Percentage</option>
                </select>
                {errors.type &&
                    <div className="error">This field can't be empty</div>
                }
            </div>
            <div className="input-container">
                <label htmlFor="value" className="label">Value{formData.type === 'fix' ? ' ($)' : formData.type === 'percentage' ? ' (%)' : ''}:</label>
                <input
                    type="text"
                    className="input"
                    id="value"
                    name="value"
                    value={formData.value}
                    onChange={handleChange}
                />
                {errors.value &&
                    <div className="error">Invalid value</div>
                }
            </div>
            <div className="input-container">
                <label htmlFor="" className="label">Usage Limit:</label>
                <div>
                    <input
                        type="radio"
                        id="oneTimeUse"
                        name="usageLimit"
                        value="oneTimeUse"
                        checked={formData.isOneTimeUse}
                        onChange={handleChange}
                    />
                    <label htmlFor="oneTimeUse">One-Time Use</label>
                </div>
                <div>
                    <input
                        type="radio"
                        id="multipleUses"
                        name="usageLimit"
                        value="multipleUses"
                        checked={!formData.isOneTimeUse}
                        onChange={handleChange}
                    />
                    <label htmlFor="multipleUses">Multiple Uses</label>
                </div>
            </div>
            <div className="btns-container-2">
                <button className="btn" onClick={() => setAddVoucher(false)}>Cancel</button>
                <button className="btn" onClick={handleAdd}>Add</button>
            </div>
        </div>
    )
};

export default GeneralSetting;