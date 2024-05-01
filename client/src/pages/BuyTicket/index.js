import React, { useState, useEffect } from "react";
import './index.css';
import Filters from "./Components/Filters";
import SearchResult from "./Components/SearchResult";

const BuyTicket = () => {
    const [outwardBuses, setOutwardBuses] = useState([]);
    const [returnBuses, setReturnBuses] = useState([]);
    const [view, setView] = useState(1);

    return (
        <div className="buy-ticket">
            <Filters setOutwardBuses={setOutwardBuses} setReturnBuses={setReturnBuses} setView={setView} />
            <SearchResult outwardBuses={outwardBuses} returnBuses={returnBuses} view={view} setView={setView} />
        </div>
    )
};

export default BuyTicket;