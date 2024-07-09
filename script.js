const apiKey = 'db99d073efmsh3b2c939c521766bp100e54jsn0453a0832f4d';
const apiUrl = 'https://weatherapi-com.p.rapidapi.com/current.json';

const weatherForm = document.getElementById('weatherForm');
const locationInput = document.getElementById('locationInput');
const weatherInfo = document.getElementById('weatherInfo');

weatherForm.addEventListener('submit', function(event) {
    event.preventDefault();

    const location = locationInput.value.trim();
    if (location === '') {
        displayError('Please enter a location.');
        return;
    }

    fetchWeatherData(location);
});

async function fetchWeatherData(location) {
    const options = {
        method: 'GET',
        headers: {
            'x-rapidapi-key': apiKey,
            'x-rapidapi-host': 'weatherapi-com.p.rapidapi.com'
        }
    };

    try {
        const response = await fetch(`${apiUrl}?q=${location}`, options);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const weatherData = await response.json();
        displayWeather(weatherData);
    } catch (error) {
        console.error('Error fetching weather data:', error);
        displayError('Failed to fetch weather data. Please try again.');
    }
}

function displayWeather(weatherData) {
    const { location, current } = weatherData;

    const weatherInfoHtml = `
        <h2>${location.name}, ${location.country}</h2>
        <p>Current Weather: ${current.condition.text}</p>
        <p>Temperature: ${current.temp_c} &deg;C</p>
        <p>Humidity: ${current.humidity}%</p>
    `;

    weatherInfo.innerHTML = weatherInfoHtml;
}

function displayError(message) {
    weatherInfo.innerHTML = `<p>${message}</p>`;
}