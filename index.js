
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
import { get,set,getDatabase,child,update,remove } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-database.js";

const firebaseConfig = {
    apiKey: "AIzaSyAG3yXXSSjtwxCa6RPQbIjlQU51ICGZCMQ",
    authDomain: "sensor-data-26db9.firebaseapp.com",
    databaseURL: "https://sensor-data-26db9-default-rtdb.firebaseio.com",
    projectId: "sensor-data-26db9",
    storageBucket: "sensor-data-26db9.appspot.com",
    messagingSenderId: "496098473150",
    appId: "1:496098473150:web:e43ef5bfbda1b9fdf41aef",
    measurementId: "G-N59W2KD3JV"
  };

  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  function writeWeatherData(weatherDescription) {
    const db = getDatabase();
    // Define the path where you want to store weather data in the database
    const weatherDataRef = ref(db, 'weatherData');
  
    // Set the weather data under the 'weatherData' path
    set(weatherDataRef, {
      weather_condition: weatherDescription
    }).then(() => {
      console.log("Weather data added successfully");
    }).catch((error) => {
      console.error("Error adding weather data:", error);
    });
  }
  
  // You can call this function with the weather description as an argument
  // Example usage:
   const weatherDescription = document.getElementById("description"); // Replace with actual weather description
  writeWeatherData(weatherDescription);
  




























function convertToCelsius(val) {
    return (val - 273.15).toFixed(2);
}

function fetchWeatherData(latitude, longitude) {
    const apiKey = '9953b82537121b01a972ccb2debd9d75'; 
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}`;

    fetch(apiUrl)
        .then(res => res.json())
        .then(data => {
            const cityName = data.name;
            const weatherDescription = data.weather[0].description;
            const temperatureKelvin = data.main.temp;
            const windSpeed = data.wind.speed;

            const temperatureCelsius = convertToCelsius(temperatureKelvin);

            
            document.getElementById('cityoutput').textContent = `Weather in ${cityName}`;
            document.getElementById('description').textContent = `Description: ${weatherDescription}`;
            document.getElementById('temp').textContent = `Temperature: ${temperatureCelsius} °C`;
            document.getElementById('wind').textContent = `Wind Speed: ${windSpeed} m/s`;
        })
        .catch(err => console.error('Error fetching weather data:', err));
}


window.addEventListener('load', function() {
    
    if ("geolocation" in navigator) {
        navigator.geolocation.getCurrentPosition(function(position) {
            const latitude = position.coords.latitude;
            const longitude = position.coords.longitude;

            
            fetchWeatherData(latitude, longitude);
        });
    } else {
        
        fetchWeatherData('chennai'); 
    }
});