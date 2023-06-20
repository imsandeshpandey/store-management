import Flex from 'components/basic-components/Flex';
import { EditTwoTone, Print } from '@mui/icons-material';
import { Box, Button, Chip, Table, Typography } from '@mui/joy';
import React, { useRef } from 'react';
import { useReactToPrint } from 'react-to-print';
import { toCurrency } from 'utils/string';

function createData(name, quantity, rate, amount) {
  return { name, quantity, rate, amount };
}

const rows = [
  createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
  createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
  createData('Eclair', 262, 16.0, 24, 6.0),
  createData('Cupcake', 305, 3.7, 67, 4.3),
  createData('Gingerbread', 356, 16.0, 49, 3.9),
];

const Bill = () => {
  const componentRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });
  const priceStyles = {
    textAlign: 'right',
  };
  return (
    <Flex
      boxShadow="sm"
      border="1px solid"
      borderColor="divider"
      sx={(theme) => ({
        backgroundImage: theme.gradient.neutral,
      })}
      borderRadius="lg"
      column>
      <Box ref={componentRef}>
        <Container>
          <Flex py="15px" jc="space-between" ai="baseline">
            <Typography level="h2" sx={{ color: 'background.level1' }}>
              #1
            </Typography>
            <Typography level="h2" fontSize="20px" sx={{ color: 'text.secondary' }}>
              2080/10/03
            </Typography>
          </Flex>
        </Container>
        <Container>
          <Flex column>
            <Typography level="h1" fontSize="24px" sx={{ color: 'text.secondary' }}>
              Sandesh Pandey
            </Typography>

            <Typography level="body1" sx={{ color: 'text.secondary' }}>
              Shivraj-3, Kapilbastu
            </Typography>

            <Typography level="body1" sx={{ color: 'text.secondary' }}>
              9867037503
            </Typography>
          </Flex>
        </Container>
        <Container my="20px">
          <Box border="1px solid" borderColor="divider" overflow="hidden" borderRadius="md">
            <Table
              borderAxis="y-axis"
              variant="plain"
              size="sm"
              stickyFooter
              sx={{
                '& thead th:nth-child(1)': { width: '40%' },
                '& th,& td': {
                  px: '8px',
                },
              }}>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Qty</th>
                  <th>Rate</th>
                  <th>Amt</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.name}>
                    <td>{row.name}</td>
                    <td>{row.quantity}</td>
                    <td style={priceStyles}> {toCurrency(row.rate)}</td>
                    <td style={priceStyles}>{toCurrency(row.amount)}</td>
                  </tr>
                ))}
                <tr>
                  <td>ㅤ</td>
                  <td>ㅤ</td>
                  <td>ㅤ</td>
                  <td>ㅤ</td>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th>ㅤ</th>
                  <th colSpan={2}>Total</th>
                  <th style={priceStyles}>{toCurrency(280)}</th>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th>ㅤ</th>
                  <th colSpan={2}>Discount %</th>
                  <th style={priceStyles}>10%</th>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th>ㅤ</th>
                  <th colSpan={2}>VAT %</th>
                  <th style={priceStyles}>13%</th>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th>ㅤ</th>
                  <th colSpan={2}>Net Amount</th>
                  <th style={priceStyles}>{toCurrency(280)}</th>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th>ㅤ</th>
                  <th colSpan={2}>Paid</th>
                  <th style={priceStyles}>{toCurrency(1280)}</th>
                </tr>
              </tbody>
              <tbody>
                <tr>
                  <th>ㅤ</th>
                  <th colSpan={2}>Credit</th>
                  <th style={priceStyles}>{toCurrency(280)}</th>
                </tr>
              </tbody>
            </Table>
          </Box>
        </Container>
      </Box>
      <Container>
        <Flex jc="space-between" pb="15px">
          <Flex jc="space-between">
            <Chip color="danger" variant="outlined" size="sm" sx={{ my: 'auto' }}>
              B
            </Chip>
            <Button variant="plain" color="neutral">
              <EditTwoTone />
            </Button>
          </Flex>
          <Button variant="plain" color="neutral" onClick={handlePrint}>
            <Print />
          </Button>
        </Flex>
      </Container>
    </Flex>
  );
};

const Container = (props) => <Box boxSizing="border-box" px="20px" {...props} />;

export default Bill;
