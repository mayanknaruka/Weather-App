
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

    console.log(processedData);

    return processedData;
  } catch (error) {
    console.error("Error fetching weather:", error);
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

getWhether("London, UK");
