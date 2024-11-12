const url = "http://api.openweathermap.org/geo/1.0/direct?";
const key = "c460915944b7ec03852faba5211f506f";

const showLoading = () =>
  (document.getElementById("loading").style.display = "flex");
const hideLoading = () =>
  (document.getElementById("loading").style.display = "none");

const getLatLon = async (cityName) => {
  const link = `${url}q=${cityName}&appid=${key}`;
  try {
    showLoading();
    await fetch(link)
      .then((weather) => {
        return weather.json();
      })
      .then(getResult);
  } catch (error) {
    hideLoading();
    alert(`Bir hata oluştu: ${error.message}`);
  } finally {
    hideLoading();
  }
};

const getResult = async (result) => {
  if (result == "") {
    alert("Geçerli bir şehir giriniz");
    return;
  }
  const query = `https://api.openweathermap.org/data/2.5/weather?lat=${result[0].lat}&lon=${result[0].lon}&appid=${key}`;

  try {
    await fetch(query)
      .then((weather) => {
        return weather.json();
      })
      .then(displayResult);
  } catch (error) {
    alert(`Bir hata oluştu: ${error.message}`);
  }
};

const convertTheKelvin = (kelvin) => {
  return `${Math.round(kelvin) - 273}°C`;
};

const convertTheMinMaxKelvin = (minKelvin, maxKelvin) => {
  return `${Math.round(minKelvin - 273)}°C  / ${Math.round(maxKelvin - 273)}°C`;
};

const displayResult = (result) => {
  let city = document.querySelector(".city");
  city.innerHTML = `${result.name},${result.sys.country}`;

  let temp = document.querySelector(".temp");
  temp.innerHTML = convertTheKelvin(result.main.temp);

  let desc = document.querySelector(".desc");
  desc.innerHTML = result.weather[0].description;

  let minmax = document.querySelector(".minmax");
  minmax.innerHTML = convertTheMinMaxKelvin(
    result.main.temp_min,
    result.main.temp_max
  );
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
