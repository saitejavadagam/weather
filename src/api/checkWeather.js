const apiKey = import.meta.env.VITE_WEATHER_API_KEY;

async function checkWeather(city){

    const now = Date.now();
    const lastFetch = localStorage.getItem(`lastFetch_${city}`);
    const CACHE_DURATION = 2*60*1000;

    if(lastFetch && ((now - parseInt(lastFetch)) < CACHE_DURATION)){
        console.warn("Rate Limit: using cached data to save API calls.");
        return JSON.parse(localStorage.getItem(`data_${city}`));
    }


   const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&units=metric&appid=${apiKey}`;
    try {
        const response = await fetch(url);

        if (response.status === 429) {
            alert("You've reached the daily limit. Try again later!");
            return null;
        }

        if(!response.ok){
            throw new Error(`Status ${response.status}: City not found`);
        }

        const data = await response.json();
        const weatherData = {
            name:data.name,
            temperature:Math.round(data.main.temp),
            humidity:data.main.humidity,
            wind_speed:data.wind.speed,
            type:data.weather[0].main
        };

        localStorage.setItem(`lastFetch_${city}`, now);
        localStorage.setItem(`data_${city}`, JSON.stringify(weatherData));

        return weatherData;
    }
    catch (error){
        console.error("Fetch Error:", error.message);
        return null;
    }
}

export default checkWeather;