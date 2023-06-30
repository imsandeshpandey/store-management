import Flex from 'components/basic-components/Flex';
import { useAuth } from 'contexts';
import { Alert, Avatar, Box, Button, Typography } from '@mui/joy';
import React from 'react';
import { Logout, Warning } from '@mui/icons-material';
import { Logo } from 'assets/logos';
import { useApp } from 'contexts';

const LoginPage = () => {
  const { signInWithGoogle, user, signOut } = useAuth();
  const { loginError } = useApp();

  return (
    <Flex center column height="100vh" gap="20px">
      <Typography
        level="h3"
        fontFamily="product sans"
        fontWeight={900}
        sx={{ color: 'text.tertiary' }}
        mb="20px">
        <Flex ai="center" gap="5px">
          <Logo height="35px" mb="3px" fullLogo />
          Store
        </Flex>
      </Typography>
      {user ? (
        <>
          <Flex border="1px solid" borderColor="divider" padding="16px 18px" borderRadius="md" center>
            <Avatar size="lg" src={user.photoURL} sx={{ mr: '8px' }} />
            <Flex column>
              <Typography level="h2" fontSize={20}>
                {user.displayName}
              </Typography>
              <Typography level="body3">{user.email}</Typography>
            </Flex>
          </Flex>
        </>
      ) : (
        <Button
          onClick={signInWithGoogle}
          variant="outlined"
          color="neutral"
          size="lg"
          startDecorator={
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Google_%22G%22_Logo.svg/588px-Google_%22G%22_Logo.svg.png?20230305195327"
              height="20px"
              alt="google-logo"
            />
          }>
          <Box fontFamily="product sans">Sign in with Google</Box>
        </Button>
      )}
      {loginError && (
        <Alert sx={{ userSelect: 'none' }} startDecorator={<Warning />} variant="outlined" color="neutral">
          {loginError}
        </Alert>
      )}
      {user && (
        <Button variant="outlined" color="danger" size="lg" startDecorator={<Logout />} onClick={signOut}>
          Log Out
        </Button>
      )}
    </Flex>
  );
};

export default LoginPage;
