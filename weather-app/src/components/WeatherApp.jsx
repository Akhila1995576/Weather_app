import React, { useState } from "react";
import axios from "axios";
import { Sun, Wind, Droplets, Thermometer, Eye, CloudSun } from "lucide-react";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState("");

  const API_KEY = "dc0eef2c521573dee32c43b7b1694bda";

  const fetchWeather = async () => {
    try {
      const response = await axios.get(
        `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`
      );
      if (response.data.success === false) {
        setError("City not found or invalid API key");
        setWeatherData(null);
      } else {
        setWeatherData(response.data);
        setError("");
      }
    } catch (err) {
      setError("Error fetching weather data");
      setWeatherData(null);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-100 to-blue-300 flex flex-col items-center justify-center px-4 py-8">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-lg p-6 space-y-4">
        <h1 className="text-xl sm:text-2xl font-bold text-center text-blue-500">Weather App</h1>
        
      
        <div className="flex flex-col sm:flex-row gap-2">
          <input
            type="text"
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Enter city name"
            className="w-full px-4 py-2 border rounded-lg "
          />
          <button
            onClick={fetchWeather}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
          >
            Search
          </button>
        </div>

        {error && <p className="text-red-600 text-sm text-center">{error}</p>}

        {weatherData && (
          <div className="space-y-2">
            <div className="text-center">
              <h2 className="text-lg sm:text-xl font-semibold">
                {weatherData.location.name}, {weatherData.location.country}
              </h2>
              <p className="text-sm text-gray-500">Local time: {weatherData.location.localtime}</p>
            </div>

            <div className="flex items-center justify-center">
              <img
                src={weatherData.current.weather_icons[0]}
                alt="icon"
                className="w-16 sm:w-20 h-16 sm:h-20"
              />
            </div>

            <h3 className="text-center text-2xl font-bold">
              {weatherData.current.temperature}°C
            </h3>
            <p className="text-center text-gray-700 italic">
              {weatherData.current.weather_descriptions[0]}
            </p>

           
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-4 text-sm sm:text-base">
              <div className="flex items-center gap-2">
                <Thermometer className="text-blue-500" /> Feels like: {weatherData.current.feelslike}°C
              </div>
              <div className="flex items-center gap-2">
                <Droplets className="text-blue-400" /> Humidity: {weatherData.current.humidity}%
              </div>
              <div className="flex items-center gap-2">
                <Wind className="text-indigo-500" /> Wind: {weatherData.current.wind_speed} km/h ({weatherData.current.wind_dir})
              </div>
              <div className="flex items-center gap-2">
                <CloudSun className="text-yellow-500" /> Cloud Cover: {weatherData.current.cloudcover}%
              </div>
              <div className="flex items-center gap-2">
                <Eye className="text-gray-600" /> Visibility: {weatherData.current.visibility} km
              </div>
              <div className="flex items-center gap-2">
                <Sun className="text-orange-400" /> UV Index: {weatherData.current.uv_index}
              </div>
            </div>

            <p className="text-center text-gray-600 text-xs sm:text-sm mt-4">
              Daytime: {weatherData.current.is_day === "yes" ? "Yes" : "No"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default WeatherApp;
