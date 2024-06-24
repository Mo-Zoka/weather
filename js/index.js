var weatherData = [];
var allData = document.getElementById("allData");
var today = "";
var city = "";
var searchInput = document.querySelector("#search_input");

getLocation();

searchInput.addEventListener('input', async function(){
    var result = await fetch(`https://api.weatherapi.com/v1/search.json?key=afbef66c5eb74ca5885120414242206&q=${searchInput.value}`);
    var finalResult = await result.json();
    city = finalResult[0].name;
    getWeather(city);
});

async function getWeather(city) {
  var result = await fetch(
    `https://api.weatherapi.com/v1/forecast.json?key=afbef66c5eb74ca5885120414242206&q=${city}&days=3`
  );
  var finalResult = await result.json();
  // console.log(finalResult);
  weatherData = finalResult;
  today = whatDay(weatherData.location.localtime);
  formattedDate = whatMonth(weatherData.location.localtime);
  day2 = whatDay(weatherData.forecast.forecastday[1].date);
  day3 = whatDay(weatherData.forecast.forecastday[2].date);
  display();
}

function whatDay(x) {
  var dateString = x;
  var dateObject = new Date(dateString);
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  var dayOfWeek = daysOfWeek[dateObject.getDay()];
  return dayOfWeek;
}

function whatMonth(x) {
  var dateString = x;
  var dateObject = new Date(dateString);

  var day = dateObject.getDate();
  var month = dateObject.getMonth();

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  var monthName = monthNames[month];
  const formattedDate = `${day} ${monthName}`;
  return formattedDate;
}

function display() {
  var box = "";
  box = `
    <div class="col-md-4">
                    <div class="d-flex justify-content-around py-2 border-bottom border-light">
                        <div>${today}</div>
                        <div>${formattedDate}</div>
                    </div>
                    <div class="py-md-4 d-flex flex-md-column justify-content-center align-items-center">
                        <h3 class="my-2 px-2">${weatherData.location.name}</h3>
                        <div class="d-flex justify-content-md-around align-items-center">
                            <h2 class="big-font my-md-4">${weatherData.current.temp_c}°C</h2>
                            <img src="https:${weatherData.current.condition.icon}" class="my-md-2 w-md-25 ms-3">
                        </div>
                        <div class="text-info my-md-2 px-2">${weatherData.current.condition.text}</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="d-flex justify-content-center py-2 border-bottom border-light"">
                        <div>${day2}</div>
                    </div>
                    <div class="d-flex flex-md-column align-items-center py-md-4">
                        <img src="https:${weatherData.forecast.forecastday[1].day.condition.icon}" class="my-2 w-25">
                        <h2 class="m-md-2 mx-2">${weatherData.forecast.forecastday[1].day.maxtemp_c}°C</h2>
                        <h4>${weatherData.forecast.forecastday[1].day.mintemp_c}°C</h4>
                        <div class="text-info m-md-2 mx-2">${weatherData.forecast.forecastday[1].day.condition.text}</div>
                    </div>
                </div>
                <div class="col-md-4">
                    <div class="d-flex justify-content-center py-2 border-bottom border-light"">
                        <div>${day3}</div>
                    </div>
                    <div class="d-flex flex-md-column align-items-center py-md-4">
                        <img src="https:${weatherData.forecast.forecastday[2].day.condition.icon}" class="my-2 w-25">
                        <h2 class="m-md-2 mx-2">${weatherData.forecast.forecastday[2].day.maxtemp_c}°C</h2>
                        <h4>${weatherData.forecast.forecastday[2].day.mintemp_c}°C</h4>
                        <div class="text-info m-md-2 mx-2">${weatherData.forecast.forecastday[2].day.condition.text}</div>
                    </div>
                </div>
    `;

  allData.innerHTML = box;
}

async function getLocation() {

  var result1 = await fetch("http://ip-api.com/json");
  var data = await result1.json();

  var result = await fetch(`http://ip-api.com/json/${data.query}`);
  var finalResult = await result.json();
  city = finalResult.city;
  getWeather(city);
}

