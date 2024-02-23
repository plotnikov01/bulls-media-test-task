import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchPatchUserData, fetchUserData, userDataSelector } from '../../store/auth/index.js';
import { Button, Input } from '../../components/index.js';
import { useForm } from 'react-hook-form';

import './adminPanel.scss';

const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;

const passwordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{2,}(?![.\n])(?!.*[\s])$/;

export const AdminPanel = () => {
  const dispatch = useDispatch();
  const userDataId = useSelector(userDataSelector);

  const [userData, setUserData] = useState([]);
  const [isEditable, setIsEditable] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (values) => {
    dispatch(fetchPatchUserData({ id: userDataId, payload: values }));
  };

  const getData = async () => {
    try {
      const action = await dispatch(fetchUserData(userDataId));
      setUserData(action.payload);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const toggleIsEditable = () => {
    setIsEditable((prev) => !prev);
  };

  return (
    <div className="admin-panel-wrapper">
      <div className="admin-panel">
        {isEditable ? (
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
        ) : (
          <>
            <h3>Email: {userData.email}</h3>
            <h3>Password: {userData.password}</h3>
          </>
        )}
        <Button
          onClick={toggleIsEditable}
          type="button"
          className={isEditable ? 'red' : ''}
          title={isEditable ? 'Cancel' : 'Update data'}
        />
      </div>
    </div>
  );
};
