import { FC } from 'react';
import { useLocation, redirect } from 'react-router-dom';
import { ProfileMenuUI } from '@ui';
import { deleteCookie } from '../../utils/cookie';
import { useDispatch } from '../../services/store';
import { fetchLogout } from '../../slices/userSlice';

export const ProfileMenu: FC = () => {
  const { pathname } = useLocation();
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(fetchLogout())
      .unwrap()
      .then((payload) => {
        if (payload.success) {
          localStorage.removeItem('refreshToken');
          deleteCookie('accessToken');
        }
      });
    redirect('/');
  };

  return <ProfileMenuUI handleLogout={handleLogout} pathname={pathname} />;
};
