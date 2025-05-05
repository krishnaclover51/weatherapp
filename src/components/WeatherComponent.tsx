import React, { FC, useContext, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Image,
  SafeAreaView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
// @ts-ignore
import RadioForm from 'react-native-simple-radio-button';
import { useNetInfo, NetInfoState } from '@react-native-community/netinfo';

import { ThemeContext } from '../state';
import { useWeather } from '../hooks/useWeather';
import { darkTheme, lightTheme } from '../theme';
import { ThemeEnum } from '../enums';
import { radio_props } from '../constants';

import { getStyles } from '../styles/getWeather.styles';
import { WeatherData } from '../types/weather';

interface GetWeatherProps {
  setWeatherInStorage: (data: WeatherData) => Promise<void>;
  setThemeValue: React.Dispatch<React.SetStateAction<ThemeEnum>>;
}

const GetWeather: FC<GetWeatherProps> = ({ setWeatherInStorage, setThemeValue }) => {
  const [city, setCity] = useState<string>('');
  const { weatherData, error, loading, fetchWeather } = useWeather(setWeatherInStorage);
  const theme = useContext(ThemeContext);
  const netInfo: NetInfoState = useNetInfo();

  const isLightTheme: boolean = theme === ThemeEnum.LIGHT;
  const activeTheme = isLightTheme ? lightTheme : darkTheme;
  const styles = getStyles(activeTheme);

  const showAlert = (title: string, message: string): void => {
    Alert.alert(title, message);
  };

  const handleWeatherSubmit = (): void => {
    if (!netInfo.isInternetReachable) {
      return showAlert('No Internet Connection', 'Please connect to the internet.');
    }

    if (!city.trim()) {
      return showAlert('Invalid Input', 'Please enter a city name.');
    }

    fetchWeather(city.trim());
  };

  const handleThemeChange = (value: number): void => {
    const selectedTheme: ThemeEnum = value === 0 ? ThemeEnum.LIGHT : ThemeEnum.DARK;
    setThemeValue(selectedTheme);
  };

  return (
    <SafeAreaView style={styles.safeContainer}>
      <View style={styles.container}>
        <View style={styles.themeContainer}>
          <Text style={styles.title}>Select Theme Mode</Text>
          <RadioForm
            radio_props={radio_props}
            initial={isLightTheme ? 0 : 1}
            onPress={handleThemeChange}
            formHorizontal
          />
        </View>

        <Text style={styles.appTitle}>Weather App</Text>

        <TextInput
          style={styles.input}
          placeholder="Enter city name..."
          placeholderTextColor={activeTheme.placeholder}
          value={city}
          onChangeText={setCity}
        />

        <TouchableOpacity onPress={handleWeatherSubmit}>
          <Text style={styles.button}>SUBMIT</Text>
        </TouchableOpacity>

        {loading && <ActivityIndicator style={styles.indicator} />}
        {error ? <Text style={styles.error}>{error}</Text> : null}

        {weatherData && (
          <View style={styles.card}>
            <View>
              <Text style={styles.temp}>{weatherData.main.temp}°C</Text>
              <Text style={styles.condition}>{weatherData.weather[0].main}</Text>
              <Text style={styles.description}>{weatherData.weather[0].description}</Text>
            </View>
            <Image
              style={styles.icon}
              source={{
                uri: `https://openweathermap.org/img/wn/${weatherData.weather[0].icon}@2x.png`
              }}
            />
          </View>
        )}
      </View>
    </SafeAreaView>
  );
};

export default GetWeather;
