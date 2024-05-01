import React from 'react';
import "./App.css";
import Loader from "./components/Loader.js";
import { useSelector } from "react-redux";
import Router from './router/Router.js';

function App() {
  const { loading } = useSelector((state) => state.loader);

  return (
    <div className="App">
      {loading && <Loader />}
      <Router />
    </div>
  );
}

export default App;
