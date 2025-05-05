import { useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { WeatherDataContext } from '../state';
import { WeatherService } from '../service/weatherService';
import { WeatherData } from '../types/weather';
import { urlHelper } from '../utils/urlHelper';
interface UseWeatherReturn {
  weatherData: WeatherData | null;
  error: string;
  loading: boolean;
  fetchWeather: (city: string) => Promise<void>;
}

export function useWeather(setWeatherInStorage: (data: WeatherData) => Promise<void>): UseWeatherReturn {
  const contextWeather = useContext(WeatherDataContext);
  const [weatherData, setWeatherData] = useState<WeatherData | null>(contextWeather);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchWeather = async (city: string): Promise<void> => {
    if (!city.trim()) return;

    setLoading(true);
    setError('');

    try {
      const weatherService = new WeatherService(city);
      const response = await weatherService.callApi();

      if (response.cod !== 200) {
        setError('Invalid city name');
        setWeatherData(null);
        return;
      }

      setWeatherData(response);
      await setWeatherInStorage?.(response);
    } catch (err) {
      console.error('Weather fetch error:', err);
      setError('Failed to fetch weather data.');
      setWeatherData(null);
    } finally {
      setLoading(false);
    }
  };

  const loadStoredWeather = async (): Promise<void> => {
    try {
      const stored = await AsyncStorage.getItem(urlHelper.STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as WeatherData;
        setWeatherData(parsed);
      }
    } catch (err) {
      console.warn('Failed to load weather from storage.', err);
    }
  };

  useEffect(() => {
    loadStoredWeather();
  }, []);

  return {
    weatherData,
    error,
    loading,
    fetchWeather,
  };
}
