import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Map from './pages/Map';
import 'bootstrap/dist/css/bootstrap.min.css'
import Weather from './pages/Weather';


function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/map" element={<Map />} />
                <Route path="/weather" element={<Weather />} />
                <Route path="/map" element={<Map />} />

            </Routes>
        </Router>
    );
}

export default App;
