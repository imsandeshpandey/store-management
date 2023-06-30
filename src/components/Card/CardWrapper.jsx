import React from 'react';
import Flex from '../basic-components/Flex';
import { Box } from '@mui/joy';

export const CardWrapper = (props) => {
  return (
    <Flex
      boxShadow="sm"
      border="1px solid"
      borderColor="divider"
      borderRadius="lg"
      column
      {...props}
      sx={(theme) => ({
        backgroundImage: theme.gradient.neutral,
        ...props.sx,
      })}
    />
  );
};

export const CardContainer = (props) => <Box boxSizing="border-box" px="20px" {...props} />;
