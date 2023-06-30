/* eslint-disable react-hooks/exhaustive-deps */
import { Suspense, useCallback, useEffect, useRef, useState } from 'react';
import { Outlet, useNavigate } from 'react-router-dom';
import { Box, CircularProgress, Sheet, Typography } from '@mui/joy';
import Flex from 'components/basic-components/Flex';
import ThemeToggleButton from 'theme/themeToggle';
import Sidebar from 'components/Navigation/Sidebar/Sidebar';
import Header from 'components/Header/Header';
import { useResponsive } from 'hooks/useResponsive';
import Bottombar from 'components/Navigation/BottomBar/Bottombar';
import { useApp } from 'contexts/AppContext';
import { SIDEBAR_COLLAPSED_WIDTH, SIDEBAR_EXPANDED_WIDTH } from 'constants/sidebar.constants';
import addAlpha from 'utils/addAlpha';
import OrderModal from '../CreateOrder/CreateOrder.modal';

const Layout = () => {
  const headerRef = useRef();
  const { isMobile } = useResponsive();
  const { sidebarExpanded, toggleTheme, darkTheme, headerHeight, setHeaderHeight } = useApp();

  const [page, setPage] = useState(0);
  const [scroll, setScroll] = useState(0);
  const [orderModalOpen, setOrderModalOpen] = useState(false);
  const navigate = useNavigate();
  const contentWidth = isMobile
    ? '100%'
    : sidebarExpanded
    ? `calc(100% - ${SIDEBAR_EXPANDED_WIDTH})`
    : `calc(100% - ${SIDEBAR_COLLAPSED_WIDTH})`;

  const pages = ['/orders', '/customers', '/my-store'];

  useEffect(() => {
    navigate(pages[page]);
  }, [page]);

  useEffect(() => {
    const onScroll = (e) => {
      setScroll(e.target.documentElement.scrollTop);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    setHeaderHeight(headerRef.current?.clientHeight);
  }, [isMobile]);

  const NavComponent = isMobile ? Bottombar : Sidebar;

  const renderFallback = useCallback(
    () => (
      <Flex width="100%" height="100%" center gap="10px">
        <CircularProgress />
        <Typography level="h2">Loading...</Typography>
      </Flex>
    ),
    []
  );

  return (
    <Flex>
      <Flex component={Sheet} bgcolor="background.surface" jc="end" width="100%">
        <Flex position="relative" width={contentWidth} aiCenter column sx={{ transition: '0.3s' }}>
          <Box height={headerHeight} />
          <Container mt={[0, '20px']}>
            <Suspense fallback={renderFallback()}>
              <Outlet />
            </Suspense>
          </Container>
        </Flex>
      </Flex>
      <OrderModal open={orderModalOpen} setOpen={setOrderModalOpen} />
      {!isMobile && (
        <Box
          sx={{
            position: 'fixed',
            bottom: 40,
            right: 40,
            transform: 'scale(1.6)',
            zIndex: 999,
          }}
          children={<ThemeToggleButton />}
          onClick={toggleTheme}
        />
      )}

      <Flex
        //Header
        ref={headerRef}
        width={contentWidth}
        position="fixed"
        jcCenter
        zIndex={1}
        right={0}
        top={0}
        borderBottom="1px solid"
        borderColor={scroll > 10 ? 'divider' : 'transparent'}
        sx={(theme) => ({
          transition: 'all 0.3s, background-color 0s',
          bgcolor: darkTheme
            ? addAlpha(theme.palette.neutral[1000], 0.5)
            : addAlpha(theme.palette.neutral[50], 0.5),
          backdropFilter: 'blur(15px)',
        })}>
        <Container>
          <Header />
        </Container>
      </Flex>
      <NavComponent
        page={page}
        setPage={setPage}
        onClickOrder={() => {
          setOrderModalOpen(true);
        }}
      />
    </Flex>
  );
};

const Container = (props) => (
  <Flex
    width="100%"
    column
    maxWidth={1920}
    px={['16px', '32px', '60px']}
    sx={{ transition: '0.3s', ...props.style }}
    {...props}
  />
);

export default Layout;
