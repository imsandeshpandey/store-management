import { useMediaQuery } from 'react-responsive';

export const useResponsive = () => {
  const isMobile = useMediaQuery({ query: '(max-width: 40em)' });
  const isTablet = useMediaQuery({ query: '(max-width: 60em)' });
  return { isMobile, isTablet };
};
