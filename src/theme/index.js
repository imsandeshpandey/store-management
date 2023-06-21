import { extendTheme } from '@mui/joy/styles';
//INFO: Use HSL to easily change colors in the future

let theme = extendTheme({
  fontFamily: {
    body: `Inter,var(--joy-fontFamily-fallback)`,
    display: `Product Sans,var(--joy-fontFamily-fallback)`,
  },
  gradient: {
    neutral: (theme) => `linear-gradient(45deg, 
      ${theme.palette.background.surface} 0%,
    ${theme.palette.background.body} 200%)`,
    neutral1: (theme) => `linear-gradient(45deg, 
      ${theme.palette.background.body} 0%,
      ${theme.palette.background.level3} 200%)`,
  },
  colorSchemes: {
    light: {
      palette: {
        alphaColor: (color) => `rgba(var(--joy-palette-${color.replace('.', '-')}),50%)`,
        background: {
          surface: 'var(--joy-palette-neutral-50)',
          body: 'var(--joy-palette-neutral-100)',
          popup: 'var(--joy-palette-neutral-100)',
          level1: 'var(--joy-palette-neutral-200)',
          level2: 'var(--joy-palette-neutral-300)',
          level3: 'var(--joy-palette-neutral-400)',
        },
        text: {
          primary: '#000',
          secondary: 'var(--joy-palette-neutral-800)',
          tertiary: 'var(--joy-palette-neutral-600)',
        },
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        neutral: {
          50: '#eceff1',
          100: '#cfd8dc',
          200: '#b0bec5',
          300: '#90a4ae',
          400: '#78909c',
          500: '#607d8b',
          600: '#546e7a',
          700: '#455a64',
          800: '#37474f',
          900: '#263238',
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
      },
    },
    dark: {
      palette: {
        background: {
          surface: 'var(--joy-palette-neutral-1000)',
        },
        text: {
          primary: '#fff',
          secondary: 'var(--joy-palette-neutral-200)',
          tertiary: 'var(--joy-palette-neutral-400)',
        },
        neutral: {
          50: '#eceff1',
          100: '#cfd8dc',
          200: '#b0bec5',
          300: '#90a4ae',
          400: '#78909c',
          500: '#607d8b',
          600: '#546e7a',
          700: '#455a64',
          800: '#37474f',
          900: '#263238',
          1000: '#151b1e',
        },
        primary: {
          50: '#f0fdfa',
          100: '#ccfbf1',
          200: '#99f6e4',
          300: '#5eead4',
          400: '#2dd4bf',
          500: '#14b8a6',
          600: '#0d9488',
          700: '#0f766e',
          800: '#115e59',
          900: '#134e4a',
        },
        info: {
          50: '#eff6ff',
          100: '#dbeafe',
          200: '#bfdbfe',
          300: '#93c5fd',
          400: '#60a5fa',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
        },
        success: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        warning: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        },
      },
    },
  },
});
console.log(theme);
export default theme;
