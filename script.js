let currentTempCelsius = null; // To store the current temperature in Celsius
let currentTempFahrenheit = null; // To store the current temperature in Fahrenheit

async function getWeather() {
    const city = document.getElementById('city').value.trim();
    const weatherInfoDiv = document.getElementById('weather-info');
    const apiKey = 'ca68c62f2ab574db8f54724c7039abda';
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    if (city === "") {
        weatherInfoDiv.innerHTML = `<p class="error">Please enter a city name.</p>`;
        return;
    }

    try {
        // Show loading message
        weatherInfoDiv.innerHTML = `<p>Loading weather data...</p>`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error('City not found');
        }

        const data = await response.json();

        // Convert OpenWeather description to "Sunny" if it's "clear sky"
        let weatherDescription = data.weather[0].description;
        if (weatherDescription.toLowerCase() === "clear sky") {
            weatherDescription = "Sunny";
        }

        // Store the current temperatures
        currentTempCelsius = data.main.temp;
        currentTempFahrenheit = (currentTempCelsius * 9/5) + 32;

        const weatherInfo = `
            <h3>${data.name}, ${data.sys.country}</h3>
            <p>Temperature: <span id="temp">${currentTempCelsius}°C</span></p>
            <p>Humidity: ${data.main.humidity}%</p>
            <p>Wind Speed: ${data.wind.speed} m/s</p>
            <p>${weatherDescription}</p>
            <img class="weather-icon" src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="Weather icon">
            <button onclick="toggleTemperature()">Toggle °C/°F</button>
        `;
        weatherInfoDiv.innerHTML = weatherInfo;

    } catch (error) {
        weatherInfoDiv.innerHTML = `<p class="error">${error.message}</p>`;
    }
}

function toggleTemperature() {
    const tempElement = document.getElementById('temp');
    
    // Toggle between Celsius and Fahrenheit
    if (tempElement.innerText.includes('°C')) {
        tempElement.innerText = `${currentTempFahrenheit.toFixed(1)}°F`;
    } else {
        tempElement.innerText = `${currentTempCelsius.toFixed(1)}°C`;
    }
}
