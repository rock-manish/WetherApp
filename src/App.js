import React, { useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import axios from "axios";
import "./App.css";

function App() {
  const apikey = "00e3d0c8f1f362874481d6cf1de751df";
  const [inputCity, setinputCity] = useState("");
  const [data, setData] = useState({});

  const getWetherDetails = (cityName) => {
    // if (!cityName) return;
    const apiURL =
      "https://api.openweathermap.org/data/2.5/weather?q=" +
      cityName +
      "&appid=" +
      apikey;
    axios.get(apiURL).then((res) => {
        console.log("response", res);

        setData(res.data);
      })
      .catch((err) => {
        console.log("err", err);
      });
  };

  const handleChangeInput = (e) => {
    // console.log(e.target.value);
    setinputCity( e.target.value);
  };

  const handleSearch = () => {
    getWetherDetails(inputCity);
  };

  useEffect(() => {
    getWetherDetails("delhi");
  }, []);

  return (
    <div className="col-md-12">
      <div className="wetherBg">
        <h1 className="heading">Wether app</h1>
        <div className="d-grid gap-3 col-4 mt-4">
          <input type="text" className="form-control" value={inputCity} onChange={handleChangeInput} />
          <button
            className="btn btn-primary"
            type="button"
            onClick={handleSearch}
          >
            search
          </button>
        </div>
      </div>
      <div className="col-md-12 text-center mt-5">
        <div className="shadow rounded wetherResultBox">
          {/* <img
            className="weatherIcon"
            src="https://cdn-icons-png.flaticon.com/512/1779/1779940.png"
            alt=""
          /> */}
  

          <h5 className="weatherCity">{data?.name}</h5>
          <h6 className="weatherTemp">
            {(data?.main?.temp - 273.15).toFixed(2)}°C
          </h6>
        </div>
      </div>
    </div>
  );
}

export default App;
