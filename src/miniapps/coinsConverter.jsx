import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";

import coinService from "../services/coinServices";

import Input from "../components/common/input";
import PageHeader from "../components/common/pageHeader";

function CoinsConverter() {
  const [amount, setAmount] = useState(0);
  const [conversionRate, setConversionRate] = useState(0);
  const [coinValue, setCoinValue] = useState("");

  useEffect(() => {
    const fetchConversionRate = async () => {
      try {
        const response = await coinService.getCoinsValue();
        const rates = response.data.data; // Assuming the API returns rates in USD
        setConversionRate(rates);
      } catch (error) {
        console.error("Error fetching conversion rate:", error);
        toast.error("Failed to fetch conversion rate");
      }
    };
    fetchConversionRate();
  }, []);

  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");

  const handleFromChange = (e) => {
    setFromCurrency(e.target.value);
  };

  const handleToChange = (e) => {
    setToCurrency(e.target.value);
  };

  const handleConvert = (e) => {
    e.preventDefault();
    if (!amount || isNaN(amount) || amount <= 0) {
      toast.error("Please enter a valid amount");
      return;
    }
    if (!fromCurrency || !toCurrency) {
      toast.error("Please select both currencies");
      return;
    }
    if (!conversionRate[fromCurrency] || !conversionRate[toCurrency]) {
      toast.error("Invalid currency selection");
      return;
    }

    const amountInUSD = amount / conversionRate[fromCurrency];
    const converted = (amountInUSD * conversionRate[toCurrency]).toFixed(2);

    const formattedConverted = new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: toCurrency,
    }).format(converted);
    setCoinValue(formattedConverted);
  };

  return (
    <div className="coin-convert">
      <PageHeader title="Convert Coins" />
      <form
        onSubmit={handleConvert}
        className=" form align-items-center justify-content-center flex-column"
      >
        <Input
          label="Amount:"
          name="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
        <hr />
        <div className="form-group mb-3 col-12">
          <label htmlFor={"from-currency"} className="form-label">
            From:<span className="text-danger ms-1">*</span>
          </label>
          <select
            className="form-control"
            id="from-currency"
            value={fromCurrency}
            onChange={handleFromChange}
          >
            <option value="">Select</option>
            {Object.entries(conversionRate).map(([key, value], index) => (
              <option value={key} key={index}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <div className="form-group mb-3 col-12">
          <label htmlFor={"to-currency"} className="form-label">
            To:<span className="text-danger ms-1">*</span>
          </label>
          <select
            className="form-control"
            id="to-currency"
            value={toCurrency}
            onChange={handleToChange}
          >
            <option value="">Select</option>
            {Object.entries(conversionRate).map(([key, value], index) => (
              <option value={key} key={index}>
                {key}
              </option>
            ))}
          </select>
        </div>
        <hr />
        <button
          type="submit"
          className="btn btn-secondary col-5 col-md-4  mx-auto d-block"
        >
          Convert
        </button>
      </form>
      <hr />
      {coinValue && (
        <div className="d-flex flex-column align-items-center justify-content-center border p-3 mt-3">
          <p className="fw-bold">Conversion Result:</p>
          <h3>{coinValue}</h3>
        </div>
      )}
    </div>
  );
}

export default CoinsConverter;
