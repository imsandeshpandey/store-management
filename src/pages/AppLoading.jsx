import Flex from 'components/basic-components/Flex';
import { CircularProgress } from '@mui/joy';
import React from 'react';

const AppLoading = () => {
  return (
    <Flex center height="100vh">
      <CircularProgress size="lg" />
    </Flex>
  );
};

export default AppLoading;
