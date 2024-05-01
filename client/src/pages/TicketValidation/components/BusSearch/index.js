import React, { useState, useEffect } from "react";
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import busService from '../../../../services/busService';
import PassengerList from "../PassengerList";

const BusSearch = () => {
    const [busData, setBusData] = useState({
        departurePoint: '',
        arrivalPoint: '',
        departureTime: ''
    });
    const [errors, setErrors] = useState({
        departurePoint: false,
        arrivalPoint: false,
        departureTime: false
    });
    const [busesInfo, setBusesInfo] = useState([]);
    const [departurePoints, setDeparturePoints] = useState([]);
    const [arrivalPoints, setArrivalPoints] = useState([]);
    const [departureTimes, setDepartureTimes] = useState([]);
    const [passengerArray, setPassengerArray] = useState([]);
    const [updateData, setUpdateData] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const getBusesData = async () => {
            dispatch(ShowLoading());
            try {
                const response = await busService.fetchBusesInfo();
                if (response.info && response.info?.length > 0) {
                    console.log(response.info);
                    setBusesInfo(response.info);
                }
                else {
                    message.error('Buses not found!');
                }
            } catch (error) {
                message.error(error.response.data);
            }
            dispatch(HideLoading());
        };
        getBusesData();
    }, []);

    useEffect(() => {
        if (busesInfo && busesInfo.length > 0) {
            const distinctDeparturePoints = [...new Set(busesInfo.map(entry => entry.departurePoint))];
            setDeparturePoints(distinctDeparturePoints);
        }
    }, [busesInfo]);

    useEffect(() => {
        if (busData.departurePoint && busData.arrivalPoint) {
            const times = busesInfo.find((info) => info.departurePoint === busData.departurePoint && info.arrivalPoint === busData.arrivalPoint)?.departureTimes;
            const sortedTimes = times?.sort((time1, time2) => {
                const [hour1, minute1] = time1.split(':').map(Number);
                const [hour2, minute2] = time2.split(':').map(Number);
                if (hour1 !== hour2) {
                    return hour1 - hour2;
                } else {
                    return minute1 - minute2;
                }
            });
            setDepartureTimes(sortedTimes);
        }
    }, [busData.arrivalPoint, busData.departurePoint]);

    useEffect(() => {
        if (busData.departurePoint) {
            const points = busesInfo.filter((info) => info.departurePoint === busData.departurePoint);
            setArrivalPoints(points);
        }
    }, [busData.departurePoint]);

    useEffect(() => {
        if (updateData) {
            handleSearch();
            setUpdateData(false);
        }
    }, [updateData]);

    const handleBusDataChange = ({ target }) => {
        const { name, value } = target;
        setBusData({
            ...busData,
            [name]: value
        });
    };

    const validateInputs = () => {
        const { departurePoint, arrivalPoint, departureTime } = busData;
        const errorsCopy = { ...errors };
        let hasErrors = false;
        if (!departurePoint) {
            errorsCopy.departurePoint = true;
            hasErrors = true;
        } else {
            errorsCopy.departurePoint = false;
        }
        if (!arrivalPoint) {
            errorsCopy.arrivalPoint = true;
            hasErrors = true;
        } else {
            errorsCopy.arrivalPoint = false;
        }
        if (!departureTime) {
            errorsCopy.departureTime = true;
            hasErrors = true;
        } else {
            errorsCopy.departureTime = false;
        }
        setErrors(errorsCopy);
        if (hasErrors) {
            return false;
        }
        else {
            return true;
        }
    };

    const handleSearch = async () => {
        if (!validateInputs()) {
            return;
        }
        dispatch(ShowLoading());
        try {
            const response = await busService.fetchBusPassengerList(busData);
            if (response.passengerList && response.passengerList.length > 0) {
                setPassengerArray(response.passengerList);
            }
            else {
                message.error('Passengers not found');
            }
        } catch (error) {
            message.error(error.response.data);
        }
        dispatch(HideLoading());
    }

    return (
        <>{passengerArray && passengerArray.length > 0 ?
            <PassengerList list={passengerArray} setList={setPassengerArray} setUpdateData={setUpdateData} />
            :
            <div className="form">
                <div>
                    <select
                        className={`input select ${!busData.departurePoint ? 'color-grey' : ''}`}
                        name="departurePoint"
                        value={busData.departurePoint}
                        onChange={handleBusDataChange}
                    >
                        <option disabled={true} value=''>Select Boarding Point</option>
                        {departurePoints.map((info, index) => (
                            <option key={index} value={info} >{info}</option>
                        ))}
                    </select>
                    {errors.departurePoint &&
                        <div className="error">Please select the boarding point</div>
                    }
                </div>
                <div>
                    <select
                        className={`input select ${!busData.arrivalPoint ? 'color-grey' : ''}`}
                        name="arrivalPoint"
                        value={busData.arrivalPoint}
                        onChange={handleBusDataChange}
                    >
                        <option disabled={true} value=''>Select Arrival Point</option>
                        {arrivalPoints.map((info, index) => (
                            <option key={index} value={info.arrivalPoint} >{info.arrivalPoint}</option>
                        ))}
                    </select>
                    {errors.arrivalPoint &&
                        <div className="error">Please select the arrival point</div>
                    }
                </div>
                <div>
                    <select
                        className={`input select ${!busData.departureTime ? 'color-grey' : ''}`}
                        name="departureTime"
                        value={busData.departureTime}
                        onChange={handleBusDataChange}
                    >
                        <option disabled={true} value=''>Select Boarding Time</option>
                        {departureTimes?.map((time, index) => (
                            <option key={index} value={time}>{time}</option>
                        ))}
                    </select>
                    {errors.departureTime &&
                        <div className="error">Please select the boarding time</div>
                    }
                </div>
                <button className="btn btn-2" onClick={handleSearch}>Check Passenger List</button>
            </div>
        }
        </>
    )
};

export default BusSearch;