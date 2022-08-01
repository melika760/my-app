import React,{useState} from "react";
import axios from "axios";
export default function SearchEngin() {
  const [City, SetCity] = useState("");
  const [loaded, Setloaded] = useState(false);
  const [Weather, SetWeather] = useState({});
  function ShowFeatures(response) {
    console.log(response);
    Setloaded(true);
    SetWeather({
      temperature: Math.round(response.data.main.temp),
      wind: response.data.wind.speed,
      humidity: response.data.main.humidity,
      icon: `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`,
      description: response.data.weather[0].description
    });
  }
  function ChangeCity(event) {
    SetCity(event.target.value);
  }
  function HandleSubmit(event) {
    event.preventDefault();
    let Apikey = `1e9fb88fe728a434cb6268bdccba077b`;
    let Apiurl = `https://api.openweathermap.org/data/2.5/weather?q=${City}&appid=${Apikey}&units=metric`;
    axios.get(Apiurl).then(ShowFeatures);
  }
  let form = (
    <form onSubmit={HandleSubmit}>
      <input
        type="search"
        placeholder="Enter City"
        onChange={ChangeCity}
      ></input>
      <input type="submit"></input>
    </form>
  );
  if (loaded) {
    return (
      <div>
        {form}
        <ul>
          <li>{City}</li>
          <li>Temperature:{Weather.temperature}</li>
          <li>Description:{Weather.description}</li>
          <li>Humidity:{Weather.humidity}</li>
          <li>Wind:{Weather.wind}</li>
          <li>
            <img src={Weather.icon} alt={Weather.description} />
          </li>
        </ul>
      </div>
    );
  } else {
    return form;
  }
}