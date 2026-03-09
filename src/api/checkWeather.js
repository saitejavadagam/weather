const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

async function checkWeather(city){
   const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);

        if(!response.ok){
            throw new Error(`Status ${response.status}: City not found`);
        }

        const data = await response.json();
        return {
            name:data.name,
            temperature:Math.round(data.main.temp),
            humidity:data.main.humidity,
            wind_speed:data.wind.speed,
            type:data.weather[0].main
        };
    }
    catch (error){
        console.error("Fetch Error:", error.message);
        return null;
    }
}

export default checkWeather;