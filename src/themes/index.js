import { DefaultTheme, DarkTheme as PaperDarkTheme } from 'react-native-paper';
import { lightColors, darkColors } from './colors';
console.log('DefaultTheme:', DefaultTheme);
console.log('PaperDarkTheme:', PaperDarkTheme);

// Light theme customization
export const LightTheme = {
  ...DefaultTheme, // Spread DefaultTheme properties
  colors: {
    ...DefaultTheme.colors, // Ensure DefaultTheme.colors exists
    ...lightColors, // Merge custom light colors
  },
};

// Custom Dark theme customization
export const CustomDarkTheme = {
  ...PaperDarkTheme, // Spread PaperDarkTheme properties
  colors: {
    ...PaperDarkTheme.colors, // Ensure PaperDarkTheme.colors exists
    ...darkColors, // Merge custom dark colors
  },
};
