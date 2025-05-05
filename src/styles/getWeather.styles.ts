import { StyleSheet, ViewStyle, TextStyle, ImageStyle } from 'react-native';
import { TTheme } from '../types/theme';

type StyleType = {
  safeContainer: ViewStyle;
  container: ViewStyle;
  themeContainer: ViewStyle;
  title: TextStyle;
  appTitle: TextStyle;
  input: TextStyle;
  button: TextStyle;
  indicator: ViewStyle;
  error: TextStyle;
  card: ViewStyle;
  temp: TextStyle;
  condition: TextStyle;
  description: TextStyle;
  icon: ImageStyle;
};

export const getStyles = (theme: TTheme): StyleType =>
  StyleSheet.create<StyleType>({
    safeContainer: {
      flex: 1
    },
    container: {
      flex: 1,
      paddingTop: 80,
      paddingHorizontal: 20,
      backgroundColor: theme.background
    },
    themeContainer: {
      flexDirection: 'column',
      alignItems: 'flex-start'
    },
    title: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 20,
      color: theme.color
    },
    appTitle: {
      fontSize: 24,
      fontWeight: '400',
      textAlign: 'center',
      marginBottom: 20,
      color: theme.color
    },
    input: {
      borderWidth: 1,
      borderColor: theme.inputBorder,
      padding: 10,
      borderRadius: 10,
      marginBottom: 10,
      color: theme.color
    },
    button: {
      fontSize: 20,
      textAlign: 'center',
      marginBottom: 20,
      backgroundColor: '#4a0480',
      color: '#fff',
      padding: 8,
      borderRadius: 4
    },
    indicator: {
      marginTop: 20
    },
    error: {
      color: 'red',
      marginTop: 20,
      textAlign: 'center',
      fontSize: 20
    },
    card: {
      flexDirection: 'row',
      backgroundColor: theme.card,
      padding: 20,
      borderRadius: 15,
      marginTop: 20,
      alignItems: 'center',
      elevation: 3
    },
    temp: {
      fontSize: 64,
      marginVertical: 10
    },
    condition: {
      fontSize: 20,
      marginBottom: 10
    },
    description: {
      fontSize: 18
    },
    icon: {
      width: 120,
      height: 120
    }
  });
