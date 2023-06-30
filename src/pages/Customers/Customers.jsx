/* eslint-disable react-hooks/exhaustive-deps */
import { Grid, Typography } from '@mui/joy';
import { CardWrapper, CardContainer as Container, CustomerBasicDataView } from 'components/Card';
import Flex from 'components/basic-components/Flex';
import PageTitle from 'components/basic-components/PageTitle';
import React from 'react';
import { toCurrency } from 'utils/string';

const Customers = () => {
  const customers = [];
  return (
    <Flex column>
      <PageTitle>Customers</PageTitle>
      <Grid container spacing="16px" sx={{ overflow: 'auto', pb: '40px' }}>
        {customers?.map((customer) => {
          console.log(customer);
          return (
            <Grid key={customer?.phoneNumber} xs={12} md={6} lg={4} xl={3}>
              <CustomerCard data={customer} />
            </Grid>
          );
        })}
      </Grid>
    </Flex>
  );
};

export default Customers;

const CustomerCard = ({ data = {} }) => {
  console.log(data);
  const customerData = {
    name: data.name,
    phoneNumber: data.phoneNumber,
    address: data.address,
    meta: {
      'Total Orders': toCurrency(data.totalOrders),
      'Total Revenue': toCurrency(data.totalAmount),
      'Total Paid': toCurrency(data.totalPaid),
      'Total Credit': toCurrency(data.totalCredit),
    },
  };
  return (
    <CardWrapper py="15px">
      <Container>
        <Flex column>
          <CustomerBasicDataView
            name={customerData.name}
            phoneNumber={customerData.phoneNumber}
            address={customerData.address}
          />
          <Flex mt="25px" column gap="5px">
            {Object.keys(customerData.meta).map((key) => (
              <Flex
                key={key}
                jc="space-between"
                sx={{
                  borderBottom: '1px solid',
                  borderColor: 'divider',
                  pb: '5px',
                  '&:last-child': {
                    pb: 0,
                    borderBottom: 'none',
                  },
                }}>
                <Typography level="body2">{key}</Typography>
                <Typography level="body2" sx={{ color: 'text.primary' }}>
                  {customerData.meta[key]}
                </Typography>
              </Flex>
            ))}
          </Flex>
        </Flex>
      </Container>
    </CardWrapper>
  );
};
