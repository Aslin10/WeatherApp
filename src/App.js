
import './App.css';

import React, { useState,useEffect } from 'react';


import searchbar from './images/search.png';
import cloudIcon from'./images/clouds.gif';
import drizzleIcon from'./images/drizzle.gif';
 import rainIcon from'./images/rain.gif';
 import snowIcon from'./images/snow.gif';
 import stormIcon from'./images/storm.gif';
 import clearIcon from'./images/clearsky.gif';
import { WeatherDetails } from './Weatherdetails';




function App() {
  
  const[text,setText]=useState("chennai");
  const[icon,setIcon]=useState("cloudIcon");
  const[city,setCity]=useState("");
  const[temp,setTemp]=useState(0);
  const[country,setCountry]=useState('IN');
  const[log,setLog]=useState(0);
  const[lat,setLat]=useState(0);
  const[wind,setWind]=useState(0);
  const[humidityrange,setHumidityRange]=useState(0);
  const[loading,setLoading]=useState(false);
  const[cityNotFound,setCityNotFound]=useState(false);
  const[error,setError]=useState(null);
 
 

  const weatherIconMap={
    "01d":clearIcon,
    "01n":clearIcon,
    "02d":cloudIcon,
    "02n":cloudIcon,
    "03d":cloudIcon,
    "03n":cloudIcon,
    "04d":cloudIcon,
    "04n":cloudIcon,
    "09d":drizzleIcon,
    "09n":rainIcon,
    "10d":rainIcon,
    "10n":rainIcon,
    "11n":stormIcon,
    "11d":stormIcon,
    "13d":snowIcon,
    "13n":snowIcon,
  };

 
 async function searchLoction(){

try{
  setLoading(true);
const res=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${text}&appid=2eb1b2e443ab5dc72c66a69ae381a1d0&units=Metric`);
const data=await res.json();
if(data.cod==="404"){
  console.error("City Not Found");
  
  setCityNotFound(true);
  setLoading(false);
  return;
}
 setCity(data.name);
 setTemp(Math.floor(data.main.temp));
 setCountry(data.sys.country);
 setLat(data.coord.lat);
 setLog(data.coord.lon);
setHumidityRange(data.main.humidity);
 setWind(data.wind.speed);

 setIcon(weatherIconMap[data.weather[0].icon]||clearIcon);
setCityNotFound(false);


}catch(error){
  console.error("An Error occured:" ,error.message);
  setError("An error occured while fetching weather data");

}finally{
  setLoading(false);
}
 }

  function textHandler(e){
    setText(e.target.value);

  }
  function handleKeyDown(e){
    if(e.key==='Enter'){
      searchLoction();

    }
  }
  useEffect(function() {
    
    searchLoction();
      
    },[]);
    
  return (
    
     
    <div className="container">
    
      <div className='input_holder'>
        
        <input type="text"placeholder='Enter the City'id="input"value={text}onChange={textHandler}onKeyDown={handleKeyDown}/>
           
           <div className='search_holder'>
            <img src={searchbar}onClick={()=>{searchLoction()}}alt="search"></img>
           </div></div>
           
  
          
         {loading&&<div className='loading'>Loading....</div>}
         {error&&<div className='error'>{error}</div>}
         {cityNotFound&&<div className="citynotfound">City Not Found</div>} 
          {!cityNotFound&&!loading&&<WeatherDetails icon={icon} city={city} temp={temp} country={country} log={log} lat={lat} wind={wind} humidityrange={humidityrange}/>}
    </div>
    
  );
}

export default App;
