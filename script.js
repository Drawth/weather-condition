const url = "http://api.openweathermap.org/geo/1.0/direct?";
const key = "c460915944b7ec03852faba5211f506f";

const getLatLon = async (cityName) => {
  const link = `${url}q=${cityName}&appid=${key}`;

  await fetch(link)
    .then((weather) => {
      return weather.json();
    })
    .then(getResult);
};

const getResult = async (result) => {
  if (result == "") {
    alert("Geçerli bir şehir giriniz");
  }
  const query = `https://api.openweathermap.org/data/2.5/weather?lat=${result[0].lat}&lon=${result[0].lon}&appid=${key}`;

  await fetch(query)
    .then((weather) => {
      return weather.json();
    })
    .then(displayResult);
};

const displayResult = (result) => {
  let city = document.querySelector(".city");
  city.innerHTML = `${result.name},${result.sys.country}`;

  let temp = document.querySelector(".temp");
  temp.innerHTML = `${Math.round(result.main.temp) - 273}°C`;

  let desc = document.querySelector(".desc");
  desc.innerHTML = result.weather[0].description;

  let minmax = document.querySelector(".minmax");
  minmax.innerHTML = `${Math.round(
    result.main.temp_min - 273
  )}°C  / ${Math.round(result.main.temp_max - 273)}°C`;
};

const setQuery = (e) => {
  if (e.keyCode == "13") {
    if (e.target.value === "") {
      alert("Lütfen  bir şehir ismi giriniz.");
    } else {
      getLatLon(e.target.value);
    }
  }
};

const city = document.getElementById("searchBar");
city.addEventListener("keypress", setQuery);
