/* eslint-disable react-hooks/exhaustive-deps */
import Flex from 'components/basic-components/Flex';
import { EditTwoTone, Print } from '@mui/icons-material';
import { Box, Button, Table, Typography } from '@mui/joy';
import React, { useRef, useState } from 'react';
import { useReactToPrint } from 'react-to-print';
import { toCurrency } from 'utils/string';
import { CardWrapper, CardContainer as Container, CustomerBasicDataView } from 'components/Card';
import OrderTypeChip from 'components/basic-components/OrderTypeChip';
import OrderModal from 'pages/CreateOrder/CreateOrder.modal';

const Bill = ({ data }) => {
  const [editModalOpen, setEditModalOpen] = useState(false);
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const priceStyles = {
    textAlign: 'right',
  };
  const tableHeaders = ['Name', 'Qty', 'Rate', 'Amt'];
  const tableData = data.items.map((item) => {
    return [
      item.name,
      item.qty,
      { data: toCurrency(item.rate), style: priceStyles },
      { data: toCurrency(item.amount), style: priceStyles },
    ];
  });
  const tableSummary = {
    Total: toCurrency(data.totalAmount),
    'Discount %': data.discount,
    'VAT %': data.vat,
    Net: toCurrency(data.netAmount),
    Paid: toCurrency(data.paidAmount),
    Credit: toCurrency(data.creditAmount),
  };

  return (
    <CardWrapper
      sx={{
        '& *': {
          overflowX: 'auto',
        },
        '& *::-webkit-scrollbar': {
          display: 'none',
        },
      }}>
      {editModalOpen && <OrderModal isEdit initialData={data} open setOpen={setEditModalOpen} />}
      <Box ref={componentRef}>
        <Container>
          <Flex py="15px" jc="space-between" ai="baseline">
            <Typography level="h2" sx={{ color: 'background.level1' }}>
              #{data.orderNumber}
            </Typography>
            <Typography level="h2" fontSize="20px" sx={{ color: 'text.secondary' }}>
              {data.date}
            </Typography>
          </Flex>
        </Container>
        <Container>
          <CustomerBasicDataView name={data.name} phoneNumber={data.phoneNumber} address={data.address} />
        </Container>

        <Box
          border="1px solid"
          borderColor="divider"
          overflow="hidden"
          mx={['4px', '4px', '4px', '12px']}
          borderRadius="md"
          my="20px">
          <Table
            borderAxis="y-axis"
            variant="plain"
            size="sm"
            stickyFooter
            sx={{
              '& thead th:nth-child(1)': { width: '35%' },
              '& thead th:nth-child(2)': { width: '15%' },
              '& th,& td': {
                color: 'text.primary',
                pl: '8px',
              },
              '& tbody th': {
                textAlign: 'right',
              },
            }}>
            <thead>
              <tr>
                {tableHeaders.map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {tableData.map((row, i) => (
                <tr key={i}>
                  {row.map((cell, j) => (
                    <td key={j} style={cell?.style} children={cell.data || cell} />
                  ))}
                </tr>
              ))}
              <tr>
                {Array(4)
                  .fill(0)
                  .map((_, i) => (
                    <td key={i} />
                  ))}
              </tr>
            </tbody>
            {Object.entries(tableSummary).map(([key, value]) => (
              <tbody key={key}>
                <tr>
                  <th colSpan={2}>{key}</th>
                  <th colSpan={2} style={priceStyles}>
                    {value}
                  </th>
                </tr>
              </tbody>
            ))}
          </Table>
        </Box>
      </Box>
      <Container>
        <Flex jc="space-between" pb="15px">
          <Flex jc="space-between" ai="center">
            <OrderTypeChip type={data.type} />
            <Button variant="plain" color="neutral" onClick={() => setEditModalOpen(!editModalOpen)}>
              <EditTwoTone />
            </Button>
          </Flex>
          <Button variant="plain" color="neutral" onClick={handlePrint} children={<Print />} />
        </Flex>
      </Container>
    </CardWrapper>
  );
};

export default Bill;
