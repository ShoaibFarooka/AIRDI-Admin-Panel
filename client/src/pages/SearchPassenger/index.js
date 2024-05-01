import React, { useState, useEffect } from "react";
import './index.css';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import FileSaver from 'file-saver';
import Card from "./components/Card";
import busService from "../../services/busService";

const SearchPassenger = () => {
    const [resetState, setResetState] = useState(false);
    const [formData, setFormData] = useState({
        orderNo: '',
        contact: '',
        name: '',
        email: '',
        journeyDate: '',
        orderDate: '',
    });
    const [passengersList, setPassengersList] = useState([]);
    const dispatch = useDispatch();

    const handleSearch = async () => {
        try {
            dispatch(ShowLoading());
            const response = await busService.filterPassengers(formData);
            if (response.passengers) {
                // console.log('List: ', response.passengers);
                setPassengersList(response.passengers);
            }
            else {
                setPassengersList([]);
            }
        } catch (error) {
            message.error(error.response.data);
        }
        dispatch(HideLoading());
    };

    useEffect(() => {
        handleSearch();
    }, []);


    useEffect(() => {
        if (resetState) {
            handleSearch();
            setResetState(false);
        }
    }, [resetState]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
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
        setResetState(true);
        setFormData({
            orderNo: '',
            contact: '',
            name: '',
            email: '',
            journeyDate: '',
            orderDate: '',
        });
    };

    const countTotalPassengers = () => {
        const sum = passengersList.reduce((total, booking) => {
            const { adultTickets, childTickets } = booking;
            return total + adultTickets + childTickets;
        }, 0);
        return sum;
    };

    const handleDownload = async (booking) => {
        dispatch(ShowLoading());
        try {
            const response = await busService.downloadBooking(booking._id);
            FileSaver.saveAs(
                new Blob([response.data], { type: 'application/pdf' }),
                `ticket-${booking.code}.pdf`
            );
        } catch (error) {
            if (error.response && error.response.data) {
                message.error(error.response.data);
            }
        }
        dispatch(HideLoading());
    };

    const handleView = (booking) => {

    };

    return (
        <div className="search-passenger">
            <div className="filters">
                <div className="title">Search Filters</div>
                <select className="input select">
                    <option>Select Bus</option>
                </select>
                <input type="text" placeholder="Order No" value={formData.orderNo} name="orderNo" onChange={handleChange} className="input" />
                <input type="text" placeholder="Passenger Phone No" value={formData.contact} name="contact" onChange={handleChange} className="input" />
                <input type="text" placeholder="Passenger Name" value={formData.name} name="name" onChange={handleChange} className="input" />
                <input type="text" placeholder="Passenger Email" value={formData.email} name="email" onChange={handleChange} className="input" />

                <div className="input-container">
                    <label className="label">Journey Date</label>
                    <input type="date" value={formData.journeyDate} name="journeyDate" onChange={handleChange} className="input" />
                </div>
                <div className="input-container">
                    <label className="label">Order Date</label>
                    <input type="date" value={formData.orderDate} name="orderDate" onChange={handleChange} className="input" />
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
                        Filter
                    </button>
                </div>
            </div>
            <div className="section-2">
                <div className="passengers-count">
                    <div className="flex-gap-10">
                        <div className="text-1">{passengersList.length}</div>
                        <div className="text-2">Bookings</div>
                    </div>
                    <div className="flex-gap-10">
                        <div className="text-1">{countTotalPassengers()}</div>
                        <div className="text-2">Passengers</div>
                    </div>
                </div>
                <div className="cards-container">
                    {passengersList.map((booking, index) => (
                        <Card booking={booking} key={index} handleDownload={handleDownload} handleView={handleView} />
                    ))}
                </div>
            </div>
        </div>
    )
};

export default SearchPassenger;