import React, { useEffect, useState } from 'react';
import { json, Link, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux'
import axios from 'axios';
import { getLocation } from '../Redux/Slices/LatLonSlice';

const LocationBox = () => {
    const dispatch = useDispatch()

    const [countries, setCountries] = useState([]);
    const [states, setStates] = useState([]);
    const [cities, setCities] = useState([]);

    const [selectedCountry, setSelectedCountry] = useState('');
    const [selectedState, setSelectedState] = useState('');
    const [selectedCity, setSelectedCity] = useState('');

    const [isManual, setIsManual] = useState(false);
    const [isAuto, setIsAuto] = useState(false);

    const navigate = useNavigate()


    // Fetch countries on component mount
    useEffect(() => {
        fetchCountries();
    }, []);

    const handleManual = () => setIsManual(true);
    const handleAuto = () => setIsAuto(true);

    const manualLatLong = async (url) => {
        try {
            console.log(selectedCity);

            const response = await axios.get('https://api.api-ninjas.com/v1/city?name=' + selectedCity, {
                headers: { 'X-Api-Key': 'LX0xMx34lmKrvCRxCWy5EQ==WIwckvbOkBX8wr68' }
            })
            console.log(response.data[0].latitude);
            const manualLocation = { latitude: response.data[0].latitude, longitude: response.data[0].longitude, city: selectedCity }
            // localStorage.setItem('manualLocation', JSON.stringify(manualLocation)) || null;
            dispatch(getLocation(manualLocation))
            navigatePage(url)

        } catch (error) {
            console.log(error.message);

        }
    }

    const fetchCountries = async () => {
        try {
            const response = await axios.get('https://api.countrystatecity.in/v1/countries', {
                headers: { "X-CSCAPI-KEY": "NFExQWRWWVJENmtDek5XNmMwcnMxUUFrRUhQRUVDWHFyUmRodXl6cw==" }
            });
            setCountries(response.data.map(({ iso2, name }) => ({ code: iso2, name })));
        } catch (error) {
            console.error('Error fetching countries:', error.message);
        }
    };

    const fetchStates = async (countryCode) => {
        try {
            const response = await axios.get(`https://api.countrystatecity.in/v1/countries/${countryCode}/states`, {
                headers: { "X-CSCAPI-KEY": "NFExQWRWWVJENmtDek5XNmMwcnMxUUFrRUhQRUVDWHFyUmRodXl6cw==" }
            });
            setStates(response.data.map(({ iso2, name }) => ({ code: iso2, name })));
        } catch (error) {
            console.error('Error fetching states:', error.message);
        }
    };

    const fetchCities = async (countryCode, stateCode) => {
        try {
            const response = await axios.get(
                `https://api.countrystatecity.in/v1/countries/${countryCode}/states/${stateCode}/cities`,
                { headers: { "X-CSCAPI-KEY": "NFExQWRWWVJENmtDek5XNmMwcnMxUUFrRUhQRUVDWHFyUmRodXl6cw==" } }
            );
            setCities(response.data.map(({ name }) => ({ name })));
        } catch (error) {
            console.error('Error fetching cities:', error.message);
        }
    };

    const getUserLocation = (url) => {
        setIsAuto(true);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    dispatchData(coords.latitude, coords.longitude);
                    // console.log(`Latitude: ${coords.latitude}, Longitude: ${coords.longitude}`);
                    navigatePage(url)
                },
                (error) => console.error('Error getting location:', error.message),
                { enableHighAccuracy: true }
            );

        } else {
            alert('Geolocation is not supported by your browser');
        }
    };



    const dispatchData = (latitude, longitude) => {
        const autoLoaction = { latitude: latitude, longitude: longitude };
        dispatch(getLocation(autoLoaction))
        // localStorage.setItem('autoLocation', JSON.stringify(autoLoaction)) || null;
        navigatePage();
    }

    const navigatePage = (url) => {
        navigate(`/${url}`)
    }


    return (
        <>
            <div style={{ display: isManual ? 'block' : 'none' }}>
                <div className="p-5 border border-secondary d-flex flex-column align-items-center rounded shadow-lg text-center bg-dark text-white">
                    {/* Country Dropdown */}
                    <select
                        onChange={(e) => {
                            setSelectedCountry(e.target.value);
                            fetchStates(e.target.value);
                        }}
                        className="py-2 px-5 my-2 border-secondary rounded bg-dark text-white text-center"
                    >
                        <option value="" disabled selected>Select Country</option>
                        {countries.map(({ code, name }) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>

                    {/* State Dropdown */}
                    <select
                        onChange={(e) => {
                            setSelectedState(e.target.value);
                            fetchCities(selectedCountry, e.target.value);
                        }}
                        className="py-2 px-5 my-2 border-secondary rounded bg-dark text-white text-center"
                        style={{ display: selectedCountry ? 'block' : 'none' }}
                    >
                        <option value="" disabled selected>Select State</option>
                        {states.map(({ code, name }) => (
                            <option key={code} value={code}>{name}</option>
                        ))}
                    </select>

                    {/* City Dropdown */}
                    <select
                        onChange={(e) => setSelectedCity(e.target.value)}
                        className="py-2 px-5 my-2 border-secondary rounded bg-dark text-white text-center"
                        style={{ display: selectedState ? 'block' : 'none' }}
                    >
                        <option value="" disabled selected>Select City</option>
                        {cities.map(({ name }) => (
                            <option key={name} value={name}>{name}</option>
                        ))}
                    </select>

                    <button className="btn btn-outline-light my-2 d-block" onClick={() => manualLatLong('map')}>Show Map</button>
                    <button className="btn btn-outline-light my-2 d-block" onClick={() => manualLatLong('weather')}>Show Weather</button>

                </div>
            </div>
            <div style={{ display: isAuto ? 'block' : 'none' }}>
                <div className="autoBox p-5 border border-secondary d-flex flex-column align-items-center rounded shadow-lg text-center bg-dark ">
                    <button className="btn btn-outline-light my-2 d-block" onClick={() => getUserLocation('map')}>Show Map</button>
                    <button className="btn btn-outline-light my-2 d-block" onClick={() => getUserLocation('weather')}>Show Weather</button>
                </div>
            </div>
            <div style={{ display: isManual || isAuto ? 'none' : 'block' }}>
                <div className='p-5 border border-secondary d-flex flex-column align-items-center rounded shadow-lg text-center bg-dark'>
                    <button className="btn btn-outline-light my-2" onClick={handleManual} style={{ display: isManual || isAuto ? 'none' : 'block' }}>Get Location Manually</button>
                    <button className="btn btn-outline-light  my-2" onClick={handleAuto} style={{ display: isManual || isAuto ? 'none' : 'block' }}>Get Location Automatically</button>
                </div>
            </div>
        </>

    );
};

export default LocationBox;

