import React, { useEffect } from "react";
import './index.css';
import { useNavigate } from "react-router-dom";

const Home = () => {
    const navigate = useNavigate();

    useEffect(() => {
        navigate('/ticket-validation');
    }, [navigate]);

    return (
        <div className="home">
            HOME page
        </div>
    )
};

export default Home;