import React, { useState, useEffect } from "react";
import './index.css';
import ArrowUp from '../../assets/arrow-up.svg';
import ArrowDown from '../../assets/arrow-down.svg';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import OrdersTable from "./components/OrdersTable";
import saleService from "../../services/saleService";
import busService from "../../services/busService";

const SalesReport = () => {
    const [formData, setFormData] = useState({
        journeyDate: '',
        journeyDateFrom: '',
        journeyDateTo: '',
        orderDate: '',
        orderDateFrom: '',
        orderDateTo: '',
        boardingTime: '',
        boardingPoint: '',
        droppingPoint: ''
    });
    const [saleData, setSaleData] = useState({
        totalSales: 0,
        totalPassengers: 0,
        totalOrders: 0,
        totalBuses: 0,
        allOrders: []
    });
    const [resetState, setResetState] = useState(false);
    const [viewJourneyCard, setViewJourneyCard] = useState(false);
    const [viewOrderCard, setViewOrderCard] = useState(false);
    const [viewBoardingCard, setViewBoardingCard] = useState(false);
    const [departures, setDepartures] = useState([]);
    const [arrivals, setArrivals] = useState([]);
    const dispatch = useDispatch();

    const fetchAllDeparturesAndArrivals = async () => {
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
    };

    const handleSearch = async () => {
        try {
            dispatch(ShowLoading());
            const response = await saleService.fetchSalesReport(formData);
            console.log('Sales Report: ', response);
            if (response.report) {
                setSaleData(response.report);
            }
            else {
                setSaleData({
                    totalSales: 0,
                    totalPassengers: 0,
                    totalOrders: 0,
                    totalBuses: 0,
                    allOrders: []
                });
            }
        } catch (error) {
            message.error(error.response.data);
        }
        dispatch(HideLoading());
    };

    const fetchData = async () => {
        dispatch(ShowLoading());
        await handleSearch();
        await fetchAllDeparturesAndArrivals();
        dispatch(HideLoading());
    }

    useEffect(() => {
        fetchData();
    }, []);

    useEffect(() => {
        if (resetState) {
            handleSearch();
            setResetState(false);
        }
    }, [resetState]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === 'journeyDateTo') {
            if (!formData.journeyDateFrom) {
                return message.error('Please select start date first');
            }
            else if (new Date(value) <= new Date(formData.journeyDateFrom)) {
                return message.error('Please select date after start date');
            }
        }
        else if (name === 'orderDateTo') {
            if (!formData.orderDateFrom) {
                return message.error('Please select start date first');
            }
            else if (new Date(value) <= new Date(formData.orderDateFrom)) {
                return message.error('Please select date after start date');
            }
        }
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleResetFilters = () => {
        setResetState(true);
        setFormData({
            journeyDate: '',
            journeyDateFrom: '',
            journeyDateTo: '',
            orderDate: '',
            orderDateFrom: '',
            orderDateTo: '',
            boardingTime: '',
            boardingPoint: '',
            droppingPoint: ''
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

    return (
        <div className="sales-report">
            <div className="filters">
                <div className="title">Search Filters</div>
                {/* <select className="input select">
                    <option>Select Bus</option>
                </select> */}
                {!viewJourneyCard ?
                    <div className="sub-title-container closed">
                        <div className="sub-title">Journey</div>
                        <img src={ArrowDown} alt="arrow-up" className="icon" onClick={() => setViewJourneyCard(!viewJourneyCard)} />
                    </div>
                    :
                    <div className="card">
                        <div className="sub-title-container opened">
                            <div className="sub-title">Journey</div>
                            <img src={ArrowUp} alt="arrow-up" className="icon" onClick={() => setViewJourneyCard(!viewJourneyCard)} />
                        </div>
                        <div className="input-container">
                            <label className="label">Journey Date</label>
                            <input type="date" value={formData.journeyDate} name="journeyDate" onChange={handleChange} className="input" />
                        </div>
                        <div className="input-container">
                            <label className="label">Journey Date From</label>
                            <input type="date" value={formData.journeyDateFrom} name="journeyDateFrom" onChange={handleChange} className="input" />
                        </div>
                        <div className="input-container">
                            <label className="label">Journey Date To</label>
                            <input type="date" value={formData.journeyDateTo} name="journeyDateTo" onChange={handleChange} className="input" />
                        </div>
                    </div>
                }
                {!viewOrderCard ?
                    <div className="sub-title-container closed">
                        <div className="sub-title">Order</div>
                        <img src={ArrowDown} alt="arrow-up" className="icon" onClick={() => setViewOrderCard(!viewOrderCard)} />
                    </div>
                    :
                    <div className="card">
                        <div className="sub-title-container opened">
                            <div className="sub-title">Order</div>
                            <img src={ArrowUp} alt="arrow-up" className="icon" onClick={() => setViewOrderCard(!viewOrderCard)} />
                        </div>
                        <div className="input-container">
                            <label className="label">Order Date</label>
                            <input type="date" value={formData.orderDate} name="orderDate" onChange={handleChange} className="input" />
                        </div>
                        <div className="input-container">
                            <label className="label">Order Date From</label>
                            <input type="date" value={formData.orderDateFrom} name="orderDateFrom" onChange={handleChange} className="input" />
                        </div>
                        <div className="input-container">
                            <label className="label">Order Date To</label>
                            <input type="date" value={formData.orderDateTo} name="orderDateTo" onChange={handleChange} className="input" />
                        </div>
                    </div>
                }
                {!viewBoardingCard ?
                    <div className="sub-title-container closed">
                        <div className="sub-title">Boarding</div>
                        <img src={ArrowDown} alt="arrow-up" className="icon" onClick={() => setViewBoardingCard(!viewBoardingCard)} />
                    </div>
                    :
                    <div className="card">
                        <div className="sub-title-container opened">
                            <div className="sub-title">Boarding</div>
                            <img src={ArrowUp} alt="arrow-up" className="icon" onClick={() => setViewBoardingCard(!viewBoardingCard)} />
                        </div>
                        <div className="input-container">
                            <label className="label">Boarding Time</label>
                            <input type="time" value={formData.boardingTime} name="boardingTime" onChange={handleChange} className="input" />
                        </div>
                        <div className="input-container">
                            <label className="label">Boarding Point</label>
                            <input type="text" value={formData.boardingPoint} name="boardingPoint" list="departure-list" onChange={handleChange} className="input" />
                            <datalist id="departure-list">
                                {departures.map((point, index) => (
                                    <option key={index} value={point} />
                                ))}
                            </datalist>
                        </div>
                        <div className="input-container">
                            <label className="label">Droping Point</label>
                            <input type="text" value={formData.droppingPoint} name="droppingPoint" list="arrival-list" onChange={handleChange} className="input" />
                            <datalist id="arrival-list">
                                {arrivals.map((point, index) => (
                                    <option key={index} value={point} />
                                ))}
                            </datalist>
                        </div>
                    </div>
                }
                <div className="btns-container">
                    <button
                        name="reset"
                        disabled={isFormDataEmpty()}
                        className={`btn btn-1 ${(viewJourneyCard || viewBoardingCard || viewOrderCard) ? 'filters-open-btn' : 'filters-close-btn'}`}
                        onClick={handleResetFilters}
                    >
                        Reset
                    </button>
                    <button
                        name="filter"
                        disabled={isFormDataEmpty()}
                        className={`btn btn-2 ${(viewJourneyCard || viewBoardingCard || viewOrderCard) ? 'filters-open-btn' : 'filters-close-btn'}`}
                        onClick={handleSearch}
                    >
                        Filter
                    </button>
                </div>
            </div>
            <div className="sales">
                <div className="sales-header">
                    <div className="row">
                        <div className="key">Total Sales:</div>
                        <div className="value">${saleData.totalSales}</div>
                    </div>
                    <div className="row">
                        <div className="key">Total Passengers:</div>
                        <div className="value">{saleData.totalPassengers}</div>
                    </div>
                    <div className="row">
                        <div className="key">Total Orders:</div>
                        <div className="value">{saleData.totalOrders}</div>
                    </div>
                    <div className="row">
                        <div className="key">Total Bus:</div>
                        <div className="value">{saleData.totalBuses}</div>
                    </div>
                </div>
                <OrdersTable allOrders={saleData.allOrders} />
            </div>
        </div>
    )
};

export default SalesReport;