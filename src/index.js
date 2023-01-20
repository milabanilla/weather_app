let weather = {
  paris: {
    temp: 19.7,
    humidity: 80
  },
  tokyo: {
    temp: 17.3,
    humidity: 50
  },
  lisbon: {
    temp: 30.2,
    humidity: 20
  },
  "san francisco": {
    temp: 20.9,
    humidity: 100
  },
  oslo: {
    temp: -5,
    humidity: 20
  }
};

// write your code here
function updateHeading(newHeading) {
  let heading = document.querySelector("h4");
  heading.innerHTML = newHeading;
}
//Date function
let now = new Date();
function formatDate(date) {
  let months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sept",
    "Oct",
    "Nov",
    "Dec"
  ];
  let currentDate = date.getDate();
  let hour = date.getHours();
  let minute = date.getMinutes();
  minute = minute > 9 ? minute : "0" + minute;
  let month = months[date.getMonth()];
  let formattedDate = `${month} ${currentDate}, ${hour}:${minute}`;
  let currentDay = document.querySelector("#current_date");
  currentDay.innerHTML = formattedDate;
  return formattedDate;
}
formatDate(now);

function searchBar(event) {
  event.preventDefault();
  let changeCity = document.querySelector(".city");
  let citySearch = document.querySelector("#city-input");
  changeCity.innerHTML = citySearch.value;
  if (weather[citySearch] !== undefined) {
    let temp = Math.round(weather[citySearch].temp);
    //let humid = weather[citySearch].humidity;
    let celciusTemp = Math.round(temp);
    let fahrenheitTemp = Math.round((temp * 9) / 5 + 32);
    updateHeading(`${citySearch.toUpperCase()}`);
    let currentCelcius = document.querySelector("#celcius");
    currentCelcius.innerHTML = `${celciusTemp}`;
    let currentFahren = document.querySelector("#fahrenheit");
    currentFahren.innerHTML = `${fahrenheitTemp}`;
  }
}
function showWeather(response) {
  let temperatures = Math.round(response.data.main.temp);
  let displayTemp = document.querySelector(".current_temp");
  displayTemp.innerHTML = `${temperatures} `;
  let changeCity = document.querySelector(".city");
  changeCity.innerHTML = response.data.name;
}

function searchCity(event) {
  event.preventDefault();
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let city = document.querySelector("#city-input").value;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function currentPosition(position) {
  let apiKey = "2513f3c728b1b5ff4f4347e1a6af22b8";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=metric&appid=${apiKey}`;
  let showCurrentPosition = document.querySelector("#latitude-longtitude");
  showCurrentPosition.innerHTML = `Latitude: ${lat} Longtitude:${lon}`;
  axios.get(apiUrl).then(showWeather);
}

function showGeoLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentPosition);
}
let currentLocate = document.querySelector("#currentBtn");
currentLocate.addEventListener("click", showGeoLocation);

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", searchCity);

console.log(searchBar);
