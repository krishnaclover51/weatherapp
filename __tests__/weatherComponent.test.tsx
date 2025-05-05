import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import GetWeather from '../src/components/WeatherComponent';
import { ThemeContext } from '../src/state';
import { ThemeEnum } from '../src/enums';
import { WeatherData } from '../src/types/weather';
import { Text } from 'react-native';

// Mock radio button
jest.mock('react-native-simple-radio-button', () => ({
  __esModule: true,
  default: ({ radio_props, onPress }: any) => {
    return radio_props.map((prop: any, index: number) => (
      <Text key={index} onPress={() => onPress(prop.value)} testID={`radio-${prop.label}`}>
        {prop.label}
      </Text>
    ));
  },
}));

// Mock network info
jest.mock('@react-native-community/netinfo', () => ({
  useNetInfo: () => ({
    isInternetReachable: true,
  }),
}));

// Mock useWeather hook
const fetchWeatherMock = jest.fn();

jest.mock('../src/hooks/useWeather', () => ({
  useWeather: (_setWeatherInStorage: (data: WeatherData) => Promise<void>) => ({
    weatherData: {
      name: 'Dummy City',
      main: { temp: 22 },
      weather: [{ main: 'Sunny', description: 'Clear sky', icon: '01d' }],
    },
    error: '',
    loading: false,
    fetchWeather: fetchWeatherMock,
  }),
}));

describe('GetWeather Component', () => {
  const setWeatherInStorage = jest.fn();
  const setThemeValue = jest.fn();

  const renderWithTheme = (theme = ThemeEnum.LIGHT) =>
    render(
      <ThemeContext.Provider value={theme}>
        <GetWeather
          setWeatherInStorage={setWeatherInStorage}
          setThemeValue={setThemeValue}
        />
      </ThemeContext.Provider>
    );

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders input, title, and submit button', () => {
    const { getByText, getByPlaceholderText } = renderWithTheme();

    expect(getByText('Weather App')).toBeTruthy();
    expect(getByPlaceholderText('Enter city name...')).toBeTruthy();
    expect(getByText('SUBMIT')).toBeTruthy();
  });

  it('calls fetchWeather when city is entered and submit is pressed', () => {
    const { getByText, getByPlaceholderText } = renderWithTheme();

    const input = getByPlaceholderText('Enter city name...');
    fireEvent.changeText(input, 'London');
    fireEvent.press(getByText('SUBMIT'));

    expect(fetchWeatherMock).toHaveBeenCalledWith('London');
  });

  it('renders weather data correctly', () => {
    const { getByText } = renderWithTheme();

    expect(getByText('22°C')).toBeTruthy();
    expect(getByText('Sunny')).toBeTruthy();
    expect(getByText('Clear sky')).toBeTruthy();
  });

  it('switches theme when radio button is pressed', () => {
    const { getByTestId } = renderWithTheme();

    fireEvent.press(getByTestId('radio-dark'));
    expect(setThemeValue).toHaveBeenCalledWith(ThemeEnum.DARK);
  });
});
