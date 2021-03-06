import React, {useContext, useEffect, useState} from 'react';
import {AuthContext, AdminContext} from "../context";
import GoogleLogin from "react-google-login";
import {refreshTokenSetup} from "../utils/refreshToken";
import UserApi from "../api/UserApi";

const Login = () => {
    const {isAuth, setIsAuth} = useContext(AuthContext);
    const {isAdmin, setIsAdmin} = useContext(AdminContext);

    const login = event => {
        event.preventDefault();
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
    }

    const onSuccess = (res) => {
        console.log('Login Success: currentUser:', res.profileObj);
        refreshTokenSetup(res);
        setIsAuth(true);
        localStorage.setItem('auth', 'true')
        UserApi.loginUser(res.profileObj).then(function(response) {
                    const id = response.data.user_id;
                localStorage.setItem('current_user_id', id);
            localStorage.setItem('isAdmin', response.data.is_admin);
            setIsAdmin(response.data.is_admin);
                })
    };

    const onFailure = (res) => {
        console.log('Login failed: res:', res);
        alert(
            `Failed to login`
        );
    };

    const clientID = process.env.REACT_APP_GOOGLE_CLIENT_ID
    return (
        <div className="login">
            <h1>MedKit Authorization</h1>
            <div className="login__btn">
                <GoogleLogin
                    clientId={clientID}
                    buttonText="Login"
                    onSuccess={onSuccess}
                    onFailure={onFailure}
                    cookiePolicy={'single_host_origin'}
                    style={{ marginTop: '200px' }}
                    isSignedIn={true}
                />
            </div>
        </div>
    );
};

export default Login;