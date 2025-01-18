import React, { createContext, useState, useEffect, useMemo } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Appearance } from 'react-native';

export const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Initialize the system theme based on the device's appearance setting
  const systemTheme = Appearance.getColorScheme();
  console.log('Initial systemTheme:', systemTheme);

  // Initialize theme state with systemTheme, or fall back to light mode
  const [theme, setTheme] = useState(systemTheme || 'light');

  useEffect(() => {
    // Load the stored theme preference from AsyncStorage when the app starts
    const loadTheme = async () => {
      try {
        const storedTheme = await AsyncStorage.getItem('theme');
        if (storedTheme) {
          setTheme(storedTheme); // Use stored theme if available
        } else {
          setTheme(systemTheme || 'light'); // Default to system theme if no stored theme
        }
      } catch (error) {
        console.error('Failed to load theme from AsyncStorage:', error);
        setTheme(systemTheme || 'light'); // Fallback to system theme
      }
    };

    loadTheme(); // Call the load theme function

    // Listen for changes in the system theme (light/dark mode)
    const themeChangeListener = Appearance.addChangeListener(({ colorScheme }) => {
      console.log('System theme changed:', colorScheme);
      setTheme(colorScheme); // Update theme when system theme changes
    });

    // Cleanup listener when the component unmounts
    return () => themeChangeListener.remove();
  }, [systemTheme]);

  const toggleTheme = async () => {
    try {
      // Toggle between light and dark modes
      const newTheme = theme === 'light' ? 'dark' : 'light';
      setTheme(newTheme);
      await AsyncStorage.setItem('theme', newTheme); // Save the selected theme to AsyncStorage
    } catch (error) {
      console.error('Failed to save theme to AsyncStorage:', error);
    }
  };

  // Memoize the context value to optimize re-renders
  const contextValue = useMemo(() => ({ theme, toggleTheme }), [theme]);

  return (
    <ThemeContext.Provider value={contextValue}>
      {children}
    </ThemeContext.Provider>
  );
};
