import React, { createContext, useState, useContext, ReactNode } from 'react';
import { LightTheme, DarkTheme, ThemeType } from './theme';
import { useColorScheme } from 'react-native';

type ThemeContextType = {
  theme: ThemeType;
  toggleTheme: () => void;
  isDarkMode: boolean;
};

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const colorScheme = useColorScheme();
   const [isDarkMode, setIsDarkMode] = useState(colorScheme === 'dark');

  const toggleTheme = () => setIsDarkMode(prev => !prev);

  const theme = isDarkMode ? DarkTheme : LightTheme;

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme, isDarkMode }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {throw new Error('useTheme must be used within a ThemeProvider');}
  return context;
};
