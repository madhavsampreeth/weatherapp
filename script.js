const API_KEY = '60ec8351f5f815609e0b0cbd998bc5a1';

async function searchWeather() {
    const city = document.getElementById('cityInput').value;
    const weatherDisplay = document.getElementById('weatherDisplay');
    
    if (!city) {
        weatherDisplay.innerHTML = '<div class="error">Please enter a city name</div>';
        return;
    }

    weatherDisplay.innerHTML = '<div class="loading">Searching weather data...</div>';

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );
        
        if (!response.ok) {
            throw new Error('City not found');
        }
        
        const data = await response.json();
        
        const weatherIcons = {
            'Clear': '☀️',
            'Clouds': '☁️',
            'Rain': '🌧️',
            'Drizzle': '🌦️',
            'Thunderstorm': '⛈️',
            'Snow': '❄️',
            'Mist': '🌫️',
            'Smoke': '💨',
            'Haze': '🌫️',
            'Fog': '🌫️'
        };
        
        const icon = weatherIcons[data.weather[0].main] || '🌤️';
        
        weatherDisplay.innerHTML = `
            <div class="weather-info">
                <div class="location-temp">
                    <div class="city-name">${data.name}, ${data.sys.country}</div>
                    <div class="temperature">${Math.round(data.main.temp)}°C</div>
                </div>
                <div class="condition">
                    <div class="weather-icon">${icon}</div>
                    <div class="condition-text">${data.weather[0].description}</div>
                </div>
            </div>
            
            <div class="weather-details">
                <div class="detail-card">
                    <div class="detail-label">Humidity</div>
                    <div class="detail-value">${data.main.humidity}<span class="detail-unit">%</span></div>
                </div>
                <div class="detail-card">
                    <div class="detail-label">Wind</div>
                    <div class="detail-value">${data.wind.speed.toFixed(2)}<span class="detail-unit">m/s</span></div>
                </div>
                <div class="detail-card">
                    <div class="detail-label">Pressure</div>
                    <div class="detail-value">${data.main.pressure}<span class="detail-unit">hPa</span></div>
                </div>
            </div>
        `;
    } catch (error) {
        weatherDisplay.innerHTML = `<div class="error">City not found. Please try again.</div>`;
    }
}
