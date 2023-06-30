import { Avatar, Typography } from '@mui/joy';
import React, { forwardRef } from 'react';
import Flex from 'components/basic-components/Flex';

import Dropdown, { DropdownItem } from 'components/basic-components/Dropdown/Dropdown';
import { useAuth } from 'contexts/AuthContext';
import { Logo } from 'assets/logos';
import { useResponsive } from 'hooks';

const Header = forwardRef((props, ref) => {
  const { isMobile } = useResponsive();
  const { signOut, user } = useAuth();

  return (
    <Flex ref={ref} aiCenter jc="space-between" py="24px" right={0} {...props}>
      <Flex column ai="start" gap="2px">
        {isMobile && <Logo fullLogo height="20px" />}
        <Typography level={isMobile ? 'body3' : 'h5'} fontFamily="product sans">
          Shiva and Sapana Traders
        </Typography>
      </Flex>
      <Dropdown
        label={
          <Flex aiCenter sx={{ cursor: 'pointer', gap: ['6px', '8px'] }}>
            <Flex column textAlign="right">
              <Typography level="h2" fontSize={[12, 20]} fontWeight={500}>
                {user?.displayName}
              </Typography>
              <Typography level="body4" fontSize={[8, 12]} fontWeight={500}>
                {user?.email.split('@')[0]}
              </Typography>
            </Flex>

            <Avatar
              src={user?.photoURL}
              sx={{
                width: [30, 35],
                height: [30, 35],
                border: `1px solid `,
                borderColor: 'text.tertiary',
              }}
              size="sm"
            />
          </Flex>
        }>
        <DropdownItem>My account</DropdownItem>
        <DropdownItem onClick={signOut}>Log Out</DropdownItem>
      </Dropdown>
    </Flex>
  );
});

export default Header;
