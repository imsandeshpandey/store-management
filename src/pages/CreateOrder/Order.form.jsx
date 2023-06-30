/* eslint-disable react-hooks/exhaustive-deps */
import { forwardRef, useCallback, useRef, useState } from 'react';
import { Box, Button, CircularProgress, Input, Textarea, Typography } from '@mui/joy';
import Flex from 'components/basic-components/Flex';
import { Controller, useFieldArray, useForm } from 'react-hook-form';
import { Add, Close, Print, Remove } from '@mui/icons-material';
import { useReactToPrint } from 'react-to-print';
import { AddSlashesToDate, currencyToNumber, toCurrency } from 'utils/string';
import { nonNaN } from 'utils/numbers';
import NepaliDate from 'nepali-date';
import createOrder from './createOrderFunc';
import OrderTypeChip from 'components/basic-components/OrderTypeChip';

const inputStyles = {
  color: 'text.primary',
  '--Input-focusedThickness': 0,
  '--Input-minHeight': '24px',
  px: 0,
  py: '0px',
  '& .MuiInputBase-root': {
    border: '1px solid red',
    py: '0px',
  },
  '& .MuiInput-input': { textAlign: 'inherit' },
};
const OrderForm = ({ onCancel, isEdit = false, initialData = null }) => {
  const [loading, setLoading] = useState(false);
  const widths = [3.2, 1.5, 2, 2.2];
  const getWidth = (index) => (widths[index] / widths.reduce((a, b) => a + b, 0)) * 100 + '%';

  const printRef = useRef();
  const handlePrint = useReactToPrint({
    content: () => printRef.current,
  });

  const DEFAULT_ITEM = {
    name: '',
    amount: '',
  };
  const DEFAULT_FORM = initialData || {
    type: 'B',
    orderNumber: '',
    date: new NepaliDate().format('YYYY/MM/DD'),
    name: '',
    phoneNumber: '',
    address: '',
    items: [DEFAULT_ITEM],
    totalAmount: 0,

    netAmount: 0,
    paidAmount: 0,
    creditAmount: 0,
  };
  const { register, handleSubmit, control, getValues, setValue } = useForm({
    defaultValues: DEFAULT_FORM,
  });
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'items',
  });

  const onSubmit = async (data) => {
    setLoading(true);
    await createOrder(data, isEdit);
    setLoading(false);
    onCancel();
  };

  const calculateTotalAmount = useCallback(() => {
    const items = getValues('items');
    const total = items.reduce((acc, { qty, rate }) => {
      return acc + qty * rate;
    }, 0);
    setValue('totalAmount', total);
    return total;
  }, []);

  const calculateNetAmount = useCallback(() => {
    const [total, discount, vat] = getValues(['totalAmount', 'discount', 'vat']);
    const amtAfterDiscount = total - (nonNaN(discount) * total) / 100;
    const net = amtAfterDiscount + (nonNaN(vat) * amtAfterDiscount) / 100;
    setValue('netAmount', net);
    return net;
  }, []);

  const calculateCreditAmount = useCallback(() => {
    const [net, paid] = getValues(['netAmount', 'paidAmount']);
    const credit = net - paid;
    setValue('creditAmount', credit);
    return credit;
  }, []);

  const calculatePaidAmount = useCallback(() => {
    const [net, credit] = getValues(['netAmount', 'creditAmount']);
    const paid = net - credit;
    setValue('paidAmount', paid);
    return paid;
  }, []);

  const TableInput = forwardRef(({ textarea, isPrice, name, onChange, ...props }, ref) => {
    return (
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange: handleChange, onBlur, value, ref } }) => {
          return (
            <Box
              component={textarea ? Textarea : Input}
              ref={ref}
              value={isPrice ? toCurrency(value) : value}
              onChange={(e) => {
                handleChange(isPrice ? currencyToNumber(e.target.value) : e.target.value);
                onChange && onChange(e);
              }}
              fullWidth
              variant="plain"
              {...props}
              sx={{
                borderRadius: 0,
                ...inputStyles,
                px: '8px',
                '--Textarea-focusedThickness': 0,
                textAlign: 'right',
                '& .MuiInput-input': { textAlign: 'inherit' },
                ...props.sx,
              }}
            />
          );
        }}
      />
    );
  });

  const TableInputWithLabel = forwardRef((props, ref) => {
    return (
      <Flex aiCenter jc="flex-end" width="100%" gap="50px" {...props.root}>
        <span {...props.labelProps}>{props.label}</span>
        <TableInput {...props} sx={{ pr: '20px' }} />
      </Flex>
    );
  });

  return (
    <Box component="form" height="100%" onSubmit={handleSubmit(onSubmit)}>
      <Flex column jc={['space-between', 'start']} height="100%">
        <Flex
          px={['15px', '24px']}
          py={['10px', '15px']}
          ref={printRef}
          component="form"
          width="100%"
          sx={{
            '& .MuiInput-root, & .MuiTextarea-root': {
              bgcolor: 'transparent',
            },
          }}
          column>
          <Flex aiCenter mb="20px" jc="space-between">
            <Flex aiCenter flex={1} color="background.level3" maxWidth="50%">
              <Typography level="h2" sx={{ color: 'inherit' }}>
                #
              </Typography>
              <Input
                variant="plain"
                sx={{
                  ...inputStyles,
                  color: 'inherit',
                  fontSize: ['xl2', 'xl4'],
                  fontFamily: 'product sans',
                  fontWeight: 600,
                }}
                {...register('orderNumber')}
                placeholder=""
              />
            </Flex>
            <Flex center gap="8px">
              <Controller
                name="date"
                control={control}
                render={({ field: { onChange, value, ref } }) => (
                  <Input
                    variant="plain"
                    sx={{
                      maxWidth: '170px',
                      fontFamily: 'product sans',
                      fontWeight: 600,
                      fontSize: ['xl', 'xl2'],
                      textAlign: 'right',
                      ...inputStyles,
                    }}
                    ref={ref}
                    value={value}
                    onBlur={(e) => {
                      const val = e.target.value;
                      if (val.length === 9) {
                        onChange(`${val.slice(0, 8)}0${val.slice(8)}`);
                      }
                    }}
                    onChange={(e) => onChange(AddSlashesToDate(e.target.value))}
                    placeholder="YYYY/MM/DD"
                    type="text"
                  />
                )}
              />
            </Flex>
          </Flex>
          <Input
            variant="plain"
            sx={{
              flex: 1,
              fontFamily: 'product sans',
              fontWeight: 600,
              fontSize: ['xl2', 'xl3'],
              ...inputStyles,
            }}
            {...register('name')}
            placeholder="Name"
            type="text"
          />
          <Input
            variant="plain"
            sx={{
              fontWeight: 500,
              fontSize: 'md',
              ...inputStyles,
            }}
            {...register('phoneNumber')}
            placeholder="Phone number"
            type="text"
          />
          <Input
            variant="plain"
            sx={{
              fontWeight: 500,
              fontSize: 'md',
              ...inputStyles,
            }}
            {...register('address')}
            placeholder="Address"
            type="text"
          />

          <Flex column maxWidth="calc(100% - 0px)">
            <Flex jc="space-between" aiCenter mt="20px" mb="10px">
              <Typography level="h2" fontSize={24} sx={{ color: 'text.secondary' }}>
                Items
              </Typography>
              <Button
                variant="plain"
                color="neutral"
                onClick={() => append(DEFAULT_ITEM)}
                startDecorator={<Add />}>
                Add Item
              </Button>
            </Flex>
            <Flex
              bgcolor="background.body"
              height="20px"
              flex={1}
              maxWidth
              my="4px"
              py="4px"
              sx={{
                '& > .MuiBox-root': {
                  pl: '8px',
                },
              }}>
              <Flex aiCenter width={getWidth(0)}>
                Name
              </Flex>
              <Flex aiCenter width={getWidth(1)}>
                Qty
              </Flex>
              <Flex aiCenter width={getWidth(2)}>
                Rate
              </Flex>
              <Flex aiCenter width={getWidth(3)}>
                Amt
              </Flex>
            </Flex>
            <Flex column>
              {fields.map((item, index) => (
                <Flex>
                  <Flex
                    key={item.id}
                    maxWidth="100%"
                    sx={{
                      '& > .MuiBox-root': {
                        borderRight: '1px solid',
                        borderColor: 'divider',
                      },
                      '& > .MuiBox-root:last-child': {
                        borderRight: 'none',
                      },
                    }}>
                    {/* ITEM NAME*/}
                    <TableInput
                      maxWidth={getWidth(0)}
                      textarea
                      placeholder="Name"
                      name={`items[${index}].name`}
                    />
                    {/* QUANTITY */}
                    <TableInput
                      sx={{
                        textAlign: 'left',
                      }}
                      placeholder="0"
                      maxWidth={getWidth(1)}
                      name={`items[${index}].qty`}
                      onChange={(e) => {
                        const qty = e.target.value;
                        const rate = getValues(`items[${index}].rate`);

                        setValue(`items[${index}].amount`, currencyToNumber(qty * rate));
                        calculateTotalAmount();
                        calculateNetAmount();
                        calculateCreditAmount();
                      }}
                    />
                    {/* RATE */}

                    <TableInput
                      isPrice
                      placeholder="Rate"
                      maxWidth={getWidth(2)}
                      name={`items[${index}].rate`}
                      onChange={(e) => {
                        const rate = currencyToNumber(e.target.value);
                        console.log(rate);

                        const qty = getValues(`items[${index}].qty`);
                        setValue(`items[${index}].amount`, qty * rate);
                        calculateTotalAmount();
                        calculateNetAmount();
                        calculateCreditAmount();
                      }}
                    />
                    {/* AMOUNT */}
                    <TableInput
                      readOnly
                      isPrice
                      maxWidth={getWidth(3)}
                      name={`items[${index}].amount`}
                      placeholder="Amt"
                    />
                  </Flex>
                  {index !== 0 && (
                    <Button
                      variant="plain"
                      color="danger"
                      size="sm"
                      sx={{
                        borderRadius: '100px',
                        px: '6px',
                        py: '3px',
                        ml: '-15px',
                      }}
                      onClick={() => remove(index)}>
                      <Remove />
                    </Button>
                  )}
                </Flex>
              ))}
            </Flex>

            <Flex column width="100%" mt="20px">
              <TableInputWithLabel
                readOnly
                isPrice
                label="Total"
                name="totalAmount"
                placeholder="0"
                maxWidth={getWidth(0)}
              />
              <TableInputWithLabel
                label="Discount %"
                name="discount"
                onChange={() => {
                  calculateNetAmount();
                  calculateCreditAmount();
                }}
                placeholder="0"
                maxWidth={getWidth(0)}
              />
              <TableInputWithLabel
                label="VAT %"
                name="vat"
                onChange={() => {
                  calculateNetAmount();
                  calculateCreditAmount();
                }}
                placeholder="0"
                maxWidth={getWidth(0)}
              />

              <TableInputWithLabel
                readOnly
                isPrice
                label="Net Amount"
                name="netAmount"
                placeholder="0"
                maxWidth={getWidth(0)}
              />

              <TableInputWithLabel
                name="paidAmount"
                isPrice
                label="Paid"
                onChange={calculateCreditAmount}
                placeholder="0"
                maxWidth={getWidth(0)}
              />

              <TableInputWithLabel
                name="creditAmount"
                isPrice
                label="Credit"
                onChange={calculatePaidAmount}
                placeholder="0"
                maxWidth={getWidth(0)}
              />
            </Flex>
          </Flex>
        </Flex>
        <Flex jc="space-between" ai="end" mt="15px" pb={['10px', '15px']} px={['15px', '24px']}>
          <Controller
            name="type"
            control={control}
            render={({ field }) => (
              <OrderTypeChip
                type={field.value}
                onClick={() => field.onChange(field.value === 'A' ? 'B' : 'A')}
              />
            )}
          />

          <Flex aiCenter gap="10px">
            <Button variant="plain" color="neutral" onClick={handlePrint}>
              <Print />
            </Button>

            <Button type="submit" startDecorator={loading && <CircularProgress />} disabled={loading}>
              Submit
            </Button>
            <Button sx={{ p: '5px' }} variant="plain" color="neutral" onClick={onCancel}>
              <Close />
            </Button>
          </Flex>
        </Flex>
      </Flex>
    </Box>
  );
};

export default OrderForm;
