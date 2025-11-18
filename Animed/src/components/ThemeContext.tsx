import React, { createContext, useContext, useState, useEffect } from 'react';
import { useColorScheme } from 'react-native';

const ThemeContext = createContext({
  theme: 'light', 
  toggleTheme: () => {},
});

export const ThemeProvider = ({ children }) => {
  const colorScheme = useColorScheme();
  
  // Mude esta linha para sempre iniciar no modo 'light'
  const [theme, setTheme] = useState('light');

  // Remova este useEffect, pois você não quer mais que o tema mude automaticamente
  // com a configuração do sistema.
  /*
  useEffect(() => {
    setTheme(colorScheme);
  }, [colorScheme]);
  */

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);