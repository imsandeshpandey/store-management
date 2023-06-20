import { DarkMode, WbSunny } from '@mui/icons-material';
import { Box, useColorScheme, useTheme } from '@mui/joy';
import React from 'react';

const ThemeToggleButton = ({ onClick, ...props }) => {
  const { mode, setMode } = useColorScheme();
  const toggleTheme = () => {
    setMode(mode === 'light' ? 'dark' : 'light');
  };

  const iconStyles = {
    padding: 8,
  };
  const theme = useTheme();
  return (
    <Box
      onClick={onClick || toggleTheme}
      {...props}
      sx={{
        position: 'relative',
        cursor: 'pointer',
        background: theme.gradient.neutral1,
        boxShadow: 'sm',
        width: 30,
        height: 30,
        overflow: 'hidden',
        borderRadius: 100,
        color: 'text.primary',
        ...props.sx,
      }}>
      <Box
        sx={{
          top: mode === 'light' ? 1 : -29,
          transition: 'all 0.2s',
          left: 0,
          width: 30,
          position: 'absolute',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Box component={WbSunny} fontSize="small" style={iconStyles} />

        <Box component={DarkMode} fontSize="small" style={iconStyles} />
      </Box>
    </Box>
  );
};
export default ThemeToggleButton;
