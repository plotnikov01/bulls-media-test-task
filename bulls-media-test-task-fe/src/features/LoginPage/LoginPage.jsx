import React from 'react';

import { Link } from 'react-router-dom';
import { Navigate } from 'react-router';
import { useForm } from 'react-hook-form';

import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin, userDataSelector } from '../../store/auth/index.js';

import { Button, Input } from '../../components/index.js';

import './loginPage.scss';

export const LoginPage = () => {
  const dispatch = useDispatch();
  const userData = useSelector(userDataSelector);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onChange',
  });

  const onSubmit = async (values) => {
    await dispatch(fetchLogin(values));
  };

  if (userData) {
    return <Navigate to="/admin" />;
  }

  return (
    <div className="login-wrapper">
      <div className="login">
        <h1>Login</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            placeholder="Email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', { required: 'Enter your email' })}
          />
          <Input
            type="password"
            placeholder="Password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', { required: 'Enter your password' })}
          />
          <Button title="Login" type="submit" />
        </form>

        <Link to="/registration">Registration</Link>
      </div>
    </div>
  );
};
