import { Outlet, useLocation } from 'react-router-dom';
import { View } from '../components';

const PublicLayout = () => {
  const { pathname } = useLocation();
  const isRegisterPageAndMobile =
    pathname === '/register' && window.innerWidth <= 567;

  return (
    <View display="flex" alignItems="center" justifyContent="center">
      <View
        display="flex"
        alignItems="center"
        justifyContent="center"
        height={isRegisterPageAndMobile ? 'auto' : '100vh'}
        width={['100%', '100%', 'auto']}
      >
        <Outlet />
      </View>
    </View>
  );
};

export default PublicLayout;
