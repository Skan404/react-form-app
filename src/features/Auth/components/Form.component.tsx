import { Input } from "designSystem/Input/Input.component";
import { Button } from "designSystem/Button/Button.component";

import { useDispatch, useSelector } from 'react-redux';
import type { AppDispatch } from 'redux/store';
import type { RootState } from 'redux/store';
import { setEmail, setPassword, submitForm } from 'features/Auth/redux/authSlice';
import React, { useCallback, useMemo } from 'react';
import { useNavigate } from "react-router-dom";


export function Form() {

  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  const { email, password, status, error } = useSelector((state: RootState) => state.form);

  const handleEmailChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setEmail(e.target.value));
    }, [dispatch]);
  
  const handlePasswordChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setPassword(e.target.value));
  }, [dispatch]);

  const isFormValid = useMemo(() => {
    console.log('Checking form validity');
    return email.includes('@') && password.length >= 6;
  }, [email, password]);

  const handleSubmit = useCallback(async (e: React.FormEvent) => {
    e.preventDefault();
    if(!isFormValid) return;

    try {
      await dispatch(submitForm()).unwrap();
      navigate('/dashboard');
    } catch (err) {
      console.error('Failed to submit form:', err);
    }

  }, [dispatch, navigate, isFormValid]);

    return (
        <div className='w-full max-w-md mx-auto mt-10'>
            <h1 className='text-2xl font-bold mb-6'>Enter data</h1>
            <form onSubmit={handleSubmit}>
                <Input
                    id="email"
                    label="Email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <Input
                    id="password"
                    label="Password"
                    type="password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <div className="mt-6">
                    <Button disabled={!isFormValid || status === 'loading'}> 
                        {status === 'loading' ? 'Loading...' : 'Submit'}
                    </Button>
                </div>
                {status === 'failed' && <p className="text-red-500 mt-2">{error}</p>}
            </form>
        </div>
    )
}