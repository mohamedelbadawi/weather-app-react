import React, { useEffect, useState } from 'react'
import './weather.css'
import weather_image from './Assets/cloud.png'
import humidity_image from './Assets/humidity.png'
import wind_image from './Assets/wind.png'
import axios from 'axios'
import clearImage from './Assets/clear.png'
export const Weather = () => {
    useEffect(() => {

        search();
    }, []);
    const API = 'f1151f76d82b4f99ec762c71ee80dafb';
    const [city, setCity] = useState('hurghada');
    const [data, setData] = useState({})
    const icons = {
        '01d': 'clear.png',
        '02d': 'cloud.png',
        '09d': 'drizzle.png',
        '10d': 'rain.png',
        '13d': 'snow.png',
        '04d': 'snow.png',
    }

    async function search() {
        try {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API}`
            const response = await axios.get(url);

            let icon = icons[response.data.weather[0].icon]
            setData({ name: response.data.name, temp: Math.round((response.data.main.temp) - 273.15), humidity: response.data.main.humidity, windSpeed: response.data.wind.speed, icon: icon })

            setCity("");

        } catch (error) {
            alert("No City with this name");
            setCity('');
        }

    }
    return (
        <div className='container'>
            <div className='top-bar'>
                <input placeholder='city ' value={city} type='text' onChange={(e) => setCity(e.target.value)} />
                <button className='search-btn' onClick={() => search()}> search </button>
            </div>
            <div className='weather-image'>
                {data.icon && <img src={require(`./Assets/${data.icon}`)} alt='weather' />}
                <img src={clearImage} alt='weather' />
            </div>
            <div className='weather-temp'>{data.temp} °C</div>
            <div className='weather-location'>{data.name}</div>
            <div className='data-container'>
                <div className='element'>
                    <img className='icon' src={humidity_image} alt='humidity' />
                    <div className='data'>

                        <div className='value'>{data.humidity} %</div>
                        <div className='text'>Humidity</div>
                    </div>
                </div>
                <div className='element'>
                    <img className='icon' src={wind_image} alt='humidity' />
                    <div className='data'>

                        <div className='value'>{data.windSpeed} km/h</div>
                        <div className='text'>Wind Speed</div>
                    </div>
                </div>
            </div>
        </div>
    )
}
export default Weather