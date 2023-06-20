import Flex from 'components/basic-components/Flex';
import { Grid, Typography } from '@mui/joy';
import React from 'react';
import Bill from './Bill/Bill';
import { useIsView } from 'hooks/useIsView.hook';

const Orders = () => {
  const { isMobile } = useIsView();
  return (
    <Flex column>
      <Typography level={isMobile ? 'h2' : 'h1'}>Orders</Typography>
      <Grid container spacing="16px" sx={{ overflow: 'auto', pb: '30px', mt: '30px' }}>
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
