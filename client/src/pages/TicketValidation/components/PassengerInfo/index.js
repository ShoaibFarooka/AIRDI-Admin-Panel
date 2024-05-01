import React from "react";
import './index.css';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import busService from '../../../../services/busService';


const PassengerInfo = ({ passenger, setSelectedPassenger, setUpdateData }) => {
    console.log('In Info: ', passenger);
    const dispatch = useDispatch();

    const handleCheckIn = async () => {
        dispatch(ShowLoading());
        try {
            const response = await busService.checkInPassenger(passenger._id, { fromJourneyBus: passenger.fromJourneyBus });
            message.success(response);
            setUpdateData(true);
            setSelectedPassenger(null);
        } catch (error) {
            message.error(error.response.data);
        }
        dispatch(HideLoading());
    };

    const shouldDisable = () => {
        if (passenger.fromJourneyBus && passenger.journeyBusCheckedIn) {
            return true;
        }
        else if (!passenger.fromJourneyBus && passenger.returnBusCheckedIn) {
            return true;
        }
        else {
            return false;
        }
    };

    return (
        <>
            <div className="passenger-info">
                {passenger.adults.map((person, index) => (
                    <div className="item" key={index}>
                        <div className="label">Passenger {index + 1}</div>
                        <div className="text">{person.firstname + ' ' + person.lastname}</div>
                    </div>
                ))}
                <div className="item">
                    <div className="label">From</div>
                    <div className="text">{passenger.fromJourneyBus ? passenger.journeyBus.departurePoint : passenger.returnBus.departurePoint}</div>
                </div>
                <div className="item">
                    <div className="label">To</div>
                    <div className="text">{passenger.fromJourneyBus ? passenger.journeyBus.arrivalPoint : passenger.returnBus.arrivalPoint}</div>
                </div>
                <div className="item">
                    <div className="label">Date</div>
                    <div className="text">{passenger.fromJourneyBus ? passenger.journeyBus.departureDate : passenger.returnBus.departureDate}</div>
                </div>
                <div className="item">
                    <div className="label">Time</div>
                    <div className="text">{passenger.fromJourneyBus ? passenger.journeyBus.departureTime : passenger.returnBus.departureTime}</div>
                </div>
                <div className="btns-container">
                    <button className="btn" onClick={() => setSelectedPassenger(null)}>Back</button>
                    <button
                        className="btn"
                        onClick={handleCheckIn}
                        disabled={shouldDisable()}
                    >
                        {passenger.fromJourneyBus ? passenger.journeyBusCheckedIn ? 'Already Used' : 'Check In' : passenger.returnBusCheckedIn ? 'Already Used' : 'Check In'}
                    </button>
                </div>
            </div>
        </>
    )
};

export default PassengerInfo;