import axios from 'axios';
import React from 'react';
import { API_URL } from '../../utils/utils';

const LoginSignupForm = () => {


    const handleSignup = (event) => {
        event.preventDefault()

    }

    const handleLogin = (event) => {
        event.preventDefault()
        console.log(API_URL)
        const item = {
            username: event.target.username.value,
            password: event.target.password.value
        }
        axios
            .post(`${API_URL}/login`, item)
            .then((res) => {
                console.log(res.data)
                sessionStorage.setItem("JWTtoken", res.data.token)
            })
            .catch(err => {
                console.log(err)
            })
    }


    return (
        <>
            <h1>asdfasfsf</h1>
            <form onSubmit={handleLogin}>
                <input type="text" name='username' placeholder='username' />
                <input type="text" name='password' placeholder='password' />
                <button>login</button>
            </form>
            <h2>not wag</h2>
            <form onSubmit={handleSignup}>
                <input type="text" name='username' placeholder='username' />
                <input type="text" name='password' placeholder='password' />
                <button>signup</button>
            </form>
        </>
    );
};

export default LoginSignupForm;