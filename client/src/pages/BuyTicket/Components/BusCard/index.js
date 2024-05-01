import React from "react";
import { MdArrowForwardIos } from "react-icons/md";
import { FaPeopleGroup } from "react-icons/fa6";
import { FaBusAlt } from 'react-icons/fa';

const BusCard = ({ bus, handleContinue }) => {

    const convertToAMPM = (time24) => {
        var [hours, minutes] = time24.split(':');
        hours = parseInt(hours);
        var period = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12 || 12;
        minutes = minutes.padStart(2, '0');
        return hours + ':' + minutes + ' ' + period;
    };

    function getDuration(departureTime, arrivalTime) {
        var [depHours, depMinutes] = departureTime.split(':').map(Number);
        var [arrHours, arrMinutes] = arrivalTime.split(':').map(Number);
        var depTotalMinutes = depHours * 60 + depMinutes;
        var arrTotalMinutes = arrHours * 60 + arrMinutes;
        var durationMinutes;
        if (arrTotalMinutes < depTotalMinutes) {
            durationMinutes = 1440 + arrTotalMinutes - depTotalMinutes;
        }
        else {
            durationMinutes = arrTotalMinutes - depTotalMinutes;
        }
        var durationHours = Math.floor(durationMinutes / 60);
        var durationMinutesRemainder = durationMinutes % 60;
        var formattedDuration = ('0' + durationHours).slice(-2) + ':' + ('0' + durationMinutesRemainder).slice(-2) + ' hrs';
        return formattedDuration;
    };

    const calculatePrice = (price, departureDate, departureTime) => {
        const departureDateTimeString = `${departureDate}T${departureTime}`;
        const departureDateTime = new Date(departureDateTimeString);
        const currentNYTime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
        const timeDifference = departureDateTime.getTime() - new Date(currentNYTime).getTime();
        const daysDifference = Math.ceil(timeDifference / (1000 * 3600 * 24));
        let adjustedPrice;
        if (daysDifference >= 21) {
            adjustedPrice = 0;
        } else if (daysDifference >= 2) {
            adjustedPrice = 5;
        } else {
            adjustedPrice = 10;
        }
        return price + adjustedPrice;
    };

    return (
        <div className="bus">
            <div className="bus-type">Airdi</div>
            <div className="timeline">
                <div className="timeline-item">
                    <div className="time">{convertToAMPM(bus.departureTime)}</div>
                    <div className="city">{bus.departurePoint}</div>
                </div>
                <div className="timeline-item">
                    <div className="travel-time">{getDuration(bus.departureTime, bus.arrivalTime)}</div>
                </div>
                <div className="timeline-item">
                    <div className="time">{convertToAMPM(bus.arrivalTime)}</div>
                    <div className="city">{bus.arrivalPoint}</div>
                </div>
                <div className="timeline-item">
                    <div className="price">${calculatePrice(bus.adultTicketCost, bus.departureDate, bus.departureTime)}</div>
                    <div style={{ fontSize: '14px' }}>per person</div>
                </div>
            </div>
            <div className="info">
                <div className="info-details">
                    <div className="item border-item">
                        <div className="nested-item">
                            <FaBusAlt size={20} />
                            <div>Bus</div>
                        </div>
                        <div className="seperator"></div>
                        <div>Direct</div>
                    </div>
                    {bus.seatsTaken >= 10 &&
                        <div className="item">
                            <FaPeopleGroup size={22} />
                            <div>Almost Full</div>
                        </div>
                    }
                </div>
                <button className="btn" onClick={() => handleContinue(bus)}>
                    <div>Continue </div>
                    <MdArrowForwardIos size={20} />
                </button>
            </div>
        </div>
    )
};

export default BusCard;