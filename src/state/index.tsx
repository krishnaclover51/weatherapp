import { ThemeEnum } from '../enums';
import { WeatherData } from '../types/weather';
import { createContext } from 'react';

export const ThemeContext = createContext<ThemeEnum>(ThemeEnum.LIGHT);

export const WeatherDataContext = createContext<WeatherData | null>(null);
