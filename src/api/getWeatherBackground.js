import clearBg from '../assets/weather/clear.jpg'
import cloudsBg from '../assets/weather/clouds.jpg'
import rainBg from '../assets/weather/rain.jpg'
import drizzleBg from '../assets/weather/drizzle.jpg'
import snowBg from '../assets/weather/snow.jpg'
import thunderstormBg from '../assets/weather/thunderstorm.jpg'
import defaultBg from '../assets/weather/default.jpg'

const getWeatherBackground = (condition) => {
    switch (condition) {
        case 'Clear':
            return clearBg;
        case 'Clouds':
            return cloudsBg;
        case 'Rain':
            return rainBg;
        case 'Drizzle':
            return drizzleBg;
        case 'Snow':
            return snowBg;
        case 'Thunderstorm':
            return thunderstormBg;
        case 'Mist':
        case 'Smoke':
        case 'Haze':
        case 'Dust':
        case 'Fog':
        case 'Sand':
        case 'Ash':
            return "https://images.unsplash.com/photo-1543968996-ee822b8176ba?q=80&w=2070";
        case 'Squall':
        case 'Tornado':
            return "https://images.unsplash.com/photo-1527482797697-8795b05a13fe?q=80&w=2070";
        default:
            return defaultBg;
    }
};

export default getWeatherBackground;