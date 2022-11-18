let apiKey = 'f9045589f9bcbeef853eb7e06f209ddb';
let input = document.getElementById('input');
let submit = document.getElementById('submit');
let cityList = document.getElementById('cityList');
let history = [];

let today = document.getElementById('today');
let currentCity = document.getElementById('currentCity');
let currentTemp = document.getElementById('currentTemp');
let currentFeel = document.getElementById('currentFeel');
let currentUvi = document.getElementById('currentUvi');
let currentWind = document.getElementById('currentWind');
let currentHum = document.getElementById('currentHum');

let week = document.getElementById('week');
let card = document.querySelectorAll('card')
let dailyTemp = document.querySelectorAll('#dailyTemp');
let dailyFeel = document.querySelectorAll('#dailyFeel');
let dailyUvi = document.querySelectorAll('#dailyUvi');
let dailyWind = document.querySelectorAll('#dailyWind');
let dailyHum = document.querySelectorAll('#dailyHum');


// searchHistory()
function searchHistory() {
    let cityName = input.value;
    if (history == null) history = null
    cityList.innerHTML = '';
    console.log(history)
    history.push(cityName)
    for (let i = 0; i < history.length; i++) {    
        let listItem = document.createElement('button');
        listItem.setAttribute('id', 'city');
        listItem.textContent = history[i].toUpperCase();   
        cityList.append(listItem);
        let test = document.querySelectorAll('#city')
        test.forEach((item) => {
            item.addEventListener('click', buttonClick)
            console.log(item)
        })
    }
}


function buttonClick(e) {
    let button = e.target.innerHTML
    console.log(button)
    getCords(button)
}

function getCords(button) {
    let cityName;
    if (button) {
        cityName = button
    } else {
        cityName = input.value.toUpperCase()
    }
    fetch('http://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=5&appid=' + apiKey)
        .then(response => response.json())
        .then(data => {
            let lat = data[0].lat
            let long = data[0].lon
            currentCity.textContent = cityName
            getWeather(lat, long)
        })
}



function getWeather(lat, long) {
    fetch('https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + long + '&units=imperial&appid=' + apiKey)
        .then(response => response.json())
        .then((data) => {
            console.log(data)
            postWeather(data)
            
        })
}

function postWeather(data) {
    // displays todays weather
    let today = data.current;
    let todayTemp = today.temp;
    currentTemp.textContent = 'Temperature: ' + todayTemp + ' degrees';
    let todayFeel = today.feels_like;
    currentFeel.textContent = 'Feels Like: ' + todayFeel + ' degrees';
    let todayHum = today.humidity;
    currentHum.textContent = 'Humidity: ' + todayHum + ' degrees';
    let todayUvi = today.uvi;
    currentUvi.textContent = 'UVI: ' + todayUvi;
    let todayWind = today.wind_speed;
    currentWind.textContent = 'Wind Speed: ' + todayWind + ' mph';


    let temp = []
    let feel = []
    let hum = []
    let uvi = []
    let wind = []
    // weather for the week
    let daily = data.daily
    for (let i = 1; i < 5; i++) {
        temp.push(daily[i].temp.day)
        feel.push(daily[i].feels_like.day)
        hum.push(daily[i].humidity)
        uvi.push(daily[i].uvi)
        wind.push(daily[i].wind_speed)

        //loops to fill in the html
        dailyTemp.forEach((element) => {
            element.textContent = 'Temp: ' + temp++ + ' degrees'
        });
        dailyFeel.forEach((element) => {
            element.textContent = 'Feels like: ' + feel++ + ' degrees'
        });
        dailyHum.forEach((element) => {
            element.textContent = 'Humidity: ' + hum++ + '%'
        });
        dailyUvi.forEach((element) => {
            element.textContent = 'UVIndex: ' + uvi++
        });
        dailyWind.forEach((element) => {
            element.textContent = 'Wind Speed: ' + wind++ + ' mph'
        });
    }
}


submit.onclick = () => {
    getCords()
    searchHistory()
}


// let cityName = input.value
//     let history = JSON.parse(localStorage.getItem('history'))
//     if (history == null) {
//         history = []
//     } else if (history !== null) {
//         for(let i = 0; i < history.length; i ++) {
//             if (history[i] == cityName) {
//                 return null
//             }
//         }  
//     } 
//         history.push(cityName)
//         localStorage.setItem('history', JSON.stringify(history))
//         searchHistory()

// let history = JSON.parse(localStorage.getItem('history'))
//     if (history == null) history = []
//     for (let i = 0; i < history.length; i++) {
//         let city = history[i]
//         let searches = document.createElement('button')
//         searches.textContent = city
//         searches.setAttribute('id', 'cities') 
//         cityList.append(searches)
//     }