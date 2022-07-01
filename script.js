const city = document.getElementById ('city');
const dateEl = document.getElementById ('date');
const tempEl = document.getElementById ('temp');
const weatherEl = document.getElementById ('weather');
const weatherItem = document.querySelector ('weather-info');

const API_KEY = '734dfb31bce7daf473e8a526d99d3812';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];


setInterval (() => {
    const time = new Date ();
    const month = time.getMonth();
    const date =  time.getDate();
    const day = time.getDay();

    dateEl.innerHTML = days [day] + ', ' + date + ' ' + months[month];
}, 1000);


getResponse () 
async function getResponse () {
    navigator.geolocation.getCurrentPosition ((success) => {
        let {latitude, longitude} = success.coords;
        

       fetch(`https://api.openweathermap.org/data/2.5/onecall?lat=${latitude}&lon=${longitude}&exclude=hourly,minutely&units=metric&appid=${API_KEY}`)
       .then (res => res.json())
       .then (data => {
            console.log(data);
            city.innerHTML = data.timezone;
            tempEl.innerHTML = Math.floor (data.current.temp);
        });
       
    });
}


// function showWeatherItems (data) {
//     let {
//         temp
//     } = data.current;


// weatherItem.innerHTML = 
// `
// <div class="weather-item">
//         <div>temp</div>
//         <div>${temp}%</div>
//     </div>
// `;
// } 

