"use strict";

const city = document.getElementById("city");
const dateEl = document.getElementById("date");
const tempEl = document.getElementById("temp");
const weatherEl = document.getElementById("weather");
const weatherItem = document.querySelector("weather-info");
const weatherIcon = document.getElementById("weather-icon");
const windNum = document.getElementById("wind-num");
const humNum = document.getElementById("hum-num");

const arrayTemp = [
  document.getElementById("hourly-temp1"),
  document.getElementById("hourly-temp2"),
  document.getElementById("hourly-temp3"),
  document.getElementById("hourly-temp4"),
  document.getElementById("hourly-temp5"),
];
const arrayIcon = [
  document.getElementById("hourly-icon1"),
  document.getElementById("hourly-icon2"),
  document.getElementById("hourly-icon3"),
  document.getElementById("hourly-icon4"),
  document.getElementById("hourly-icon5"),
];

const arrayHour = [
  document.getElementById("hourly-time1"),
  document.getElementById("hourly-time2"),
  document.getElementById("hourly-time3"),
  document.getElementById("hourly-time4"),
  document.getElementById("hourly-time5"),
];

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
    `https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude={part}&appid=${API_KEY}`
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
    windNum.innerHTML = Math.floor(data.current["wind_speed"]) + "km/h";
  }
  if (humNum) {
    humNum.innerHTML = data.current["humidity"] + " %";
  }
  let icon = (weatherIcon.innerHTML = data.current["weather"][0]["icon"]);

  weatherIcon.innerHTML = `
  <img src=' http://openweathermap.org/img/wn/${icon}@2x.png'>
  `;

  data.hourly.slice(0, 5).map((hourlyData, index) => {
    arrayTemp[index].innerHTML = hourlyData.temp;
  });

  data.hourly.slice(0, 5).map((iconData, index) => {
    arrayIcon[index].innerHTML = iconData.icon;
    arrayIcon[index].innerHTML = `
  <img src= 'http://openweathermap.org/img/wn/${icon}@2x.png'>
  `;
  });

  data.hourly.slice(0, 5).map((timeData, index) => {
    arrayHour[index].innerHTML = timeData.dt;
  });
}
