import React, { useState, useEffect } from "react";
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import busService from "../../../../services/busService";

const Filters = ({ setOutwardBuses, setReturnBuses, setView }) => {
    const [formData, setFormData] = useState({
        from: '',
        to: '',
        journeyDate: '',
        returnDate: '',
    });
    const [departures, setDepartures] = useState([]);
    const [arrivals, setArrivals] = useState([]);
    const dispatch = useDispatch();

    const fetchAllDeparturesAndArrivals = async () => {
        dispatch(ShowLoading());
        try {
            const response = await busService.getAllDepartures();
            if (response.departurePoints) {
                setDepartures(response.departurePoints);
            }
        } catch (error) {
            message.error(error.response.data);
        }
        try {
            const response = await busService.getAllArrivals();
            if (response.arrivalPoints) {
                setArrivals(response.arrivalPoints);
            }
        } catch (error) {
            message.error(error.response.data);
        }
        dispatch(HideLoading());
    };

    useEffect(() => {
        fetchAllDeparturesAndArrivals();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'journeyDate') {
            const NYDate = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
            const currentDate = new Date(NYDate).setHours(0, 0, 0, 0);
            const selectedDate = new Date(value).setHours(0, 0, 0, 0);
            let returnDate;
            if (formData.returnDate) {
                returnDate = new Date(formData.returnDate).setHours(0, 0, 0, 0);
            }
            if (selectedDate >= currentDate) {
                if (returnDate && returnDate < selectedDate) {
                    return message.error('Please select a date before return date.');
                }
                setFormData({ ...formData, [name]: value });
            }
            else {
                return message.error('Please select a date from today or in the future.');
            }
        }
        else if (name === 'returnDate') {
            if (!formData.journeyDate) {
                return message.error('Please select journey date first.')
            }
            else {
                const jdate = new Date(formData.journeyDate);
                const rdate = new Date(value);
                if (rdate < jdate) {
                    return message.error('Please select a date from journey date or in the future.');
                }
                else {
                    setFormData({ ...formData, [name]: value });
                }
            }

        } else {
            // If other fields are changed, update the state normally
            setFormData((prevData) => ({
                ...prevData,
                [name]: value
            }));
        }
    };

    const isFormDataEmpty = () => {
        for (const key in formData) {
            if (formData[key] !== '') {
                return false;
            }
        }
        return true;
    };

    const handleResetFilters = () => {
        setFormData({
            from: '',
            to: '',
            journeyDate: '',
            returnDate: '',
        });
        setOutwardBuses([]);
        setReturnBuses([]);
    };

    const isDatePassed = (value) => {
        const NYDate = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
        const currentDate = new Date(NYDate).setHours(0, 0, 0, 0);
        const selectedDate = new Date(value).setHours(0, 0, 0, 0);
        if (selectedDate < currentDate) {
            return true;
        }
        else {
            return false;
        }
    }

    const handleSearch = async () => {
        if (!formData.from || !formData.to || !formData.journeyDate) {
            return message.error('Please fill all required fields');
        }
        else if (isDatePassed(formData.journeyDate)) {
            return message.error('Please update the jouney date');
        }
        dispatch(ShowLoading());
        try {
            const response = await busService.getAllBuses(formData);
            console.log(response);
            setView(1);
            if (response.outwardBuses) {
                setOutwardBuses(response.outwardBuses);
            }
            if (response.returnBuses) {
                setReturnBuses(response.returnBuses);
            }
        } catch (error) {
            setOutwardBuses([]);
            setReturnBuses([]);
            message.error(error.response.data);
        }
        dispatch(HideLoading());
    }

    return (
        <div className="filters">
            <div className="title">Search Filters</div>
            <div className="input-container">
                <label className="label">From</label>
                <input type="text" value={formData.from} name="from" list="departure-list" placeholder="Please Select" onChange={handleChange} className="input" />
                <datalist id="departure-list">
                    {departures.map((point, index) => (
                        <option key={index} value={point} />
                    ))}
                </datalist>
            </div>
            <div className="input-container">
                <label className="label">To</label>
                <input type="text" value={formData.to} name="to" list="arrival-list" placeholder="Please Select" onChange={handleChange} className="input" />
                <datalist id="arrival-list">
                    {arrivals.map((point, index) => (
                        <option key={index} value={point} />
                    ))}
                </datalist>
            </div>
            <div className="input-container">
                <label className="label">Journey Date</label>
                <input type="date" value={formData.journeyDate} name="journeyDate" onChange={handleChange} className="input" />
            </div>
            <div className="input-container">
                <label className="label">Return Date</label>
                <input type="date" value={formData.returnDate} name="returnDate" onChange={handleChange} className="input" />
            </div>

            <div className="btns-container">
                <button
                    name="reset"
                    disabled={isFormDataEmpty()}
                    className={`btn btn-1`}
                    onClick={handleResetFilters}
                >
                    Reset
                </button>
                <button
                    name="filter"
                    disabled={isFormDataEmpty()}
                    className={`btn btn-2`}
                    onClick={handleSearch}
                >
                    Search
                </button>
            </div>
        </div>
    )
};

export default Filters;