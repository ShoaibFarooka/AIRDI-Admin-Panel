import React, { useState, useEffect } from "react";
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import ArrowUp from '../../../../assets/arrow-up.svg'
import ArrowDown from '../../../../assets/arrow-down.svg';
import busService from "../../../../services/busService";

const Form = ({ getData }) => {
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        departureTime: '',
        startDate: '',
        endDate: '',
        duration: '',
        days: [],
        totalSeats: '',
        price: ''
    });
    const [viewCard1, setViewCard1] = useState(false);
    const [viewCard2, setViewCard2] = useState(false);
    const [viewCard3, setViewCard3] = useState(false);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        if (type === "checkbox") {
            const updatedDays = checked
                ? [...formData.days, value]
                : formData.days.filter((day) => day !== value);
            setFormData({ ...formData, [name]: updatedDays });
        } else {
            if (name === 'duration' || name === 'totalSeats' || name === 'price') {
                const numberRegex = /^[0-9]*$/;
                if (!numberRegex.test(value)) {
                    return;
                }
            }
            setFormData({ ...formData, [name]: value });
        }
    };

    const isFormDataEmpty = () => {
        for (const key in formData) {
            // console.log(key, formData[key]);
            if (key === 'days') {
                if (formData[key].length > 0) {
                    return false;
                }
            }
            else {
                if (formData[key] !== '') {
                    return false;
                }
            }
        }
        return true;
    };

    const handleResetFilters = () => {
        setFormData({
            from: '',
            to: '',
            departureTime: '',
            startDate: '',
            endDate: '',
            duration: '',
            days: [],
            totalSeats: '',
            price: ''
        });
    };

    const handleSearch = async () => {
        if (!formData.from || !formData.to || !formData.departureTime || !formData.startDate || !formData.endDate || !formData.duration || !(formData.days && formData.days.length !== 0) || !formData.totalSeats || !formData.price) {
            return message.error('Please fill all required fields');
        }
        const payload = {
            from: formData.from,
            to: formData.to,
            departureTime: formData.departureTime,
            startDate: formData.startDate,
            endDate: formData.endDate,
            duration: Number(formData.duration),
            days: formData.days,
            totalSeats: Number(formData.totalSeats),
            price: Number(formData.price)
        };
        console.log(payload);
        dispatch(ShowLoading());
        try {
            const response = await busService.createRoute(payload);
            message.success(response);
            // handleResetFilters();
            getData();
        } catch (error) {
            message.error(error.response.data);
        }
        dispatch(HideLoading());
    }

    return (
        <div className="form">
            <div className="title">Create Route</div>
            {!viewCard1 ?
                <div className="sub-title-container closed">
                    <div className="sub-title">Route Info</div>
                    <img src={ArrowDown} alt="arrow-up" className="icon" onClick={() => setViewCard1(!viewCard1)} />
                </div>
                :
                <div className="card">
                    <div className="sub-title-container opened">
                        <div className="sub-title">Route Info</div>
                        <img src={ArrowUp} alt="arrow-up" className="icon" onClick={() => setViewCard1(!viewCard1)} />
                    </div>
                    <div className="input-container">
                        <label className="label">From</label>
                        <input type="text" value={formData.from} name="from" onChange={handleChange} className="input" />
                    </div>
                    <div className="input-container">
                        <label className="label">To</label>
                        <input type="text" value={formData.to} name="to" onChange={handleChange} className="input" />
                    </div>
                    <div className="input-container">
                        <label className="label">Departure Time</label>
                        <input type="time" value={formData.departureTime} name="departureTime" onChange={handleChange} className="input" />
                    </div>
                    <div className="input-container">
                        <label className="label">Start Date</label>
                        <input type="date" value={formData.startDate} name="startDate" onChange={handleChange} className="input" />
                    </div>
                    <div className="input-container">
                        <label className="label">End Date</label>
                        <input type="date" value={formData.endDate} name="endDate" onChange={handleChange} className="input" />
                    </div>
                </div>
            }
            {!viewCard2 ?
                <div className="sub-title-container closed">
                    <div className="sub-title">Schedule</div>
                    <img src={ArrowDown} alt="arrow-up" className="icon" onClick={() => setViewCard2(!viewCard2)} />
                </div>
                :
                <div className="card">
                    <div className="sub-title-container opened">
                        <div className="sub-title">Schedule</div>
                        <img src={ArrowUp} alt="arrow-up" className="icon" onClick={() => setViewCard2(!viewCard2)} />
                    </div>
                    <div className="input-container">
                        <label className="label">Duration (minutes)</label>
                        <input type="text" value={formData.duration} name="duration" onChange={handleChange} className="input" />
                    </div>
                    <div className="input-container">
                        <label className="label">Days of Operation</label>
                        <label><input type="checkbox" name="days" value="Mon" checked={formData.days.includes("Mon")} onChange={handleChange} /> Monday</label>
                        <label><input type="checkbox" name="days" value="Tue" checked={formData.days.includes("Tue")} onChange={handleChange} /> Tuesday</label>
                        <label><input type="checkbox" name="days" value="Wed" checked={formData.days.includes("Wed")} onChange={handleChange} /> Wednesday</label>
                        <label><input type="checkbox" name="days" value="Thu" checked={formData.days.includes("Thu")} onChange={handleChange} /> Thursday</label>
                        <label><input type="checkbox" name="days" value="Fri" checked={formData.days.includes("Fri")} onChange={handleChange} /> Friday</label>
                        <label><input type="checkbox" name="days" value="Sat" checked={formData.days.includes("Sat")} onChange={handleChange} /> Saturday</label>
                        <label><input type="checkbox" name="days" value="Sun" checked={formData.days.includes("Sun")} onChange={handleChange} /> Sunday</label>
                    </div>
                </div>
            }
            {!viewCard3 ?
                <div className="sub-title-container closed">
                    <div className="sub-title">Seats & Pricing</div>
                    <img src={ArrowDown} alt="arrow-up" className="icon" onClick={() => setViewCard3(!viewCard3)} />
                </div>
                :
                <div className="card">
                    <div className="sub-title-container opened">
                        <div className="sub-title">Seats & Pricing</div>
                        <img src={ArrowUp} alt="arrow-up" className="icon" onClick={() => setViewCard3(!viewCard3)} />
                    </div>
                    <div className="input-container">
                        <label className="label">Total Seats</label>
                        <input type="text" value={formData.totalSeats} name="totalSeats" onChange={handleChange} className="input" />
                    </div>
                    <div className="input-container">
                        <label className="label">Price ($)</label>
                        <input type="text" value={formData.price} name="price" onChange={handleChange} className="input" />
                    </div>
                </div>
            }
            <div className="btns-container">
                <button
                    name="reset"
                    disabled={isFormDataEmpty()}
                    className={`btn btn-1 ${(viewCard1 || viewCard2 || viewCard3) ? 'open-btn' : 'close-btn'}`}
                    onClick={handleResetFilters}
                >
                    Reset
                </button>
                <button
                    name="filter"
                    disabled={isFormDataEmpty()}
                    className={`btn btn-2 ${(viewCard1 || viewCard2 || viewCard3) ? 'open-btn' : 'close-btn'}`}
                    onClick={handleSearch}
                >
                    Create
                </button>
            </div>
        </div>
    )
};

export default Form;