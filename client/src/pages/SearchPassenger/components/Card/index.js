import React from "react";
import profileIcon from '../../../../assets/profile-icon.svg';
import pdfIcon from '../../../../assets/pdf-icon.svg';
import eyeIcon from '../../../../assets/eye-icon.svg';

const Card = ({ booking, handleDownload, handleView }) => {
    // console.log(new Date(booking.journeyBus.departureDate + 'T00:00:00Z'));
    const dateString = booking.journeyBus.departureDate;
    const [year, month, day] = dateString.split('-');
    const utcDate = new Date(Date.UTC(year, month - 1, day, 0, 0, 0));
    console.log('UTC Date: ', utcDate.toISOString().split('T')[0]);
    console.log('Date is used so far: ',new Date(booking.journeyBus.departureDate + 'T00:00:00Z'));
    return (
        <div className="card">
            <div className="tags">
                <div className="tag bg-green-400">Paid</div>
                <div className={`tag ${booking.journeyBusCheckedIn === true ? 'bg-green-400' : 'bg-orange-300'}`}>{booking.journeyBusCheckedIn === true ? 'Checked In' : 'Not Checked'}</div>
            </div>
            <div className="names-container">
                {/* {
                booking.adults.map((passenger, index) => (
                    <div className="name" key={index}>{passenger.firstname + ' ' + passenger.lastname}</div>
                ))
            } */}
                <div className="name">{booking.adults[0].firstname + ' ' + booking.adults[0].lastname}</div>
                {booking.adults.length > 1 &&
                    <span>and {booking.adults.length - 1} {(booking.adults.length - 1) === 1 ? 'other' : 'others'}</span>
                }
            </div>
            <div className="timeline">
                <img src={profileIcon} alt="profile" />
                <div className="timeline-detail">
                    <div className="text">{booking.journeyBus.departurePoint}</div>
                    <div className="seperator"></div>
                    <div className="text">{booking.journeyBus.arrivalPoint}</div>
                </div>
            </div>
            {booking.returnBus &&
                <div className="timeline">
                    <img src={profileIcon} alt="profile" />
                    <div className="timeline-detail">
                        <div className="text">{booking.returnBus.departurePoint}</div>
                        <div className="seperator"></div>
                        <div className="text">{booking.returnBus.arrivalPoint}</div>
                    </div>
                </div>
            }
            <div className="info">
                <div className="flex-row-gap-10 center">
                    <div className="fs12-fw400 slate-600">Bus:</div>
                    <div className="fs14-fw600 slate-600">{`${booking.journeyBus.departurePoint}-${booking.journeyBus.arrivalPoint} ${booking.journeyBus.departureTime}`}</div>
                </div>
                {booking.returnBus &&
                    <div className="flex-row-gap-10 center">
                        <div className="fs12-fw400 slate-600">Bus:</div>
                        <div className="fs14-fw600 slate-600">{`${booking.returnBus.departurePoint}-${booking.returnBus.arrivalPoint} ${booking.returnBus.departureTime}`}</div>
                    </div>
                }
                <div className="flex-row-justify">
                    <div className="flex-col-gap-10">
                        <div className="fs12-fw400 slate-600">Order ID</div>
                        <div className="fs14-fw600 slate-600"># {booking.code}</div>
                    </div>
                    <div className="flex-col-gap-10 align-end">
                        <div className="fs12-fw400 slate-600">Ticket</div>
                        <div className="fs14-fw600 slate-600">Adult</div>
                    </div>
                </div>
                <div className="flex-row-justify">
                    <div className="flex-col-gap-10">
                        <div className="fs12-fw400 slate-600">Journey Date</div>
                        {/* To be done */}
                        <div className="fs14-fw600 slate-600">{new Date(booking.journeyBus.departureDate + 'T00:00:00Z').toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
                    </div>
                    <div className="flex-col-gap-10 align-end">
                        <div className="fs12-fw400 slate-600">Journey Time</div>
                        <div className="fs14-fw600 slate-600">{booking.journeyBus.departureTime}</div>
                    </div>
                </div>
                <div className="flex-row-justify">
                    <div className="flex-col-gap-10">
                        <div className="fs12-fw400 slate-600">Order Date</div>
                        <div className="fs14-fw600 slate-600">{new Date(booking.updatedAt).toLocaleDateString('en-US', { day: '2-digit', month: 'long', year: 'numeric' })}</div>
                    </div>
                    <div className="flex-col-gap-10 align-end">
                        <div className="fs12-fw400 slate-600">Paid Amout</div>
                        <div className="fs14-fw600 slate-600">${booking.subTotal}</div>
                    </div>
                </div>
            </div>
            <div className="btns-container">
                <button className="btn bg-orange-300" onClick={() => handleDownload(booking)}><img src={pdfIcon} alt="pdf-icon" /></button>
                <button className="btn bg-green-400" onClick={() => handleView(booking)}><img src={eyeIcon} alt="eye-icon" /></button>
            </div>
        </div>
    )
};

export default Card;