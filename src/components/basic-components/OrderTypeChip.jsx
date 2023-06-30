import { Chip } from '@mui/joy';
import React from 'react';

const OrderTypeChip = ({ type, ...props }) => {
  console.log(type);
  return (
    <Chip
      color={type === 'B' ? 'warning' : 'primary'}
      variant="outlined"
      size="md"
      {...props}
      sx={{ py: 1, ...props.sx }}>
      Type {type}
    </Chip>
  );
};

export default OrderTypeChip;
