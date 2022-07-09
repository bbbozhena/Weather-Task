"use strict";

const city = document.getElementById("city");
const dateEl = document.getElementById("date");
const tempEl = document.getElementById("temp");
const weatherEl = document.getElementById("weather");
const weatherItem = document.querySelector("weather-info");
const weatherIcon = document.getElementById("weather-icon");
const windNum = document.getElementById("wind-num");
const humNum = document.getElementById("hum-num");
const hourlyTempOne = document.getElementById("hourly-temp-one");
const hourlyIconOne = document.getElementById("hourly-icon-one");
const hourlyTimeOne = document.getElementById("hourly-time-one");
const hourlyTempTwo = document.getElementById("hourly-temp-two");
const hourlyIconTwo = document.getElementById("hourly-icon-two");
const hourlyTimeTwo = document.getElementById("hourly-time-two");
const hourlyTempThree = document.getElementById("hourly-temp-three");
const hourlyIconThree = document.getElementById("hourly-icon-three");
const hourlyTimeThree = document.getElementById("hourly-time-three");

const hourlyTempFour = document.getElementById("hourly-temp-four");
const hourlyIconFour = document.getElementById("hourly-icon-four");
const hourlyTimeFour = document.getElementById("hourly-time-four");

const hourlyTempFive = document.getElementById("hourly-temp-five");
const hourlyIconFive = document.getElementById("hourly-icon-five");
const hourlyTimeFive = document.getElementById("hourly-time-five");

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

      if (hourlyTempOne) {
        hourlyTempOne.innerHTML = Math.floor(data.hourly[1]["temp"]) + "°";
      }

      if (hourlyIconOne) {
        hourlyIconOne.innerHTML = data.hourly[1]["weather"][0]["icon"];
      }
      hourlyIconOne.innerHTML = `
      <img src=' http://openweathermap.org/img/wn/${icon}@2x.png'>
      `;

      if (hourlyTimeOne) {
        hourlyTimeOne.innerHTML = time.getHours() + 1;
      }

      if (hourlyTempTwo) {
        hourlyTempTwo.innerHTML = Math.floor(data.hourly[2]["temp"]) + "°";
      }
      if (hourlyIconTwo) {
        hourlyIconTwo.innerHTML = data.hourly[2]["weather"][0]["icon"];
      }
      hourlyIconTwo.innerHTML = `
      <img src=' http://openweathermap.org/img/wn/${icon}@2x.png'>
      `;
      if (hourlyTimeTwo) {
        hourlyTimeTwo.innerHTML = time.getHours() + 2;
      }

      if (hourlyTempThree) {
        hourlyTempThree.innerHTML = Math.floor(data.hourly[2]["temp"]) + "°";
      }
      if (hourlyIconThree) {
        hourlyIconThree.innerHTML = data.hourly[2]["weather"][0]["icon"];
      }
      hourlyIconThree.innerHTML = `
      <img src=' http://openweathermap.org/img/wn/${icon}@2x.png'>
      `;
      if (hourlyTimeThree) {
        hourlyTimeThree.innerHTML = time.getHours() + 3;
      }

      if (hourlyTempFour) {
        hourlyTempFour.innerHTML = Math.floor(data.hourly[2]["temp"]) + "°";
      }
      if (hourlyIconFour) {
        hourlyIconFour.innerHTML = data.hourly[2]["weather"][0]["icon"];
      }
      hourlyIconFour.innerHTML = `
      <img src=' http://openweathermap.org/img/wn/${icon}@2x.png'>
      `;
      if (hourlyTimeFour) {
        hourlyTimeFour.innerHTML = time.getHours() + 4;
      }

      if (hourlyTempFive) {
        hourlyTempFive.innerHTML = Math.floor(data.hourly[2]["temp"]) + "°";
      }
      if (hourlyIconFive) {
        hourlyIconFive.innerHTML = data.hourly[2]["weather"][0]["icon"];
      }
      hourlyIconFive.innerHTML = `
      <img src=' http://openweathermap.org/img/wn/${icon}@2x.png'>
      `;
      if (hourlyTimeFive) {
        hourlyTimeFive.innerHTML = time.getHours() + 5;
      }
    });
}
