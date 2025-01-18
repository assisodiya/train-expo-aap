import React, { createContext, useState, useEffect, useMemo, useLayoutEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useColorScheme } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Use useColorScheme() to detect system theme
  const systemTheme = useColorScheme(); // Automatically detects the system theme (light/dark)
  console.log('Initial systemTheme detected by useColorScheme:', systemTheme);

  const [theme, setTheme] = useState(systemTheme || 'light'); // Default to 'light' if null or undefined

  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme) {
          console.log('Stored theme found:', storedTheme);
          setTheme(storedTheme); // Use stored theme
        } else {
          console.log('No stored theme, using system theme:', systemTheme);
          setTheme(systemTheme || 'light'); // Default to system theme
        }
      } catch (error) {
        console.error('Failed to load theme from AsyncStorage:', error);
      }
    };

    loadTheme();
  }, [systemTheme]); // Re-run if system theme changes

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    try {
      console.log('Saving new theme to AsyncStorage:', newTheme);
      await AsyncStorage.setItem('theme', newTheme); // Save new theme to AsyncStorage
    } catch (error) {
      console.error('Failed to save theme to AsyncStorage:', error);
    }
  };

  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
