import React, { useState, useEffect } from "react";
import './index.css';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import { AiOutlineStop } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import ArrowUp from '../../../../assets/arrow-up.svg'
import ArrowDown from '../../../../assets/arrow-down.svg';
import busService from "../../../../services/busService";


const Routes = ({ routes, getData }) => {
    const [groupedRoutes, setGroupedRoutes] = useState({});
    const [openedRoutes, setOpenedRoutes] = useState([]);
    const dispatch = useDispatch();

    useEffect(() => {
        const groupRoutes = () => {
            const grouped = {};
            routes.forEach(route => {
                const key = `${route.departurePoint}-${route.arrivalPoint}`;
                if (!grouped[key]) {
                    grouped[key] = [];
                }
                grouped[key].push(route);
            });
            for (const key in grouped) {
                grouped[key].sort((a, b) => {
                    const timeA = a.departureTime.split(':').map(Number);
                    const timeB = b.departureTime.split(':').map(Number);
                    if (timeA[0] !== timeB[0]) {
                        return timeA[0] - timeB[0];
                    }
                    return timeA[1] - timeB[1];
                });
            }
            console.log('Grouped Routes: ', grouped);
            return grouped;
        };

        setGroupedRoutes(groupRoutes());
    }, [routes]);

    const handleUpdate = async (route) => {
        dispatch(ShowLoading());
        try {
            const response = await busService.updateRoute(route._id, { bookingOpen: !route.bookingOpen });
            message.success(response);
            getData();
        } catch (error) {
            message.error(error.response.data);
        }
        dispatch(HideLoading());
    };

    const toggleView = (value) => {
        const clonedOpenedRoutes = [...openedRoutes]
        if (clonedOpenedRoutes.includes(value)) {
            const index = clonedOpenedRoutes.indexOf(value);
            clonedOpenedRoutes.splice(index, 1);
        }
        else {
            clonedOpenedRoutes.push(value);
        }
        setOpenedRoutes(clonedOpenedRoutes);
    };

    return (
        <div className="routes">
            <div className="routes-count">
                <div className="flex-gap-10">
                    <div className="text-1">{routes.length}</div>
                    <div className="text-2">Routes Found</div>
                </div>
            </div>
            <div className="grouped-routes">
                {Object.keys(groupedRoutes).map((key, index) => (
                    <div key={index}>
                        <div className="group-header" onClick={() => toggleView(index)}>
                            <div className="title">{key}</div>
                            {!openedRoutes.includes(index) ?
                                <img src={ArrowDown} alt="arrow-down" />
                                :
                                <img src={ArrowUp} alt="arrow-up" />
                            }
                        </div>
                        {openedRoutes.includes(index) &&
                            <table>
                                <thead>
                                    <tr>
                                        <th>Time</th>
                                        <th>Start Date</th>
                                        <th>End Date</th>
                                        <th>Duration</th>
                                        <th>Days</th>
                                        <th>Status</th>
                                        <th>Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {groupedRoutes[key].map((route, index) => (
                                        <tr className="route" key={index}>
                                            <td>{route.departureTime}</td>
                                            <td>{route.startDate}</td>
                                            <td>{route.endDate}</td>
                                            <td>{route.duration}</td>
                                            <td>{route.days.join(', ')}</td>
                                            <td>{route.bookingOpen ? 'Active' : 'Stopped'}</td>
                                            {route.bookingOpen ?
                                                <td><AiOutlineStop size={20} color="brown" className="icon" onClick={() => handleUpdate(route)} /></td>
                                                :
                                                <td><FaCheck size={20} color="green" className="icon" onClick={() => handleUpdate(route)} /></td>
                                            }
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        }
                    </div>
                ))}
            </div>
        </div>
    )
};

export default Routes