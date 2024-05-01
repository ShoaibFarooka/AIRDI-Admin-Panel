import React, { useState, useEffect } from "react";
import './index.css';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import GeneralSetting from "./components/GeneralSetting";
import Vouchers from "./components/Vouchers";
import Extras from "./components/Extras";
import busService from "../../services/busService";

const GlobalSetting = () => {
    const [generalInfo, setGeneralInfo] = useState(null);
    const [vouchers, setVouchers] = useState([]);
    const [extras, setExtras] = useState([]);
    const [currentView, setCurrentView] = useState(1);
    const dispatch = useDispatch();

    const getData = async () => {
        dispatch(ShowLoading());
        try {
            const response = await busService.getBusAccess();
            if (response.data) {
                // console.log(response.data);
                setGeneralInfo({
                    advanceBooking: response.data.advanceBooking.toString(),
                    bufferTime: response.data.bufferTime.toString(),
                    serviceFee: response.data.serviceFee.toString(),
                })
                setVouchers(response.data.vouchers);
                setExtras(response.data.extras);
            }
        } catch (error) {
            message.error(error.response.data);
        }
        dispatch(HideLoading());
    }

    useEffect(() => {
        getData();
    }, []);

    const changeView = (view) => {
        if (currentView !== view) {
            setCurrentView(view);
        }
    }

    return (
        <div className="global-settings">
            <div className="tabs">
                <div className="title">Settings</div>
                <div className={`tab ${currentView === 1 ? 'active-tab' : 'non-active-tab'}`} onClick={() => changeView(1)} >General Info</div>
                <div className={`tab ${currentView === 2 ? 'active-tab' : 'non-active-tab'}`} onClick={() => changeView(2)} >Vouchers</div>
                <div className={`tab ${currentView === 3 ? 'active-tab' : 'non-active-tab'}`} onClick={() => changeView(3)} >Extras</div>
            </div>
            <div className="content">
                {currentView === 1 && generalInfo ?
                    <GeneralSetting data={generalInfo} getData={getData} />
                    :
                    currentView === 2 ?
                        <Vouchers vouchers={vouchers} getData={getData} />
                        : currentView === 3 ?
                            <Extras extras={extras} getData={getData} />
                            : <></>
                }
            </div>
        </div>
    )
};

export default GlobalSetting;