import { FC, SyntheticEvent, useState } from 'react';
import { LoginUI } from '@ui-pages';
import { useDispatch, useSelector } from '@store';
import { Navigate } from 'react-router-dom';
import {
  getError,
  getUserState,
  loginUser
} from '../../services/slices/userSlice/userSlice';

export const Login: FC = () => {
  const dispatch = useDispatch();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const error = useSelector(getError);
  const { isAuthenticated } = useSelector(getUserState);

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault();
    if (email && password) {
      dispatch(loginUser({ email, password }));
    }
  };

  if (isAuthenticated) {
    return <Navigate to='/' />;
  }

  return (
    <LoginUI
      errorText={error?.toString()}
      email={email}
      setEmail={setEmail}
      password={password}
      setPassword={setPassword}
      handleSubmit={handleSubmit}
    />
  );
};
