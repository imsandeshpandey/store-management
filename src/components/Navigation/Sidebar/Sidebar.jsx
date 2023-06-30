/* eslint-disable no-unused-vars */
import Flex from 'components/basic-components/Flex';
import {
  CallTwoTone as ContactIcon,
  ShoppingCartTwoTone as OrdersIcon,
  PeopleTwoTone as CustomersIcon,
  StoreMallDirectoryTwoTone as StoreIcon,
  KeyboardDoubleArrowRight as ExpandIcon,
  KeyboardDoubleArrowLeft as CollapseIcon,
  AddCircleTwoTone as CreateOrderIcon,
} from '@mui/icons-material';
import { Box, Button, ListItemDecorator, Tab, TabList, Tabs, Typography, useColorScheme } from '@mui/joy';
import { Logo } from 'assets/logos';
import { useApp } from 'contexts';

const menuItems = [
  {
    name: 'Orders',
    icon: <OrdersIcon />,
  },
  {
    name: 'Customers',
    icon: <CustomersIcon />,
  },
  {
    name: 'My Store',
    icon: <StoreIcon />,
  },
];
const Sidebar = ({ page, setPage, onClickOrder }) => {
  const { mode } = useColorScheme();
  const { sidebarExpanded, toggleSidebar } = useApp();

  const renderMenuItem = (label, icon, isActive, key) => {
    return (
      <Tab
        key={key}
        sx={{
          px: '24px',
          mt: '8px',
          py: '12px',
          fontWeight: 500,
          boxShadow: 'none',
          gap: '8px',
          ':hover': {
            bgcolor: 'background.level1',
          },
          ...(!isActive
            ? {
                color: 'text.primary',
              }
            : {
                bgcolor: 'background.surface',
              }),
        }}
        variant={isActive && 'plain'}
        color={isActive && 'primary'}>
        <ListItemDecorator sx={{ mx: !sidebarExpanded && 'auto' }}>{icon}</ListItemDecorator>
        <Typography level="body1" display={!sidebarExpanded && 'none'}>
          {label}
        </Typography>
      </Tab>
    );
  };

  return (
    <Box
      height="100%"
      width={sidebarExpanded ? 280 : 92}
      position="fixed"
      zIndex={999}
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      boxSizing="border-box"
      boxShadow="md"
      sx={(theme) => ({
        backgroundImage: theme.gradient.neutral,
        transition: 'width 0.3s',
      })}>
      <Box py="24px">
        <Flex position="fixed" mb="15vh" mt="4px" center={!sidebarExpanded} pl="26px">
          <Logo height="30px" fullLogo={sidebarExpanded} />
        </Flex>

        <Box mb="15vh" />
        <Box
          component={Tabs}
          value={page}
          onChange={(e, v) => {
            if (v === 3) return onClickOrder();
            setPage(v);
          }}
          boxSizing="border-box"
          bgcolor="transparent"
          orientation="vertical"
          sx={{ width: '100%', mx: 'auto' }}>
          <Box
            component={TabList}
            width="100%"
            bgcolor="transparent"
            sx={{
              '--ListItemDecorator-size': '24px',
              '--ListItemDecorator-color': 'inherit',
            }}>
            {menuItems.map(({ name, icon }, i) => renderMenuItem(name, icon, page === i ? true : false, i))}
            <Tab
              sx={{
                px: '24px',
                mt: '20px',
                py: '12px',
                fontWeight: 500,
                boxShadow: 'none',
                bgcolor: page === 3 && 'background.surface',
                gap: '8px',
                color: mode === 'light' ? 'primary.600' : 'primary.400',
                ':hover': {
                  bgcolor: 'background.level1',
                  color: mode === 'light' ? 'primary.600' : 'primary.400',
                },
              }}
              {...(page === 3 && {
                variant: 'plain',
                color: 'primary',
              })}>
              <ListItemDecorator sx={{ mx: !sidebarExpanded && 'auto' }}>
                <CreateOrderIcon />
              </ListItemDecorator>
              <Typography level="body1" display={!sidebarExpanded && 'none'} color="inherit">
                Create New Order
              </Typography>
            </Tab>
          </Box>
        </Box>
      </Box>
      <Flex column gap="10px">
        <SidebarButton icon={ContactIcon} label="Contact Support" color="neutral" />
        <Flex
          height={50}
          borderTop="1px solid"
          borderColor="divider"
          aiCenter
          jc={sidebarExpanded ? 'end' : 'center'}
          sx={{ cursor: 'pointer' }}
          onClick={toggleSidebar}>
          <Box color="text.secondary" px="30px" component={sidebarExpanded ? CollapseIcon : ExpandIcon} />
        </Flex>
      </Flex>
    </Box>
  );
};

export default Sidebar;

const SidebarButton = ({ icon, label, color, ...rest }) => {
  const { sidebarExpanded } = useApp();
  return (
    <Flex width="100%" px="4px">
      <Button
        variant="plain"
        color={color}
        sx={{
          mx: 'auto',
          py: '12px',
          justifyContent: sidebarExpanded && 'start',
          pr: 0,
          pl: sidebarExpanded ? '26px' : 'initial',
          ':hover': {
            bgcolor: 'background.level1',
          },
          ':active': {
            bgcolor: 'background.surface',
          },
        }}
        fullWidth
        startDecorator={sidebarExpanded && <Box component={icon} />}
        {...rest}>
        {sidebarExpanded ? label : <Box mx="auto" component={icon} />}
      </Button>
    </Flex>
  );
};
