import React, { useState } from "react";
import './index.css';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import { AiOutlineStop } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import busService from "../../../../services/busService";
import AddExtra from "../AddExtra";

const Extras = ({ extras, getData }) => {
    const [addExtra, setAddExtra] = useState(false);
    const dispatch = useDispatch();

    const handleUpdate = async (extra) => {
        dispatch(ShowLoading());
        try {
            const response = await busService.updateExtra(extra._id, { isAvailable: !extra.isAvailable });
            message.success(response);
            getData();
        } catch (error) {
            message.error(error.response.data);
        }
        dispatch(HideLoading());
    };

    return (
        <div className="extras">
            <div className="btn-container">
                {!addExtra ?
                    <button className="btn" onClick={() => setAddExtra(true)}>Add Extra</button>
                    :
                    <AddExtra getData={getData} setAddExtra={setAddExtra} />
                }
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Price ($)</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {extras.map((extra, index) => (
                        <tr className="extra" key={index}>
                            <td>{extra.name}</td>
                            <td>{extra.price}</td>
                            {extra.isAvailable ?
                                <td><AiOutlineStop size={20} color="brown" className="icon" onClick={() => handleUpdate(extra)} /></td>
                                :
                                <td><FaCheck size={20} color="green" className="icon" onClick={() => handleUpdate(extra)} /></td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
};

export default Extras;