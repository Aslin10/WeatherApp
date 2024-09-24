import React from 'react'
import humidity from'./images/thermometer.png';
import windy from'./images/windy.png';
import './App.css';




 export function WeatherDetails({icon,city,temp,country,log,lat,wind,humidityrange})  {
  return (
    <div >
         <div className='image'>
    <img src={icon}alt="img"></img>
   </div>
   <div className='details'>
   <h2 className='city'>{city}</h2>
   <p className='temp'>{temp}°C</p>
   <p className='country'>{country}</p>
   </div>
   <div className='position'>
   <div className='log'>Longitude<span>{log}</span> </div>
   <div className='lat'>Latitude<span>{lat}</span></div>
   </div>
   <div className='Air_details'>
   
    
   <span className='wind'>
   <img src={windy} alt="windy"></img>
    WindSpeed:{wind}km/hr
   </span>
   
   <span className='humidity'>
   <img src={humidity} alt="humidity"></img>
    Humidity:{humidityrange}%
   </span>
   </div>
   
   </div>
  )

}

