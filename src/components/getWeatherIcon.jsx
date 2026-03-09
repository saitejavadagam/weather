import { CloudSun, Sun, CloudRain, CloudDrizzle, CloudFog, CloudSnow} from 'lucide-react'

const getWeatherIcon = (condition) => {
    switch (condition) {
        case 'Clouds':
            return <CloudSun className="w-40 h-40 mx-auto mb-4 text-white" />;
        case 'Clear':
            return <Sun className="w-40 h-40 mx-auto mb-4 text-yellow-300" />;
        case 'Rain':
            return <CloudRain className="w-40 h-40 mx-auto mb-4 text-blue-300" />;
        case 'Drizzle':
            return <CloudDrizzle className="w-40 h-40 mx-auto mb-4 text-blue-200" />;
        case 'Mist':
        case 'Fog':
        case 'Haze':
            return <CloudFog className="w-40 h-40 mx-auto mb-4 text-gray-200" />;
        case 'Snow':
            return <CloudSnow className="w-40 h-40 mx-auto mb-4 text-white" />;
        default:
            return <CloudSun className="w-40 h-40 mx-auto mb-4 text-white" />;
    }
};

export default getWeatherIcon;