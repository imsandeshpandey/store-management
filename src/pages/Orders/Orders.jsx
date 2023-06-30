/* eslint-disable react-hooks/exhaustive-deps */
import Flex from 'components/basic-components/Flex';
import { Grid } from '@mui/joy';
import React from 'react';
import Bill from './Bill/Bill';
import PageTitle from 'components/basic-components/PageTitle';

const Orders = () => {
  const orders = [];
  return (
    <Flex column>
      <PageTitle>Orders</PageTitle>
      <Grid container spacing="16px" sx={{ overflow: 'auto', pb: ['70px', '20px'], flexGrow: 1 }}>
        {orders?.map((order) => (
          <Grid key={order?.id} xs={12} md={6} xl={4}>
            <Bill data={order} />
          </Grid>
        ))}
      </Grid>
    </Flex>
  );
};

export default Orders;
