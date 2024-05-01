import React, { useState, useEffect } from "react";
import './index.css';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../redux/loaderSlice';
import Form from "./Components/Form";
import Routes from "./Components/Routes";
import busService from "../../services/busService";

const CreateRoute = () => {
    const [routes, setRoutes] = useState([]);
    const dispatch = useDispatch();

    const getData = async () => {
        dispatch(ShowLoading());
        try {
            const response = await busService.getRoutes();
            if (response.routes) {
                setRoutes(response.routes);
            }
        } catch (error) {
            message.error(error.response.data);
        }
        dispatch(HideLoading());
    }

    useEffect(() => {
        getData();
    }, []);

    return (
        <div className="create-route">
            <Form getData={getData} />
            <Routes routes={routes} getData={getData} />
        </div>
    )
};

export default CreateRoute;