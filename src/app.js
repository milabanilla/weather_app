function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
      <div class="col-2">
        <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
        <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
        <div class="weather-forecast-temperatures">
          <span class="weather-forecast-temperature-max"> ${Math.round(forecastDay.temp.max)}° </span>
          <span class="weather-forecast-temperature-min">  ${Math.round(forecastDay.temp.min)}° </span>
        </div>
      </div>
  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let apiURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=imperial`;
  axios.get(apiURL).then(displayForecast);
}
function displayTemperature(response){
  let tempertaureElement = document.querySelector('#temperature');
  let cityElement = document.querySelector('#city');
  let descriptionElement = document.querySelector('#description');
  let humidityElement = document.querySelector('#humidity');
  let windElement = document.querySelector('#wind');
  let dateElement =document.querySelector('#date')
  let iconElement =document.querySelector('#icon')
  
  celciusTemperature = response.data.main.temp;
  tempertaureElement.innerHTML = Math.round(response.data.main.temp);
  cityElement.innerHTML = response.data.name;
  descriptionElement.innerHTML = response.data.weather[0].description;
  humidityElement.innerHTML = response.data.main.humidity;
  windElement.innerHTML = Math.round(response.data.wind.speed);
  dateElement.innerHTML = formatDate(response.data.dt * 1000)
  //to change icon src, use setAttribute('src' and then the link of img). 
  //Use response.data.weather[0].icon for 
  //it to change the icon depending on the weather
  iconElement.setAttribute('src', `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`)
  //to change the alt, use the same method
  iconElement.setAttribute('alt', response.data.weather[0].description)
  getForecast(response.data.coord)
}
function search(city){
  let apiKey= "0efb4fc16a9ed98dc0b3aafd8491d6ad"
  let apiUrl =`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayTemperature);
}

function handleSubmit(event){
  event.preventDefault();
  let cityInputElement= document.querySelector('#city-input')
  search(cityInputElement.value)    
}
function displayFahrenheitTemperature(event){
  event.preventDefault();
  let tempertaureElement = document.querySelector("#temperature")
  // remove the active class the celcius link
  celciusLink.classList.remove("active")
  // add the active class the celcius link
  fahrenheitLink.classList.add("active")
  let fahrenheitTemperature = (celciusTemperature  * 9 ) / 5 + 32
  tempertaureElement.innerHTML = Math.round(fahrenheitTemperature)
  
}
function displayCelciusTemperature(event){
  event.preventDefault();
  celciusLink.classList.add("active")
  fahrenheitLink.classList.remove("active")
  let temperatureElement= document.querySelector('#temperature');
  temperatureElement.innerHTML = Math.round(celciusTemperature);

}
function currentPosition(position) {
  let apiKey = "0efb4fc16a9ed98dc0b3aafd8491d6ad";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  let showCurrentPosition = document.querySelector("#city");
  axios.get(apiUrl).then(displayTemperature);
}

function showGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}

let currentLocate = document.querySelector("#currentBtn");
currentLocate.addEventListener("click", showGeoLocation);
 

let celciusTemperature = null;
let form = document.querySelector("#search-form")
form.addEventListener("submit",handleSubmit)

let fahrenheitLink = document.querySelector("#fahrenheit-link");
fahrenheitLink.addEventListener("click",displayFahrenheitTemperature)

let celciusLink = document.querySelector("#celcius-link")
celciusLink.addEventListener('click',displayCelciusTemperature);