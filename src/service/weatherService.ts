import { urlHelper } from '../utils/urlHelper';
import { WeatherData } from '../types/weather';

export class WeatherService {
    public readonly baseUrl: string;

    constructor(cityName: string) {
        this.baseUrl = urlHelper.buildUrl(cityName); 
    }

    public async callApi(): Promise<WeatherData> {
        try {
          const response = await fetch(this.baseUrl);
    
          if (!response.ok) {
            throw new Error(`API Error: ${response.status} ${response.statusText}`);
          }
    
          const data: WeatherData = await response.json();
          return data;
        } catch (error) {
          console.error('WeatherService Error:', error);
          throw new Error('Failed to fetch weather data.');
        }
      }
}
