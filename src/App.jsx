import { useState } from "react";
import "./App.css";
import LoadingSpinner from "./Components/LoadingSpinner";
import Weather from "./Components/Weather";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState([]);

  const ApiKey = "fe33bc700f3471ad728801d049b1c7a1";

  // 👉 Fetch suggestions
  async function fetchSuggestions(value) {
    setCity(value);
    if (!value.trim()) {
      setSuggestions([]);
      return;
    }

    try {
      const res = await fetch(
        `https://api.openweathermap.org/geo/1.0/direct?q=${value}&limit=5&appid=${ApiKey}`
      );
      const data = await res.json();
      setSuggestions(data);
    } catch {
      setSuggestions([]);
    }
  }

  // 👉 Select suggestion
  function selectCity(name) {
    setCity(name);
    setSuggestions([]);
  }

  // 🌤 Fetch Weather
  async function getweather(e) {
    e.preventDefault();
    setError("");

    if (!city.trim()) return setError("Please enter a city name");

    setLoading(true);

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${ApiKey}&units=metric`
      );
      const resp = await res.json();
      if (resp.cod !== 200) {
        setWeather(null);
        setError(resp.message || "City not found");
      } else {
        setWeather({
          temperature: Math.round(resp.main.temp) + " ℃",
          windSpeed: Math.round(resp.wind.speed * 3.6) + " km/h",
          humidity: resp.main.humidity + "%",
          description: resp.weather[0].description,
          city: `${resp.name}, ${resp.sys.country}`,
        });
      }
    } catch {
      setError("Failed to fetch weather data");
      setWeather(null);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-gray-700 flex items-center justify-center p-4">
      <form
        onSubmit={getweather}
        className="bg-gray-800 text-white shadow-lg rounded-xl p-8 w-full max-w-md relative"
      >
        <h1 className="text-3xl font-bold text-center mb-6">
          Weather Forecast
        </h1>

        {/* 🔍 INPUT BOX + SUGGESTIONS */}
        <div className="relative">
          <input
            type="text"
            value={city}
            placeholder="Enter your city"
            onChange={(e) => fetchSuggestions(e.target.value)}
            className="w-full p-3 rounded-lg bg-gray-700 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
          />

          {/* 🎉 DROPDOWN SUGGESTIONS */}
          {suggestions.length > 0 && (
            <ul className="absolute w-full bg-gray-700 border border-gray-600 rounded-lg mt-1 max-h-40 overflow-y-auto z-10">
              {suggestions.map((c, i) => (
                <li
                  key={i}
                  onClick={() => selectCity(`${c.name}, ${c.country}`)}
                  className="px-3 py-2 cursor-pointer hover:bg-gray-600"
                >
                  {c.name}, {c.country}
                </li>
              ))}
            </ul>
          )}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full mt-4 bg-blue-600 disabled:opacity-60 disabled:cursor-not-allowed hover:bg-blue-700 transition text-white font-semibold py-2 rounded-lg"
        >
          {loading ? "Fetching..." : "Get Weather"}
        </button>


        {/* Error */}
        {error && (
          <h3 className="text-center text-red-400 font-semibold mt-4">
            {error}
          </h3>
        )}

        {/* Weather */}
      <Weather weather = {weather} loading = {loading}/>
      </form>
    </div>
  );
}

export default App;
