import React, { useState, useEffect } from "react";
import SelectBox from "./SelectBox";
import axios from "axios";

function App() {
  const url = "https://currency-exchange.p.rapidapi.com/listquotes";
  const options1 = {
    method: "GET",
    headers: {
      "X-RapidAPI-Key": "f192937115mshc40c582676b642ep141d47jsn36bf11087ed1",
      "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
    },
  };
  const [currencyData, setCurrencyData] = useState([]);
  const [fromCurrency, setFromCurrency] = useState("SGD");
  const [toCurrency, setToCurrency] = useState("SGD");
  const [fromAmount, setFromAmount] = useState(0);
  const [toAmount, setToAmount] = useState(0);

  useEffect(() => {
    axios
      .get(url, options1)
      .then((response) => {
        setCurrencyData(response.data);
      })
      .catch((error) => {
        console.error("Error fetching currency data:", error);
      });
  }, []);

  function convert() {
    const url2 = "https://currency-exchange.p.rapidapi.com/exchange";
    const options2 = {
      method: "GET",
      params: {
        from: fromCurrency,
        to: toCurrency,
        q: fromAmount,
      },
      headers: {
        "X-RapidAPI-Key": "f192937115mshc40c582676b642ep141d47jsn36bf11087ed1",
        "X-RapidAPI-Host": "currency-exchange.p.rapidapi.com",
      },
    };

    axios
      .get(url2, options2)
      .then((response) => {
        setToAmount(response.data*fromAmount);
      })
      .catch((error) => {
        console.error("Error converting currency:", error);
      });
  }

  return (
    <div>
      <SelectBox
        currencyData={currencyData}
        selectedCurrency={fromCurrency}
        updateCurrency={(e) => {
          setFromCurrency(e.target.value);
        }}
        updateInput={(e) => {
          setFromAmount(e.target.value);
        }}
        amount={fromAmount}
      />
      =
      <SelectBox
        currencyData={currencyData}
        selectedCurrency={toCurrency}
        updateCurrency={(e) => {
          setToCurrency(e.target.value);
        }}
        updateInput={(e) => {
          setToAmount(e.target.value);
        }}
        amount={toAmount}
      />
      <button onClick={convert}>Convert</button>
    </div>
  );
}

export default App;
