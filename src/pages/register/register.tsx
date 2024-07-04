import { FC, SyntheticEvent, useEffect, useState } from 'react';
import { RegisterUI } from '@ui-pages';
import { useSelector, useDispatch } from '../../services/store';
import { Preloader } from '@ui';
import { setCookie } from '../../utils/cookie';
import {
  fetchRegisterUser,
  getUserThunk,
  deleteErrorText,
  selectErrorText,
  selectIsLoading
} from '../../slices/userSlice';

export const Register: FC = () => {
  const dispatch = useDispatch();
  const [userName, setUserName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const isLoading = useSelector(selectIsLoading);
  const error = useSelector(selectErrorText);

  useEffect(() => {
    dispatch(deleteErrorText());
  }, [dispatch]);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    dispatch(
      fetchRegisterUser({
        name: userName,
        password: password,
        email: email
      })
    )
      .unwrap()
      .then((payload) => {
        localStorage.setItem('refreshToken', payload.refreshToken);
        setCookie('accessToken', payload.accessToken);
        dispatch(getUserThunk());
      });
  };

  if (isLoading) {
    return <Preloader />;
  }

  return (
    <RegisterUI
      errorText={error}
      email={email}
      userName={userName}
      password={password}
      setEmail={setEmail}
      setPassword={setPassword}
      setUserName={setUserName}
      handleSubmit={handleSubmit}
    />
  );
};
