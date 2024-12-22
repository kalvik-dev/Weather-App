import React from 'react'
import { useState, useEffect, useRef } from 'react'
import './Weather.css'
import search_icon from '../assets/images/search.png'
import clear_icon from '../assets/images/clear.png'
import clear_moon_icon from '../assets/images/clear-moon.png'
import cloudy_moon_icon from '../assets/images/cloudy-night.png'
import moon_rain_icon from '../assets/images/moon_rain.png'
import clouds_icon from '../assets/images/clouds.png'
import drizzle_icon from '../assets/images/drizzle.png'
import humidity_icon from '../assets/images/humidity.png'
import mist_icon from '../assets/images/mist.png'
import rain_icon from '../assets/images/rain.png'
import snow_icon from '../assets/images/snow.png'
import wind_icon from '../assets/images/wind.png'
import thunder_icon from '../assets/images/thunderstroam.png'
import scattered_icon from '../assets/images/scattered.png'


const Weather = () => {


    const [temp,setTemp]=useState(0);
    const [humidity,setHumidity]=useState(0);
    const [windSpeed,setWindSpeed]=useState(0);
    const [icon,setIcon]=useState(null);
    const [location,setLocation]=useState("");
    const [status,setStatus] = useState("");

    const inputRef = useRef();

    const allIcons = {
        "01d":clear_icon,
        "01n":clear_moon_icon,
        "02d":clouds_icon,
        "02n":cloudy_moon_icon,
        "03d":scattered_icon,
        "03n":scattered_icon,
        "04d":scattered_icon,
        "04n":scattered_icon,
        "09d":drizzle_icon,
        "09n":moon_rain_icon,
        "10d":rain_icon,
        "10n":moon_rain_icon,
        "11d":thunder_icon,
        "11n":thunder_icon,
        "13d":snow_icon,
        "13n":snow_icon,
        "50n":mist_icon,
        "50d":mist_icon
    };


    const search = async(city) =>{

        if(city === "")
        {
            alert("Enter City Name");
            return;
        }

        try
        {
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${import.meta.env.VITE_API_ID}`;

            const response = await fetch(url);
            const data = await response.json();

            if(!response.ok)
            {
                alert("Enter Existing City Name");
                return;
            }

            console.log("Temperature:",data);


            setHumidity(data.main.humidity);
            setTemp(data.main.temp);
            setWindSpeed(data.wind.speed);
            setLocation(data.name);
            if (data.weather && data.weather.length > 0) {

                setIcon(allIcons[data.weather[0].icon]);
                setStatus(data.weather[0].description)
                console.log("Description:", data.weather[0].description);

              } else {

                console.error("Weather data is missing or invalid");

              }
            
        }
        catch(error)
        {

        }

    }

    useEffect(()=>{

        search("Yellandu");

    },[]);

    return (
    <div className='weather'>
       
        <div className="search-bar">
            <input type='text' placeholder='Search' ref={inputRef}/>
            <img src={search_icon} alt='search-button'  className='search-button' onClick={()=>search(inputRef.current.value)}/>
        </div>
        <img src={icon} alt='clear sky' className='weather-icon'/>
        <p className='status'>{status}</p>
        <p className='temperature'>{Math.floor(temp)} °C</p>
        <p className='location'>{location}</p>

        <div className='extra-info'>
            <div className='data'>
                <img src={humidity_icon} alt='Humidity' className='humidity-icon'/>
                <div>
                <p>{humidity}%</p>
                <span>Humidity</span>
                </div>
            </div>
            <div className='data'>
                <img src={wind_icon} alt='Wind Speed' className='wind-icon'/>
                <div>
                <p>{windSpeed} kmph</p>
                <span>Wind Speed</span>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Weather