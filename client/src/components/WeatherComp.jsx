import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux'; // Import useSelector
import '/public/style/weather.css';

const WeatherComp = () => {
    // Initialize city with default value 'Surat'
    const [city, setCity] = useState('Surat');
    const [weatherData, setWeatherData] = useState({});

    const API_KEY = 'f292269c09b44882a9ab8dd54f3fb420';
    const API = '21eda837effb6d857ffacaf17fd65a8c';

    // Accessing the Redux state for location
    const location = useSelector((state) => state); // Adjust based on your store's structure

    useEffect(() => {
        if (location) {
            console.log('Location from Redux:', location);
            const { latitude, longitude, city: locCity } = location;

            // Set city from Redux or fall back to 'Surat'
            setCity(locCity || 'Surat');

            // If latitude and longitude are available, fetch city name and weather data
            if (latitude && longitude) {
                getCityName(latitude, longitude);
                fetchWeather(latitude, longitude);
            }
        }
    }, [location]);

    const getCityName = async (latitude, longitude) => {
        try {
            const response = await axios.get(
                `https://api.opencagedata.com/geocode/v1/json?q=${latitude}+${longitude}&key=${API_KEY}`
            );
            const { results } = response.data;

            if (results.length > 0) {
                setCity(results[0].components.city || 'Surat'); // Fallback to 'Surat'
            } else {
                setCity('No results found');
            }
        } catch (error) {
            console.error('Error fetching data:', error);
            setCity('Error fetching data');
        }
    };

    const fetchWeather = async (latitude, longitude) => {
        try {
            const response = await axios.get(
                `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API}`
            );
            setWeatherData(response.data);
        } catch (error) {
            console.error('Error fetching weather data:', error.message);
        }
    };

    console.log('City:', city); // Debugging

    return (
        <div className='weather-main'>
            <div className="weather-box">
                <span className="name" id="city" style={{ textTransform: 'capitalize' }}>
                    {city}
                </span>
                <hr />
                <div className="flex" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'space-evenly', gap: 5 }}>
                    <div className="humidity">
                        <img style={{ margin: '13px 55px', width: 40 }} src="/img/humidity.png" alt="humidity" />
                        <span>Humidity</span>
                        <span id="dis_hum">{weatherData?.main?.humidity || 'N/A'}</span>
                    </div>
                    <div className="pressure">
                        <img style={{ margin: '13px 55px', width: 42 }} src="/img/atmospheric.png" alt="pressure" />
                        <span>Pressure</span>
                        <span id="dis_pre">{weatherData?.main?.pressure || 'N/A'}</span>
                    </div>
                    <div className="temper">
                        <img style={{ margin: '13px 55px', width: 42 }} src="/img/high-temperature.png" alt="temperature" />
                        <span>Temperature</span>
                        <span id="dis_temper">{weatherData?.main?.temp || 'N/A'}</span>
                    </div>
                    <div className="visib">
                        <img style={{ margin: '13px 55px', width: 42 }} src="/img/fog.png" alt="visibility" />
                        <span>Visibility</span>
                        <span id="dis_visib">{weatherData?.visibility || 'N/A'}</span>
                    </div>
                    <div className="wind">
                        <img style={{ margin: '13px 55px', width: 42 }} src="/img/wind.png" alt="wind" />
                        <span>Wind Speed</span>
                        <span id="dis_wind">{weatherData?.wind?.speed || 'N/A'}</span>
                    </div>
                    <div className="sea-level">
                        <img style={{ margin: '13px 55px', width: 42 }} src="/img/tide.png" alt="sea-level" />
                        <span>Sea Level</span>
                        <span id="dis_sea_level">{weatherData?.main?.sea_level || 'N/A'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default WeatherComp;
