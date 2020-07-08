function showWeather(response) {
  let city = document.querySelector("#maincity");
  let temperature = Math.round(response.data.main.temp);
  let tempe = document.querySelector("#tempe");
  let tempMax = document.querySelector("#temp-max");
  let tempMin = document.querySelector("#temp-min");
  let iconElement = document.querySelector("#main-icon");
  let searchLat = `${response.data.coord.lat}`;
  let searchLon = `${response.data.coord.lon}`;
  city.innerHTML = `${response.data.name}`;
  tempe.innerHTML = `${temperature}`;
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  tempMax.innerHTML = `${Math.round(response.data.main.temp_max)}ºC`;
  tempMin.innerHTML = `${Math.round(response.data.main.temp_min)}ºC`;

  function showGeo(response) {
    let forecastElement = document.querySelector("#teste-week");
    forecastElement.innerHTML = null;
    let forecast = null;

    for (let i = 0; i < 6; i++) {
      forecast = response.data.daily[i];
      console.log(forecast);
      let nextday = i + 1;
      let dayTeste = new Date(response.data.daily[nextday].dt * 1000);
      let daysTeste = [
        "Sunday",
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
      ];
      let realToday = daysTeste[dayTeste.getDay()];
      let dailyMax = Math.round(response.data.daily[nextday].temp.max);
      let dailyMin = Math.round(response.data.daily[nextday].temp.min);
      let dailyIcon = response.data.daily[nextday].weather[0].icon;
      console.log(dailyIcon);
      forecastElement.innerHTML += `
      <tbody>
         <tr class="tablelines">
           <td>${realToday}</td>
           <td>${dailyMax}ºC/${dailyMin}ºC</td>
           <td><img src = \http://openweathermap.org/img/wn/${dailyIcon}@2x.png\ width= 30px></td>
           </tr>
            </tbody>

     `;
    }
  }
  let geoApiKey = "013862d923ab37409ff3bafb37939a3d";
  let geoUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${searchLat}&lon=${searchLon}&exclude=current,minutely,hourly&units=metric&appid=${geoApiKey}`;

  axios.get(geoUrl).then(showGeo);
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

function searchCity(city) {
  let apiKey = "013862d923ab37409ff3bafb37939a3d";
  let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;

  axios.get(url).then(showWeather);
}
searchCity("Lisbon");
function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#search");
  searchCity(city.value);
}

let mainCity = document.querySelector("form");
mainCity.addEventListener("submit", handleSubmit);

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
