import React, { useState } from 'react';
import { theme } from '../theme';
import styled from 'styled-components';
import Router from 'next/router';
import cookie from 'js-cookie';

const { colors, fonts } = theme;

const LoginLayout = styled.div`
    width: 100%;
    padding: 5vh 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10vh;
`;

const LoginFormBox = styled.div`
    width: 85vw;
    padding: 5vh 7.5vw;
    box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.25);
    border-radius: 20px;
    display: flex;
    flex-direction: column;
`;

const StyledLoginHeadline = styled.h1`
    width: 100%;
    text-align: center;
    margin-top: 0;
    margin-bottom: 5vh;
    background: linear-gradient(90.92deg, #ea4328 0.13%, #ffd400 100%);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
`;

const StyledInputField = styled.input`
    border: solid 1px black;
    border-radius: 200px;
    padding: 1vh 4vw;
    width: 100%;
    margin: 2vh 0;
`;

const StyledLoginButton = styled.input`
    align-self: center;
    padding: 1vh 8vw;
    border-radius: 200px;
    background-color: transparent;
`;

export const AdminOverview = () => {
    const [loginError, setLoginError] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    function handleSubmit(e) {
        e.preventDefault();
        //call api
        fetch('http://localhost:4000/api/application/getLoginToken', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                email,
                password,
            }),
        })
            .then((r) => {
                return r.json();
            })
            .then((data) => {
                if (data && data.error) {
                    setLoginError(data.message);
                }
                if (data && data.login_token) {
                    //set cookie
                    cookie.set('token', data.login_token, { expires: 2 });
                    Router.push('/adminOverview');
                }
                console.log(data);
            });
    }

    return (
        <LoginLayout>
            <form onSubmit={handleSubmit}>
                <LoginFormBox>
                    <StyledLoginHeadline>AdminOverview</StyledLoginHeadline>
                    <label>E-Mail:</label>
                    <StyledInputField
                        type="email"
                        placeholder="E-Mail"
                        name="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    ></StyledInputField>
                    <label>Passwort:</label>
                    <StyledInputField
                        type="password"
                        placeholder="Passwort"
                        name="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    ></StyledInputField>
                    <br />
                    <StyledLoginButton
                        type="submit"
                        value="Einloggen"
                    ></StyledLoginButton>
                    {loginError && <p style={{ color: 'red' }}>{loginError}</p>}
                </LoginFormBox>
            </form>
        </LoginLayout>
    );
};
