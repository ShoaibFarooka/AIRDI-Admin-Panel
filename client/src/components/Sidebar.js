import React from "react";
import '../styles/Sidebar.css';
import { NavLink, useLocation } from "react-router-dom";
import SVG from "./SVG";

const Sidebar = () => {
    const location = useLocation();
    const path = location.pathname;
    return (
        <div className="sidebar">
            <NavLink to='/ticket-validation'>
                <SVG name='check' active={path === '/ticket-validation'} />
            </NavLink>
            <NavLink to='/create-route'>
                <SVG name='add' active={path === '/create-route'} />
            </NavLink>
            <NavLink to='/buy-ticket'>
                <SVG name='shop' active={path === '/buy-ticket'} />
            </NavLink>
            <NavLink to='/search-passenger'>
                <SVG name='search' active={path === '/search-passenger'} />
            </NavLink>
            <NavLink to='/sales-report'>
                <SVG name='doc' active={path === '/sales-report'} />
            </NavLink>
            <NavLink to='/global-setting'>
                <SVG name='setting' active={path === '/global-setting'} />
            </NavLink>
        </div>
    )
};

export default Sidebar;