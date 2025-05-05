import { act, renderHook, waitFor } from '@testing-library/react-native';
import { useWeather } from '../src/hooks/useWeather';
import { WeatherData } from '../src/types/weather';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () => ({
  getItem: jest.fn(),
}));

// Mock WeatherService
const mockCallApi = jest.fn();
jest.mock('../src/service/weather', () => ({
  WeatherService: jest.fn().mockImplementation(() => ({
    callApi: mockCallApi,
  })),
}));

describe('useWeather hook', () => {
  const mockSetWeatherInStorage = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('fetches and sets weather data for a valid city', async () => {
    const mockWeatherData: WeatherData = {
      name: 'Bhopal',
      cod: 200,
      main: { temp: 19 },
      weather: [{ main: 'Cloudy', description: 'overcast clouds', icon: '04d' }],
    };

    mockCallApi.mockResolvedValueOnce(mockWeatherData);

    const { result } = renderHook(() => useWeather(mockSetWeatherInStorage));

    await act(async () => {
      await result.current.fetchWeather('Bhopal');
    });

    await waitFor(() => expect(result.current.loading).toBe(false));

    expect(mockCallApi).toHaveBeenCalled();
    expect(mockSetWeatherInStorage).toHaveBeenCalledWith(mockWeatherData);
    expect(result.current.weatherData?.name).toBe('Bhopal');
    expect(result.current.error).toBe('');
  });

  it('should not call API if city is empty', async () => {
    const { result } = renderHook(() => useWeather(mockSetWeatherInStorage));

    await act(async () => {
      await result.current.fetchWeather('');
    });

    expect(mockCallApi).not.toHaveBeenCalled();
    expect(result.current.weatherData).toBe(null);
    expect(result.current.error).toBe('');
    expect(result.current.loading).toBe(false);
  });

  it('sets error if API returns non-200 code', async () => {
    const invalidWeatherData = { cod: 404 };

    mockCallApi.mockResolvedValueOnce(invalidWeatherData);

    const { result } = renderHook(() => useWeather(mockSetWeatherInStorage));

    await act(async () => {
      await result.current.fetchWeather('InvalidCity');
    });

    expect(result.current.weatherData).toBe(null);
    expect(result.current.error).toBe('Invalid city name');
  });

  it('sets error if API call fails', async () => {
    mockCallApi.mockRejectedValueOnce(new Error('Network error'));

    const { result } = renderHook(() => useWeather(mockSetWeatherInStorage));

    await act(async () => {
      await result.current.fetchWeather('Bhopal');
    });

    expect(result.current.weatherData).toBe(null);
    expect(result.current.error).toBe('Failed to fetch weather data.');
  });

  it('loads weather data from AsyncStorage on mount', async () => {
    const storedData: WeatherData = {
      name: 'StoredCity',
      cod: 200,
      main: { temp: 25 },
      weather: [{ main: 'Sunny', description: 'clear sky', icon: '01d' }],
    };

    (AsyncStorage.getItem as jest.Mock).mockResolvedValueOnce(JSON.stringify(storedData));

    const { result } = renderHook(() => useWeather(mockSetWeatherInStorage));

    await waitFor(() => {
      expect(result.current.weatherData?.name).toBe('StoredCity');
    });
  });
});
