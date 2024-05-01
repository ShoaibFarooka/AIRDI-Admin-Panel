import React, { useState } from "react";
import './index.css';
import { message } from 'antd';
import { useDispatch } from 'react-redux';
import { HideLoading, ShowLoading } from '../../../../redux/loaderSlice';
import { AiOutlineStop } from "react-icons/ai";
import { FaCheck } from "react-icons/fa";
import AddVoucher from "../AddVoucher";
import busService from "../../../../services/busService";

const Vouchers = ({ vouchers, getData }) => {
    const [addVoucher, setAddVoucher] = useState(false);
    const dispatch = useDispatch();
    
    const handleUpdate = async (voucher) => {
        dispatch(ShowLoading());
        try {
            const response = await busService.updateVoucher(voucher._id, { isExpired: !voucher.isExpired });
            message.success(response);
            getData();
        } catch (error) {
            message.error(error.response.data);
        }
        dispatch(HideLoading());
    };

    return (
        <div className="vouchers">
            <div className="btn-container">
                {!addVoucher ?
                    <button className="btn" onClick={() => setAddVoucher(true)}>Add Voucher</button>
                    :
                    <AddVoucher getData={getData} setAddVoucher={setAddVoucher} />
                }
            </div>
            <table>
                <thead>
                    <tr>
                        <th>Code</th>
                        <th>Type</th>
                        <th>Value</th>
                        <th>Usage Limit</th>
                        <th>Status</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {vouchers.map((voucher, index) => (
                        <tr className="voucher" key={index}>
                            <td>{voucher.code}</td>
                            <td>{voucher.type}</td>
                            <td>{voucher.value}</td>
                            <td>{voucher.isOneTimeUse ? 'One Time' : 'Multiple Times'}</td>
                            <td>{voucher.isExpired ? 'Expired' : 'Active'}</td>
                            {!voucher.isExpired ?
                                <td><AiOutlineStop size={20} color="brown" className="icon" onClick={() => handleUpdate(voucher)} /></td>
                                :
                                <td><FaCheck size={20} color="green" className="icon" onClick={() => handleUpdate(voucher)} /></td>
                            }
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Vouchers;
