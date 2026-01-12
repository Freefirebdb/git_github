const cityInput = document.querySelector('.city');
const btn = document.querySelector('.btn');

const card = document.querySelector('.card');
const cityNameEl = document.querySelector('.city-name');
const tempEl = document.querySelector('.temp');
const conditionEl = document.querySelector('.condition');
const humidityEl = document.querySelector('.humidity');
const windEl = document.querySelector('.wind');
const iconEl = document.querySelector('.icon');

const apikey = "cd6a4a0739a2b1802de49804971c6848";

btn.addEventListener('click', () => {
    const city = cityInput.value.trim();
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    const geoUrl = `https://api.openweathermap.org/geo/1.0/direct?q=${city}&limit=1&appid=${apikey}`;
    const geoRes = await fetch(geoUrl);
    const geoData = await geoRes.json();

    if (!geoData.length) {
        alert("City not found!");
        return;
    }

    const { lat, lon, name } = geoData[0];

    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apikey}`;
    const res = await fetch(weatherUrl);
    const data = await res.json();

    updateUI(data, name);
}

function updateUI(data, name) {
    card.classList.remove('hidden');

    cityNameEl.innerText = name.toUpperCase();
    tempEl.innerText = (data.main.feels_like - 273.15).toFixed(1) + "°C";
    conditionEl.innerText = data.weather[0].description;
    humidityEl.innerText = data.main.humidity + "%";
    windEl.innerText = data.wind.speed + " km/h";

    iconEl.src = `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
}
