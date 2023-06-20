import React from 'react';
import logo from './logo.svg';
import logoIcon from './logo-icon.svg';
import logoDark from './logo-dark.svg';
import logoDarkIcon from './logo-icon-dark.svg';
import { Box, useColorScheme } from '@mui/joy';

const Logo = ({ fullLogo, ...props }) => {
  const { mode } = useColorScheme();

  if (fullLogo) {
    return <Box component="img" src={mode === 'light' ? logo : logoDark} {...props} />;
  } else {
    return <Box component="img" src={mode === 'light' ? logoIcon : logoDarkIcon} {...props} />;
  }
};

export default Logo;
