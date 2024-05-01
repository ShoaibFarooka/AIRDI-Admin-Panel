import React, { useState } from "react";
import './index.css';
import { IoIosArrowForward } from "react-icons/io";
import Profile from '../../../../assets/profile-icon.svg';
import PassengerInfo from "../PassengerInfo";

const PassengerList = ({ list, setList, setUpdateData }) => {
    const [selectedPassenger, setSelectedPassenger] = useState(null);
    return (
        <>
            {!selectedPassenger ?
                <div className="passenger-list">
                    {list.map((info, index) => (
                        <div className="passenger-card" key={index} onClick={() => setSelectedPassenger(info)}>
                            <div className="card-info">
                                <img src={Profile} alt="profile-icon" width={50} height={50} />
                                <div className="flex-col">
                                    <div><b>{info.adults[0].firstname + ' ' + info.adults[0].lastname}</b></div>
                                    <div>{info.email}</div>
                                    <div>{info.code}</div>
                                </div>
                            </div>
                            <div className="arrow-container">
                                <IoIosArrowForward size={20} />
                            </div>
                        </div>
                    ))}
                    <button className="btn" onClick={() => setList([])}>Back</button>
                </div>
                :
                <PassengerInfo passenger={selectedPassenger} setSelectedPassenger={setSelectedPassenger} setUpdateData={setUpdateData} />
            }
        </>
    )
};

export default PassengerList;