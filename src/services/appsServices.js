import httpServices from "./httpServices";

// * Coin Converter Service
//? https://freecurrencyapi.com/
const COIN_KEY = "fca_live_5QjHOFM27AA4XoyRL2SEsP3FfQzbVFk8H4QaMMsO";
const COIN_BASE_URL =
  "https://api.freecurrencyapi.com/v1/latest?apikey=" + COIN_KEY;

function getCoinsValue() {
  return httpServices.get(COIN_BASE_URL);
}

export const coinService = {
  getCoinsValue,
};

// * Weather Service
//? https://www.weatherapi.com/docs/
const WEATHER_KEY = "544f5c6825254749a0a131941251407";
const DAYS = 6;
const WEATHER_BASE_URL = `https://api.weatherapi.com/v1/forecast.json?days=${DAYS}&key=${WEATHER_KEY}&aqi=yes&q=`;
//
async function getWeather(city) {
  try {
    const Response = await httpServices.get(WEATHER_BASE_URL + city);
    return Response.data;
  } catch (error) {
    console.error(
      "Error in getWeather service:",
      error.response?.status,
      error.response?.data,
      error.message
    );
    throw error;
  }
}
export const weatherService = {
  getWeather,
};
