import httpServices from "./httpServices";

const KEY = "fca_live_5QjHOFM27AA4XoyRL2SEsP3FfQzbVFk8H4QaMMsO";
const BASE_URL = "https://api.freecurrencyapi.com/v1/latest?apikey=" + KEY;

function getCoinsValue() {
  return httpServices.get(BASE_URL);
}

const coinService = {
  getCoinsValue,
};

export default coinService;
