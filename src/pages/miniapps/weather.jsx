import PageHeader from "../../components/common/pageHeader";
import { useState, useEffect } from "react";
import { weatherService } from "../../services/appsServices";

function Weather() {
  const [city, setCity] = useState("tel aviv");
  const [weatherData, setWeatherData] = useState(null);
  const [error, setError] = useState(null);
  const [displayWeather, setDisplayWeather] = useState(false);

  useEffect(() => {
    const fetchWeather = async () => {
      try {
        const response = await weatherService.getWeather(city);
        setWeatherData(response);
      } catch (err) {
        console.error("Error fetching weather data:", err);
      }
    };
    fetchWeather();
  }, [city]);

  const handleChangeCity = (e) => {
    setCity(e.target.value);
  };

  const handleGetWeather = async () => {
    setDisplayWeather(weatherData);
  };

  return (
    <div className="container">
      <PageHeader
        title="Weather App"
        description={"Find out the weather in any city around the world."}
      />
      <div className="row justify-content-center">
        <div className="col-12">
          <form className="form" action="">
            <div className="mb-3 d-flex col-12">
              <div className="form-group col-10 gap-2 align-items-end justify-content-center d-flex">
                <label htmlFor="city" className="form-label">
                  City:
                </label>
                <input
                  type="text"
                  className="form-control "
                  id="city"
                  onChange={handleChangeCity}
                />
              </div>
              <button
                type="button"
                className="btn btn-primary col-2 mx-2 my-auto"
                onClick={handleGetWeather}
              >
                Go
              </button>
            </div>
            {displayWeather && (
              <div className="col-12">
                <hr />

                <div className="mt-3 text-center p-3 rounded shadow border border-secondary col-md-6 mx-auto">
                  <h3>Weather in {displayWeather.location.name}</h3>
                  <p>Temperature: {displayWeather.current.temp_c}°C</p>
                  <p>Condition: {displayWeather.current.condition.text}</p>
                  <p>Humidity: {displayWeather.current.humidity}%</p>
                  <p>Wind Speed: {displayWeather.current.wind_kph} km/h</p>
                  <p>Last Updated: {displayWeather.current.last_updated}</p>
                  <img
                    src={displayWeather.current.condition.icon}
                    alt={displayWeather.current.condition.text}
                    className="img-fluid"
                  />
                  <p>
                    <strong>Location:</strong> {displayWeather.location.name},{" "}
                    {displayWeather.location.country}
                  </p>
                </div>
                <hr />
                <div className="d-flex flex-wrap justify-content-center align-items-center col-12">
                  {displayWeather.forecast?.forecastday.map(
                    (forecast, index) => {
                      if (index === 0) return null;
                      return (
                        <div
                          className="d-flex flex-column text-center align-items-center justify-content-center border p-3 m-2 shadow rounded"
                          key={index}
                        >
                          <p>{forecast.date}</p>
                          <p>
                            <span className="fw-bold">Avg. Temp:</span>{" "}
                            {forecast.day.avgtemp_c}°C
                          </p>
                          <p>
                            <span className="fw-bold">Max Temp:</span>{" "}
                            {forecast.day.maxtemp_c}°C
                          </p>
                          <p>
                            <span className="fw-bold">Min Temp:</span>{" "}
                            {forecast.day.mintemp_c}°C
                          </p>
                          <p>{forecast.day.condition.text}</p>
                          <img
                            src={forecast.day.condition.icon}
                            alt={forecast.day.condition.text}
                            className="img-fluid"
                          />
                        </div>
                      );
                    }
                  )}
                </div>
              </div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
}

export default Weather;
