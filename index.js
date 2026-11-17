
let isCelsius = true;
let currentWeather = null;

async function getWhether(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${encodeURIComponent(location)}?unitGroup=metric&contentType=json`
    );

    if (!response.ok) {
      throw new Error("Weather data not found");
    }

    const whetherData = await response.json();

    const processedData = processWeatherData(whetherData);

    return processedData;
  } catch (error) {
    console.error("Error fetching weather:", error);
    alert("Unable to find weather data. Please check the city name.");
  }
}

function processWeatherData(weatherData) {
  const requiredData = {
    city: weatherData.resolvedAddress,
    temperature: weatherData.currentConditions.temp,
    feelsLike: weatherData.currentConditions.feelslike,
    humidity: weatherData.currentConditions.humidity,
    conditions: weatherData.currentConditions.conditions,
    icon: weatherData.currentConditions.icon,
    windSpeed: weatherData.currentConditions.windspeed,
    description: weatherData.description,
  };

  return requiredData;
}

function displayWeather(data) {
  const temperature = isCelsius
    ? data.temperature
    : (data.temperature * 9) / 5 + 32;

  const feelsLike = isCelsius
    ? data.feelsLike
    : (data.feelsLike * 9) / 5 + 32;

  document.querySelector("#city").textContent = data.city;

  document.querySelector("#temperature").textContent =
    `${temperature.toFixed(1)} °${isCelsius ? "C" : "F"}`;

  document.querySelector("#conditions").textContent = data.conditions;

  document.querySelector("#feels-like").textContent =
    feelsLike.toFixed(1);

  document.querySelector("#humidity").textContent = data.humidity;

  document.querySelector("#wind-speed").textContent = data.windSpeed;

  document.querySelector("#description").textContent = data.description;

  document.querySelector("#toggle-temp").textContent =
    isCelsius ? "Show Fahrenheit" : "Show Celsius";
}

// Search button
document.querySelector("#search-btn").addEventListener("click", async () => {
  const location = document.querySelector("#city-input").value.trim();

  if (!location) {
    alert("Please enter a city name");
    return;
  }

  currentWeather = await getWhether(location);

  if (currentWeather) {
    displayWeather(currentWeather);
  }
});

// Temperature toggle
document.querySelector("#toggle-temp").addEventListener("click", () => {
  if (!currentWeather) return;

  isCelsius = !isCelsius;

  displayWeather(currentWeather);
});
