async function getWhether(location) {
  try {
    const response = await fetch(
      `https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/London,UK?unitGroup=metric`,
    );

    if (!response.ok) {
      throw new Error("whether data not found");
    }

    const whetherData = await response.json();

    console.log(whetherData);

    return whetherData;
  } catch (error) {
    console.error("error fetching whether:", error);
  }
}

getWhether("London")