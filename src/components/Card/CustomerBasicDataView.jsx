import { Typography } from '@mui/joy';
import Flex from 'components/basic-components/Flex';
import React from 'react';
export const CustomerBasicDataView = ({ name, phoneNumber, address }) => {
  return (
    <Flex
      column
      color="text.secondary"
      sx={{
        '& .MuiTypography-body1': {
          color: 'inherit',
        },
      }}>
      <Typography level="h2" fontSize="24px">
        {name}
      </Typography>
      <Typography> {phoneNumber}</Typography>
      <Typography> {address}</Typography>
    </Flex>
  );
};
