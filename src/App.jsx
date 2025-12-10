import { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState([]);
  const ApiKey = "fe33bc700f3471ad728801d049b1c7a1";
  function getweather(e) {
    e.preventDefault();
    console.log("so");
    fetch(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}`
    )
      .then((res) => res.json())
      .then((resp) => {
        setWeather({
          tempreture:Math.floor(`${resp.main.temp}`-273)+ ' ℃',
          windSpeed:Math.floor(`${resp.wind.speed}`*4)+ ' Km/h',
          humidity: `${resp.main.humidity}%`,
          weather: `${resp.weather[0].description}`
        });
        
      });
  }
  return (
    <>
      <form onSubmit={getweather}>
        <h1>Weather Forecast</h1>
        <input
          style={{
            margin: "10px ",
            padding: "12px 25px",
            background: "#1a1a1a",
            outline: "none",
            border: "none",
            color: "#fff",
            borderRadius: "8px",
          }}
          type="text"
          placeholder="Enter Your City"
          onChange={(element) => {
            setCity(element.target.value);
          }}
        />
        <button type="submit"> Get Weather </button>

        <h2 >
         <div style={{border:'1px solid #555', margin:'5px', padding:'5px 20px', borderRadius:"5px"}}>
           Tempreture: {weather.tempreture} 
         </div >
         <div style={{border:'1px solid #555',margin:'5px', padding:'5px 20px', borderRadius:"5px"}}>
           Wind Speed: {weather.windSpeed}
         </div>
         <div style={{border:'1px solid #555', margin:'5px', padding:'5px 20px',borderRadius:"5px"}}>
          Humidity: {weather.humidity}
         </div>
         <div style={{border:'1px solid #555', margin:'5px', padding:'5px 20px',borderRadius:"5px"}}>
          Description: {weather.weather}
         </div>
        </h2>
      </form>
    </>
  );
}

export default App;
