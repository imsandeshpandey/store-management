import { useResponsive } from 'hooks';
import Sidebar from './Sidebar/Sidebar';
import Bottombar from './BottomBar/Bottombar';

export const Navigation = (props) => {
  const { isMobile } = useResponsive();
  const Component = isMobile ? Sidebar : Bottombar;
  return <Component {...props} />;
};
