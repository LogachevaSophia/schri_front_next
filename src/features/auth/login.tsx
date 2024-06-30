
import React, { useState } from 'react';
import { useLoginMutation } from './api';
import { Field, Form, Formik } from 'formik';
import Input from '../../shared/ui/Input/Input';
import * as Yup from 'yup';
import Button from '../../shared/ui/Button/Button';
import { useDispatch } from 'react-redux';
import { setToken } from '../user/userSlice';
import { unwrapResult } from '@reduxjs/toolkit';
// import { message } from 'antd';
import Spiner from '../../shared/ui/Spinner/Spinner';


interface FormValues {
    username: string;
    password: string;
}

const validationSchema = Yup.object().shape({
    username: Yup.string().required('Логин - обязательное поле'),
    password: Yup.string().required('Пароль - обязатльное поле'),
});

const initialValues: FormValues = {
    username: '',
    password: '',
};

interface LoginProps {
    close: () => void; // Обработчик клика
}


const Login: React.FC<LoginProps> = ({ close }) => {

    const dispatch = useDispatch();
    const [loginMutation, { isLoading }] = useLoginMutation();

    const handleLogin = async (values: FormValues) => {
        try {
            const resultAction = await loginMutation({ username: values.username, password: values.password });
            const result = resultAction.data;
            
            if (result) {
                const token = result.token;
                dispatch(setToken(token));
                localStorage.setItem("token", token)
                close();

            } else {

                console.error('Login failed: Unexpected result format');
                // message.error('Login failed: Unexpected result format')
            }
        } catch (error) {
            console.error('Login failed:', error);
            // message.error('Login failed: Unexpected result format')
            
        }
    };


    return (
        <Formik
            initialValues={initialValues}
            validationSchema={validationSchema}
            onSubmit={handleLogin}
            style={{backgroundColor: "red"}}
        >{({ values, errors, touched, handleChange }) => (
            <>
                {isLoading ? <Spiner/> : null}

                {!isLoading ? <Form style={{ width: "min-content", display: "flex", gap: "16px", flexDirection: "column" }}>
                    <Field
                        name="username"
                        as={Input}
                        label="Логин"
                        error={touched.username && errors.username ? errors.username : undefined}
                        isRequired={true}
                        placeholder={"Ввведите логин"}
                        value={values.username}
                        onChange={handleChange}
                    />
                    <Field
                        name="password"
                        as={Input}
                        label="Пароль"
                        isRequired={true}
                        error={touched.password && errors.password ? errors.password : undefined}
                        placeholder={"Ввведите Пароль"}
                        value={values.password}
                        onChange={handleChange}
                    />
                    <div style={{ display: "flex", gap: "8px" }}>
                        <Button key="submit" type="submit">
                            Войти
                        </Button>
                        <Button key="back" variant={"outlined"} type="button" onclick={() =>close()}>
                            Отменить
                        </Button>
                    </div>

                </Form> : null}</>
        )}</Formik>
    );
};

export default Login;
