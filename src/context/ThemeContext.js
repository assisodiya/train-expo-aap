import React, { createContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const systemTheme = Appearance.getColorScheme(); // Get the system's theme (light/dark)
  const [theme, setTheme] = useState(systemTheme || 'light');

  // Load theme from AsyncStorage on component mount
  useEffect(() => {
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme) {
          setTheme(storedTheme);
        } else {
          setTheme(systemTheme || 'light');
        }
      } catch (error) {
        console.error('Error loading theme:', error);
        setTheme(systemTheme || 'light');
      }
    };

    loadTheme();
  }, [systemTheme]);

  const toggleTheme = async () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    await AsyncStorage.setItem('theme', newTheme);
  };

  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return <ThemeContext.Provider value={contextValue}>{children}</ThemeContext.Provider>;
};
