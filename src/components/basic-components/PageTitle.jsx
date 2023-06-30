import { Typography } from '@mui/joy';
import { useResponsive } from 'hooks/useResponsive';
import React from 'react';

const PageTitle = ({ children, ...props }) => {
  const { isMobile } = useResponsive();
  return (
    <Typography level={isMobile ? 'h2' : 'h1'} {...props} sx={{ mb: '30px', ...props.sx }}>
      {children}
    </Typography>
  );
};

export default PageTitle;
