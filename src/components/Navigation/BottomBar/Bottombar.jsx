import Flex from 'components/basic-components/Flex';
import addAlpha from 'utils/addAlpha';
import React, { useMemo } from 'react';
import {
  ShoppingCartTwoTone as OrdersIcon,
  PeopleTwoTone as CustomersIcon,
  StoreMallDirectoryTwoTone as StoreIcon,
  AddCircleTwoTone as CreateOrderIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
import { ListItemDecorator, Tab, TabList, Tabs, Typography, useColorScheme } from '@mui/joy';
import ThemeToggleButton from 'theme/themeToggle';
import Dropdown, { DropdownItem } from 'components/basic-components/Dropdown/Dropdown';
import { darkModeAtom } from 'contexts/AppState.context';

const Bottombar = ({ page, setPage, onClickOrder }) => {
  const menuItems = useMemo(
    () => [
      {
        name: 'Orders',
        icon: <OrdersIcon />,
      },
      {
        name: 'Customers',
        icon: <CustomersIcon />,
      },
      {
        name: <CreateOrderIcon />,
        onClick: onClickOrder,
        color: 'primary.500',
        size: 40,
      },
      {
        name: 'My Store',
        icon: <StoreIcon />,
      },
    ],
    []
  );
  const { mode, setMode } = useColorScheme();
  return (
    <Flex
      aiCenter
      position="fixed"
      width="100%"
      px="8px"
      bottom={0}
      left={0}
      zIndex={999}
      sx={(theme) => ({
        bgcolor:
          mode === 'light'
            ? addAlpha(theme.palette.neutral[100], 0.2)
            : addAlpha(theme.palette.neutral[900], 0.2),
        backdropFilter: 'blur(10px)',
      })}
      // borderRadius="md"
      borderTop="1px solid"
      borderColor="divider"
      height="60px"
      boxShadow="md">
      <Tabs
        sx={{
          flex: 4,
          width: '100%',
          bgcolor: 'transparent',
          color: 'text.primary',
        }}
        size="sm"
        width="100%"
        value={page}
        onChange={(e, v) => {
          if (menuItems[v].onClick) return menuItems[v].onClick(e);
          setPage(v);
        }}>
        <TabList
          sx={(theme) => ({
            gap: '4px',
            bgcolor: 'transparent',
            '--ListItemDecorator-color': theme.palette.text.primary,
            color: 'white',
          })}>
          {menuItems.map((item, i) => (
            <Tab
              key={i}
              orientation="vertical"
              color={page === i && 'primary'}
              sx={{
                flex: 1,
                fontSize: '10px',
                ...(i === 2 && {
                  bgcolor: 'transparent',
                  boxShadow: 'none',
                  '& .MuiSvgIcon-root': {
                    fontSize: item.size,
                  },
                }),
                color: item.color || (page !== i && 'text.primary'),
              }}>
              {item.icon && <ListItemDecorator>{item.icon}</ListItemDecorator>}
              {item.name}
            </Tab>
          ))}
        </TabList>
      </Tabs>

      <Dropdown
        labelProps={{
          flex: 1,
        }}
        label={
          <Flex column center color="text.primary" flex={1} sx={{ cursor: 'pointer', gap: '5px', mt: '1px' }}>
            <MenuIcon fontSize="12px" />
            <Typography level="body4" color="text.primary">
              More
            </Typography>
          </Flex>
        }>
        <DropdownItem sx={{ gap: '8px' }} onClick={() => setMode(mode === 'light' ? 'dark' : 'light')}>
          Theme
          <ThemeToggleButton onClick={() => {}} />
        </DropdownItem>
      </Dropdown>
    </Flex>
  );
};

export default Bottombar;
