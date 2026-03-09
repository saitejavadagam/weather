import { useState } from 'react';
import { Search, Wind, Droplets } from 'lucide-react';
import checkWeather from '../api/checkWeather'
import getWeatherBackground from "../api/getWeatherBackground"
import getWeatherIcon from './getWeatherIcon';


const WeatherCard = () => {
    const [city, setCity] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const handleSearch = async () => {

        if (!city.trim()) return;

        const cityName = city.toLowerCase();

        const cachedData = sessionStorage.getItem(cityName);
        const cacheTimestamp = sessionStorage.getItem(cityName + "_time");

        if (cachedData && cacheTimestamp && Date.now() - cacheTimestamp < 600000) {
            setWeatherData(JSON.parse(cachedData));
            return;
        }

        setLoading(true);
        setError(false);

        const data = await checkWeather(city);

        if (data) {
            setWeatherData(data);
            sessionStorage.setItem(city.toLowerCase(), JSON.stringify(data));
            sessionStorage.setItem(`${city.toLowerCase()}_time`, Date.now());
        } else {
            setError(true);
            setWeatherData(null);
        }



        setTimeout(() => setLoading(false), 2000);

    };

    const handleKeyDown = (e) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };

    return (
        <div
            className="min-h-screen
            w-full bg-cover
            bg-no-repeat
            flex
            items-center
            justify-center
            transition-all duration-1000 ease-in-out
           "
            style={{ backgroundImage: `url(${getWeatherBackground(weatherData ? weatherData.type : "")})` }}
        >

            <div className="
            w-[90%] max-w-120 min-w-90
            md:min-w-100
            bg-black/15 backdrop-blur-[20px] 
            text-white -mt-25 mx-auto 
            px-7 py-10 text-center 
            rounded-[20px] shadow-[10px_10px_20px_rgba(0,0,0,0.2)]
            transition-all duration-300
            text-shadow-2xs
        ">

                {/* Search Section */}
                <div className="flex items-center justify-between gap-4">
                    <input
                        type="text"
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                        className="flex-1 h-12.5 rounded-[30px] bg-[#ebfffc] px-6 text-4.5 text-[#555] outline-none border-none"
                        placeholder="Enter city name"
                        spellCheck="false"
                        onKeyDown={handleKeyDown}
                    />
                    <button
                        disabled={loading}
                        onClick={handleSearch}
                        className={`w-12.5 h-12.5 rounded-full bg-[#ebfffc] flex items-center justify-center cursor-pointer hover:bg-white transition-colors ${loading ? 'opacity-50 cursor-not-allowed' : ''}`}
                    >
                        <Search className="text-[#555] w-5 h-5"
                            onClick={handleSearch}
                        />
                    </button>
                </div>

                {/* Weather Info Section (Visible when data exists) */}
                {weatherData && !error && (
                    <div>
                        <div className="mt-8">
                            {getWeatherIcon(weatherData.type)}
                            <h1 className="text-[64px] font-medium leading-tight">{weatherData.temperature} °C</h1>
                            <h2 className="text-[48px] font-normal -mt-2">{weatherData.name}</h2>
                        </div>

                        {/* Details Section */}
                        <div className="flex items-center justify-between px-5 mt-12.5">
                            {/* Humidity */}
                            <div className="flex items-center text-left">
                                <Droplets className="w-10 h-10 mr-3" />
                                <div>
                                    <p className="text-7 -mt-1 leading-tight">{weatherData.humidity} %</p>
                                    <p className="text-sm">Humidity</p>
                                </div>
                            </div>

                            {/* Wind Speed */}
                            <div className="flex items-center text-left">
                                <Wind className="w-10 h-10 mr-3" />
                                <div>
                                    <p className="text-7 -mt-1 leading-tight">{weatherData.wind_speed} km/h</p>
                                    <p className="text-sm">Wind Speed</p>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}


export default WeatherCard;