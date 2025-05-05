# 🌦️ Weather App

## 📋 Features

- 🔍 **Search weather** by city name
- 🌆 **Displays** city name, temperature, weather condition with description, and weather icon
- ❌ **Shows error** if city not found
- 🌗 **Light/Dark mode toggle**
- 🔧 Fully functional custom **API hook** for weather data

## 🚀 Getting Started

### 1️⃣ Clone the repo

```bash
git clone https://github.com/krishnaclover51/weatherapp
cd weatherapp
```
2️⃣ Install Dependencies
```
yarn install
cd ios 
pod install
```
3️⃣ Run the app
```
yarn start
yarn ios
```
4️⃣ Run Tests
```
yarn test
```

## 🏗️ Architecture Overview
### 📱 Component: GetWeather
Responsible for:

Render UI components

Collecting user input for city search

Toggle theme selection via radio buttons

Displaying weather data or error messages


### 🧑‍💻 Hooks:
Exposes weatherData, loading, error, and fetchWeather

Used OpenWeatherMap API to fetches weather data

Handles loading and error states

### 🎨 Theming
Uses a custom ThemeContext

Defines themes separately with typed styles

### 📊 State Management
Local useState manages the city input

useContext(ThemeContext) provides the current theme

Theme can be changed via react-native-simple-radio-button

Weather data is retrieved via the custom useWeather hook

## Tests cover:

🖥️ UI rendering

🌗 Theme switching

🌦️ Conditional rendering of weather results and error messages
