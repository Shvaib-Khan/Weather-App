const form = document.getElementById("weatherForm");
const cityInput = document.getElementById("cityInput");

const weatherInfo = document.getElementById("weatherInfo");
const cityName = document.getElementById("cityName");
const temp = document.getElementById("temp");
const condition = document.getElementById("condition");
const humidity = document.getElementById("humidity");
const wind = document.getElementById("wind");
const error = document.getElementById("error");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  if (!city) return;

  
  const url = `http://api.weatherapi.com/v1/current.json?key=f6169968c2654562b1d124432250308&q=${city}&aqi=yes`;

  try {
    const res = await fetch(url);
    const data = await res.json();

    if (data.error) throw new Error(data.error.message);

    // Update UI
    cityName.textContent = `${data.location.name}, ${data.location.region}`;
    temp.textContent = data.current.temp_c;
    condition.textContent = data.current.condition.text;
    humidity.textContent = data.current.humidity;
    wind.textContent = data.current.wind_kph;

    error.classList.add("hidden");
    weatherInfo.classList.remove("hidden");
  } catch (err) {
    weatherInfo.classList.add("hidden");
    error.classList.remove("hidden");
  }

  cityInput.value = "";
});
