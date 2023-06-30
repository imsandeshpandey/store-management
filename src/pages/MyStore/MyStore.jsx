import Flex from 'components/basic-components/Flex';
import { Grid } from '@mui/joy';
import React from 'react';
import Bill from './Bill/Bill';
import PageTitle from 'components/basic-components/PageTitle';

const Orders = () => {
  return (
    <Flex column>
      <PageTitle>Orders</PageTitle>
      <Grid container spacing="16px" sx={{ overflow: 'auto', pb: '30px' }}>
        <Grid xs={12} md={6} lg={4} xl={3}>
          <Bill />
        </Grid>
        <Grid xs={12} md={6} lg={4} xl={3}>
          <Bill />
        </Grid>
        <Grid xs={12} md={6} lg={4} xl={3}>
          <Bill />
        </Grid>
        <Grid xs={12} md={6} lg={4} xl={3}>
          <Bill />
        </Grid>
        <Grid xs={12} md={6} lg={4} xl={3}>
          <Bill />
        </Grid>
        <Grid xs={12} md={6} lg={4} xl={3}>
          <Bill />
        </Grid>
        <Grid xs={12} md={6} lg={4} xl={3}>
          <Bill />
        </Grid>
      </Grid>
    </Flex>
  );
};

export default Orders;
