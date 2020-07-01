function showWeather(response) {
  let city = document.querySelector("#maincity");
  let temperature = Math.round(response.data.main.temp);
  let tempe = document.querySelector("#tempe");
  let tempMax = document.querySelector("#temp-max");
  let tempMin = document.querySelector("#temp-min");
  let iconElement = document.querySelector("#main-icon");
  city.innerHTML = `${response.data.name}`;
  tempe.innerHTML = `${temperature}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  tempMax.innerHTML = `${Math.round(response.data.main.temp_max)}ºC`;
  tempMin.innerHTML = `${Math.round(response.data.main.temp_min)}ºC`;
}

function retrievePosition(position) {
  let apiKey = "013862d923ab37409ff3bafb37939a3d";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let url = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  axios.get(url).then(showWeather);
}
function CurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(retrievePosition);
}

let button = document.querySelector("#currentlocation");
button.addEventListener("click", CurrentLocation);

function searchcity(event) {
  let inputcity = document.querySelector("#search");
  let city = document.querySelector("#maincity");
  let cityResult = (city.innerHTML = `${search.value}`);
  event.preventDefault();
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${cityResult}&units=metric&appid=${apiKey}`;

  axios.get(url).then(showWeather);
}

let mainCity = document.querySelector("form");
mainCity.addEventListener("submit", searchcity);

let now = new Date();

let days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
let today = days[now.getDay()];

let hour = now.getHours();

let minutes = now.getMinutes();

let dayHour = document.querySelector("#dayhour");
dayHour.innerHTML = `${today} - ${hour}:${minutes}H`;
