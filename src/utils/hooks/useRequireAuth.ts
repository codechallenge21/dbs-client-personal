import Cookies from 'js-cookie';
import { useLoginContext } from '@/context/LoginContext';

export const useRequireAuth = () => {
  const { setIsLoginOpen } = useLoginContext();

  const requireAuth = (): boolean => {
    const isLoggedIn = Cookies.get('u_info');
    if (!isLoggedIn) {
      setIsLoginOpen(true);
      return false;
    }
    return true;
  };

  return { requireAuth };
};
