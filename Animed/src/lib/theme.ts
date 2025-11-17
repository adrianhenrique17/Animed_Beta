export const theme = {
  colors: {
    // Cores para o modo CLARO
    light: {
      primary: '#32CD32',
      primaryDark: '#106810',
      accent: '#274797',
      background: '#F1F5F4',
      surface: '#FFFFFF',
      gray: '#717f7f',
      text: '#0a0a0a',
      textPerfil: '#FFFFFF',
      danger: '#DF5951',
      border: '#bbbbbb',
      textPrimary: '#0a0a0a',
      textSecondary: '#717f7f',
    },
    // Cores para o modo ESCURO
    dark: {
      primary: '#106810',
      primaryDark: '#32CD32',
      accent: '#274797',
      background: '#0a0a0a',
      surface: '#121212',
      gray: '#717f7f',
      text: '#f1f5f4',
      textPerfil: '#FFFFFF',
      danger: '#DF5951',
      border: '#666666',
      textPrimary: '#f1f5f4',
      textSecondary: '#a0a0a0',
    },
  },
  spacing: (value: number) => value * 8,
  radii: {
    sm: 6,
    md: 12,
    lg: 20,
  },
  typography: {
    h1: 24,
    h2: 20,
    h3: 18,
    body: 16,
    small: 12,
  },
};