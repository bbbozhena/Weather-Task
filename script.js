"use strict";

const city = document.getElementById("city");
const dateEl = document.getElementById("date");
const tempEl = document.getElementById("temp");
const weatherEl = document.getElementById("weather");
const weatherItem = document.querySelector("weather-info");
const weatherIcon = document.getElementById("weather-icon");
const windNum = document.getElementById("wind-num");
const humNum = document.getElementById("hum-num");
const todayDate = document.getElementById("today-date-num");
const hourlyTemp = [...document.getElementsByClassName("hourly-temp")];
const hourlyIcon = [...document.getElementsByClassName("hourly-icon")];
const hourlyTime = [...document.getElementsByClassName("hourly-time")];
const dailyDate = [...document.getElementsByClassName("daily-date")];
const dailyIcon = [...document.getElementsByClassName("daily-icon")];
const dailyTemp = [...document.getElementsByClassName("daily-temp")];

const API_KEY = "734dfb31bce7daf473e8a526d99d3812";

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

const time = new Date();
const month = time.getMonth();
const date = time.getDate();
const day = time.getDay();

dateEl.innerHTML = days[day] + ", " + date + " " + months[month];
todayDate.innerHTML = date + " " + months[month];

function success(pos) {
  let crd = pos.coords;

  getWeather(crd.latitude, crd.longitude);
}

function error(err) {
  getWeather(51.509865, -0.118092);
}

navigator.geolocation.getCurrentPosition(success, error);

function getWeather(latitude, longitude) {
  fetch(
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${API_KEY}&units=metric`
  )
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      showWeather(data);
    });
}

function showWeather(data) {
  if (city) {
    city.innerHTML = data.timezone;
  }
  if (tempEl) {
    tempEl.innerHTML = Math.floor(data.current.temp) + "°";
  }
  if (weatherEl) {
    weatherEl.innerHTML = data.current["weather"][0]["main"];
  }
  if (windNum) {
    windNum.innerHTML = Math.floor(data.current["wind_speed"]) + " km/h";
  }
  if (humNum) {
    humNum.innerHTML = data.current["humidity"] + " %";
  }
  let icon = (weatherIcon.innerHTML = data.current["weather"][0]["icon"]);

  weatherIcon.innerHTML = `
  <img src=' http://openweathermap.org/img/wn/${icon}@2x.png'>
  `;

  [...document.getElementsByClassName("hourly-block")].forEach(
    (element, index, array) => {
      data.hourly.slice(1, 6).map((hourlyData, index) => {
        hourlyTemp[index].innerHTML = Math.floor(hourlyData.temp) + "°";
      });
      data.hourly.slice(1, 6).map((iconData, index) => {
        hourlyIcon[index].innerHTML = iconData.icon;
        hourlyIcon[index].innerHTML = `
        <img src= 'http://openweathermap.org/img/wn/${icon}@2x.png'>
        `;
      });

      data.hourly.slice(1, 6).map((timeData, index) => {
        let timeForecast = (hourlyTime[index].innerHTML = window
          .moment(timeData.dt * 1000)
          .format("H"));
      });
    }
  );

  [...document.getElementsByClassName("daily-block")].forEach(
    (element, index, array) => {
      data.daily.slice(1, 7).map((dailyData, index) => {
        dailyDate[index].innerHTML = window
          .moment(dailyData.dt * 1000)
          .format("MMM, D");
      });
      data.daily.slice(1, 7).map((iconDailyData, index) => {
        dailyIcon[index].innerHTML = iconDailyData.icon;
        dailyIcon[index].innerHTML = `
        <img src= 'http://openweathermap.org/img/wn/${icon}@2x.png'>
        `;
      });
      data.daily.slice(1, 7).map((tempDailyData, index) => {
        dailyTemp[index].innerHTML = Math.floor(tempDailyData.temp.day) + "°";
      });
    }
  );
}
