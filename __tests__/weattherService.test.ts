import { WeatherService } from '../src/service/weatherService';

jest.mock('../src/utils/urlUtils');

describe('WeatherService', () => {
  it('should build URL with the provided city name', () => {
    const mockBuildUrl = jest.fn().mockReturnValue(`https://api.openweathermap.org/data/2.5/weather?q=Bhopal&appid=865883edefdd6071452769ba0e318cc5&units=metric`);
    const weatherService = new WeatherService('Bhopal');
    expect(mockBuildUrl).toHaveBeenCalledWith('Bhopal');
    expect((weatherService as any).baseUrl).toContain('q=Bhopal');
  });

  it('should encode special characters in the city name', () => {
    const encodedCity = encodeURIComponent('São Paulo');
    const expectedUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodedCity}&appid=865883edefdd6071452769ba0e318cc5&units=metric`;
    const weatherService = new WeatherService('São Paulo');
    expect((weatherService as any).baseUrl).toBe(expectedUrl);
  });
});
