import React, { useState, useEffect } from "react";
import './index.css';
import { message } from 'antd';
import { useNavigate } from 'react-router-dom';
import { useDispatch } from "react-redux";
import { MdArrowBackIos } from "react-icons/md";
import { setBusData } from "../../../../redux/busSlice";
import BusCard from "../BusCard";

const SearchResult = ({ outwardBuses, returnBuses, view, setView, thresholdTime = 0 }) => {
    const [filteredOutwardBuses, setFilteredOutwardBuses] = useState([]);
    const [filteredReturnBuses, setFilteredReturnBuses] = useState([]);
    const [journeyBus, setJourneyBus] = useState(null);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        if (outwardBuses && outwardBuses.length > 0) {
            const currentDate = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
            const filteredBuses = outwardBuses.filter(bus => {
                const [hours, minutes] = bus.departureTime.split(':').map(Number);
                const departureDate = new Date(bus.departureDate);
                departureDate.setHours(hours, minutes, 0, 0);

                // Calculate the difference in milliseconds between the current time and the departure time
                const timeDifference = departureDate - new Date(currentDate);
                // Filter buses whose departure time has not passed and is after the threshold time
                return timeDifference > thresholdTime * 60 * 1000;
            });
            // console.log('Filtered Outward Buses: ', filteredBuses);
            if (filteredBuses.length === 0) {
                // setError('All buses are already gone for today.');
                message.error('All buses are already gone for today.');
            }
            setFilteredOutwardBuses(filteredBuses);
        }
        else {
            setFilteredOutwardBuses([]);
        }
    }, [outwardBuses, thresholdTime]);

    useEffect(() => {
        if (returnBuses && returnBuses.length > 0 && journeyBus) {
            const [arrivalHours, arrivalMinutes] = journeyBus.arrivalTime.split(':').map(Number);
            const arrivalDate = new Date(journeyBus.arrivalDate);
            arrivalDate.setHours(arrivalHours, arrivalMinutes, 0, 0);
            const filteredBuses = returnBuses.filter(bus => {
                const [hours, minutes] = bus.departureTime.split(':').map(Number);
                const departureDate = new Date(bus.departureDate);
                departureDate.setHours(hours, minutes, 0, 0);

                // Calculate the difference in milliseconds between the current time and the departure time
                const timeDifference = departureDate - arrivalDate;
                // Filter buses whose departure time has not passed and is after the threshold time
                return timeDifference > thresholdTime * 60 * 1000;
            });
            // console.log('Filtered Return Buses: ', filteredBuses);
            if (filteredBuses.length === 0) {
                // setError('All return buses will be already gone at the arrival time.');
                message.error('All return buses will be already gone at the arrival time.');
                setJourneyBus(null);
            }
            setFilteredReturnBuses(filteredBuses);
        }
    }, [returnBuses, journeyBus, thresholdTime]);

    const handleContinue = (bus) => {
        if (view === 1) {
            if (returnBuses.length > 0) {
                setJourneyBus(bus)
                setView(2);
            }
            else {
                const newBusData = {
                    journeyBus: bus,
                    returnBus: null
                };
                dispatch(setBusData(newBusData));
                navigate('/checkout');
            }
        }
        else {
            const newBusData = {
                journeyBus,
                returnBus: bus
            };
            dispatch(setBusData(newBusData));
            navigate('/checkout');
        }
    };

    return (
        <div className="search-result">
            <div className="buses-count">
                <div className="flex-gap-10">
                    {(view === 1) &&
                        <div className="text-1">{filteredOutwardBuses.length}</div>
                    }
                    {(view === 2) &&
                        <div className="text-1">{filteredReturnBuses.length}</div>
                    }
                    <div className="text-2">Buses Found</div>
                </div>
            </div>
            {(outwardBuses && outwardBuses.length > 0) &&
                <div className="content">
                    {returnBuses.length > 0 &&
                        <div>
                            {view === 2 &&
                                <div className='back-btn' onClick={() => setView(1)}>
                                    <MdArrowBackIos size={14} />
                                    <div>Back</div>
                                </div>

                            }
                            <div className="title">{view === 1 ? 'Outbound Trip' : 'Return Trip'}</div>
                        </div>
                    }
                    {view === 1 ?
                        <div className="buses">
                            {filteredOutwardBuses.map((bus, index) => (
                                <BusCard bus={bus} handleContinue={handleContinue} key={index} />
                            ))}
                        </div>
                        :
                        <div className="buses">
                            {filteredReturnBuses.map((bus, index) => (
                                <BusCard bus={bus} handleContinue={handleContinue} key={index} />
                            ))}
                        </div>
                    }
                </div>
            }
        </div >
    )
};

export default SearchResult;