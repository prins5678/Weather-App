async function getWeather() {
  const location = document.getElementById('locationInput').value.trim();
  const resultDiv = document.getElementById('weatherResult');

  if (!location) {
    resultDiv.innerHTML = 'Please enter a location.';
    return;
  }

  const apiKey = '59fa2c327fff4bba99760240253107';
  const  url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${location}&aqi=yes`;

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Location not found');
    const data = await response.json();

    const tempC = data.current.temp_c;
    const condition = data.current.condition.text;
    const icon = data.current.condition.icon;

    resultDiv.innerHTML = `
      <h2>${data.location.name}, ${data.location.country}</h2>
      <img src="https:${icon}" alt="weather icon" />
      <p>Temperature: ${tempC}°C</p>
      <p>Condition: ${condition}</p>
    `;
  } catch (error) {
    resultDiv.innerHTML = 'Error fetching weather data. Try a different location.';
  }
}
document.getElementById("getWeatherBtn").addEventListener("click", getWeather);

