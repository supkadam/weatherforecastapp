import React from 'react';
import './App.css'
import { useState, useEffect } from 'react';

export default function App(){

  const[city, setCity] = useState('');
  const[weatherData, setWeatherData] = useState([]);
  const[temp, setTemp] = useState(false);

  useEffect(()=>{
    const url = "https://api.weatherapi.com/v1/forecast.json"
    const api_key = "1c51bcb6d6ed4839afd120715252304";
      fetch(`${url}?key=${api_key}&q=Berlin`)
      .then(response=>response.json())
      .then(data=>{
        setWeatherData(data)
        setTemp(true)
      })

  },[])

  const fetchWeatherDetails = () => {
      const url = 'https://api.weatherapi.com/v1/forecast.json'
      const api_key = '1c51bcb6d6ed4839afd120715252304';
      let result = fetch(`${url}?key=${api_key}&q=${city}`);
      result
      .then(
          response => {
            if(!response.ok){
              alert('Please enter a valid city name');
              setCity('');
            }else{
              response.json()
              .then(
                  data => setWeatherData(data)
                ) 
                setCity('');    
            }
          }
      )
  }

  
  
  return(
    <>
      <div className='parent'>
            <div className='search'>

                      <input 
                          type='text' 
                          id='searchField' 
                          placeholder='Enter a city name' 
                          value={city}
                          onChange={(event)=>{setCity(event.target.value)}}
                      />
                      
                      <button id='searchBtn' onClick={fetchWeatherDetails}>Search</button>
            </div>

          {temp && <>
                    <div className='child2'>
                        <img src={weatherData.current.condition.icon}/>
                        <h1 id='temperature'>{weatherData.current.temp_c}°C</h1>
                        <h1 id='location'>{weatherData.location.name}</h1>
                        <h1 id='region'>{weatherData.location.region}</h1>
                        <h3 id='country'>{weatherData.location.country}</h3>

                    </div>

                    <div className='child3'>
                        <img src='/sunrise.png' width='50px'/>
                        <h2>{weatherData.forecast.forecastday[0].astro.sunrise}</h2>
                        <img src='/sunset.png' width='47px'/>
                        <h2>{weatherData.forecast.forecastday[0].astro.sunset}</h2>
                        <h2>max : {weatherData.forecast.forecastday[0].day.maxtemp_c}°C</h2>
                        <h2>min : {weatherData.forecast.forecastday[0].day.mintemp_c}°C</h2>
                    </div>

                    <div className='child3'>
                        <img src='/wind.png' width='40px'/>
                        <h2>{weatherData.current.wind_kph} km/h</h2>
                        <img src='/humidity.png' width='40px'/>
                        <h2>{weatherData.current.humidity}%</h2>
                        <img src='/fresh-air.png' width='40px'/>
                        <h2>{weatherData.current.pressure_mb} hPa</h2>
                        
                    </div>

                    <div className='child4'>
                      {weatherData.forecast.forecastday[0].hour.map((item,index)=>{
                          const currentHour = weatherData.location.localtime.split(' ')[1].split(':')[0];
                        
                          if(index >= currentHour){
                            return(
                              <div className='futurePrediction' key={index}>
                                  <h1>{(item.time).split(' ')[1]}</h1>
                                  <img src={item.condition.icon} width='50px'/>
                                  <h1>{item.temp_c}°C</h1>
                        

                              </div>
                            )
                            
                          }
                          
                        })
                      }
                        


                    </div>
                </>
            }
      </div>
    </>
  );
}