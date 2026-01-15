import React from 'react'

function Weather({weather,loading}) {
  return (
    <div>
        {weather && !loading && (
          <div className="mt-6 space-y-3">
            <div className="border border-gray-600 p-3 rounded-lg text-center text-lg font-semibold">
              {weather.city}
            </div>
            <div className="border border-gray-600 p-3 rounded-lg">
              <span className="font-semibold">Temperature:</span>{" "}
              {weather.temperature}
            </div>
            <div className="border border-gray-600 p-3 rounded-lg">
              <span className="font-semibold">Wind Speed:</span>{" "}
              {weather.windSpeed}
            </div>
            <div className="border border-gray-600 p-3 rounded-lg">
              <span className="font-semibold">Humidity:</span>{" "}
              {weather.humidity}
            </div>
            <div className="border border-gray-600 p-3 rounded-lg capitalize">
              <span className="font-semibold">Description:</span>{" "}
              {weather.description}
            </div>
          </div>
        )}
    </div>
  )
}

export default Weather