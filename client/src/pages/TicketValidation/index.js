import React, { useState } from "react";
import './index.css';
import BusSearch from "./components/BusSearch";
import PassengerSearch from "./components/PassengerSearch";

const TicketValidation = () => {
    const [view, setView] = useState(1);

    const changeView = (value) => {
        if (view !== value) {
            setView(value);
        }
    };

    return (
        <div className="ticket-validation">
            <div className="title">Ticket Validation</div>
            <div className="content">
                <div className="search-by">
                    <div className={view === 1 ? 'active' : 'non-active'} onClick={() => changeView(1)}>Bus</div>
                    <div className={view === 2 ? 'active' : 'non-active'} onClick={() => changeView(2)}>Passenger</div>
                </div>
                {view === 1 ?
                    <BusSearch />
                    :
                    <PassengerSearch />
                }
            </div>
        </div>
    )
};

export default TicketValidation;