import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { setCookie } from '../../utils/cookie';
import { useDispatch, useSelector } from '../../services/store';
import { Preloader } from '@ui';
import {
  fetchLoginUser,
  selectIsLoading,
  selectErrorText,
  deleteErrorText
} from '../../slices/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(selectErrorText);
  const isLoading = useSelector(selectIsLoading);

  useEffect(() => {
    dispatch(deleteErrorText());
  }, [dispatch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(deleteErrorText());
    dispatch(fetchLoginUser({ email, password }))
      .unwrap()
      .then((payload) => {
        setCookie('accessToken', payload.accessToken);
        localStorage.setItem('refreshToken', payload.refreshToken);
      });
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <LoginUI
      errorText={error}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
