import React from 'react';

import { useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';

import { fetchRegister } from '../../store/auth/index.js';

import { Button, Input } from '../../components/index.js';

import './registrationPage.scss';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{2,}(?![.\n])(?!.*[\s])$/;

export const RegistrationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: 'onSubmit',
  });

  const onSubmit = async (values) => {
    await dispatch(fetchRegister(values));
    navigate('/login');
  };

  return (
    <div className="registration-wrapper">
      <div className="registration">
        <h1>Registration</h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Input
            type="email"
            placeholder="Email"
            error={Boolean(errors.email?.message)}
            helperText={errors.email?.message}
            {...register('email', {
              required: 'Enter your email',
              pattern: {
                value: emailRegex,
                message: 'Invalid email address',
              },
            })}
          />
          <Input
            type="password"
            placeholder="Password"
            error={Boolean(errors.password?.message)}
            helperText={errors.password?.message}
            {...register('password', {
              required: 'Enter your password',
              minLength: {
                value: 6,
                message: 'Password must be at least 6 characters',
              },
              maxLength: {
                value: 20,
                message: 'Password must not exceed 20 characters',
              },
              pattern: {
                value: passwordRegex,
                message:
                  'Password must contain at least one uppercase letter, one lowercase letter, one number, one special character, and cannot start or end with a special character',
              },
            })}
          />
          <Button title="Register" type="submit" />
        </form>
        <h2>Do you already have an account?</h2>
        <Link to="/login">Login</Link>
      </div>
    </div>
  );
};
