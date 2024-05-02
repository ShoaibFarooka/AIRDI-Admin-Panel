import React, { useEffect, useState } from "react";
import { message } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import { selectCountryCodes } from "../../../../redux/countryCodeSlice";
import busService from '../../../../services/busService';
import PassengerInfo from "../PassengerInfo";

const PassengerSearch = () => {
    const [passengerData, setPassengerData] = useState({
        bookingId: '',
        email: '',
        countryCode: '+1',
        contact: ''
    });
    const [tripType, setTripType] = useState('');
    const [errors, setErrors] = useState({
        bookingId: false,
        email: false,
        contact: false,
        tripType: false
    });
    const [passenger, setPassenger] = useState(null);
    const [updateData, setUpdateData] = useState(null);
    const countryCodes = useSelector(selectCountryCodes);
    const dispatch = useDispatch();

    useEffect(() => {
        if (updateData) {
            handleSearch();
            setUpdateData(false);
        }
    }, [updateData]);

    const handlePassengerDataChange = ({ target }) => {
        const { name, value } = target;
        const numberRegex = /^[0-9]*$/;
        if (name === 'bookingId' && value !== '' && !numberRegex.test(value)) {
            return;
        }
        else if (name === 'contact' && !numberRegex.test(value)) {
            return;
        }

        setPassengerData({
            ...passengerData,
            [name]: value
        });
    };

    const validateInputs = () => {
        const { bookingId, email, countryCode, contact } = passengerData;
        const errorsCopy = { ...errors };
        let hasErrors = false;
        if (!bookingId) {
            errorsCopy.bookingId = true;
            hasErrors = true;
        } else {
            errorsCopy.bookingId = false;
        }
        if (!email) {
            errorsCopy.email = true;
        } else {
            errorsCopy.email = false;
        }
        if (!countryCode || !contact) {
            errorsCopy.contact = true;
        } else {
            errorsCopy.contact = false;
        }
        if (errorsCopy.email && errorsCopy.contact) {
            hasErrors = true;
        }
        if (!tripType) {
            errorsCopy.tripType = true;
            hasErrors = true;
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
        const payload = {
            ...passengerData,
            contact: passengerData.countryCode + '-' + passengerData.contact
        }
        try {
            const response = await busService.fetchPassenger(payload);
            if (response.passenger) {
                const fetchedPassenger = response.passenger;
                if (tripType === 'outgoing') {
                    fetchedPassenger.fromJourneyBus = true;
                    setPassenger(fetchedPassenger);
                }
                else {
                    if (!fetchedPassenger.returnBus) {
                        message.error('Return trip not found');
                    }
                    else {
                        fetchedPassenger.fromJourneyBus = false;
                        setPassenger(fetchedPassenger);
                    }
                }
            }
        } catch (error) {
            message.error(error.response.data);
        }
        dispatch(HideLoading());
    }

    return (
        <>
            {passenger ?
                <PassengerInfo passenger={passenger} setSelectedPassenger={setPassenger} setUpdateData={setUpdateData} />
                :
                <div className="form">
                    <div className="input-container">
                        <input
                            type="text"
                            className="input input-full"
                            placeholder="Reservation Code"
                            maxLength={6}
                            name="bookingId"
                            value={passengerData.bookingId}
                            onChange={handlePassengerDataChange}
                        />
                        {errors.bookingId &&
                            <div className="error">Please enter the booking ID</div>
                        }
                    </div>
                    <div className="input-container">
                        <input
                            type="text"
                            className="input input-full"
                            placeholder="Email"
                            name="email"
                            value={passengerData.email}
                            onChange={handlePassengerDataChange}
                        />
                        {errors.email && errors.contact &&
                            <div className="error">Please enter the valid email or contact</div>
                        }
                    </div>
                    {/* <div className="input-container">
                    </div> */}
                    <div className="input-container">
                        <div className="input-flex">
                            <select className='code-select' name='countryCode' value={passengerData.countryCode} onChange={handlePassengerDataChange}>
                                {countryCodes.map((code, index) => (
                                    <option key={index} value={code.value}>
                                        {code.label}
                                    </option>
                                ))}
                            </select>
                            <input
                                type="text"
                                className="input"
                                placeholder="Phone Number"
                                name="contact"
                                value={passengerData.contact}
                                onChange={handlePassengerDataChange}
                            />
                        </div>
                        {errors.email && errors.contact &&
                            <div className="error">Please enter the valid email or contact</div>
                        }
                    </div>
                    <div className="input-container">
                        <select
                            className={`select`}
                            name="tripType"
                            value={tripType}
                            onChange={(e) => setTripType(e.target.value)}
                        >
                            <option disabled={true} value=''>Select Trip Type</option>
                            <option value='outgoing'>Outgoing Trip</option>
                            <option value='return'>Return Trip</option>
                        </select>
                        {errors.tripType &&
                            <div className="error">Please select the trip type</div>
                        }
                    </div>
                    <button className="btn" onClick={handleSearch}>Check Passenger</button>
                </div>
            }
        </>
    )
};

export default PassengerSearch;