import axios from 'axios';
import React, { useState } from 'react';
import { API_URL } from '../../utils/utils';
import './LoginSignupForm.scss'
import ErrorText from '../ErrorText/ErrorText';
import { useNavigate } from 'react-router-dom';
import logo from '../../assets/icons/logo.svg'


const LoginSignupForm = () => {
    const navigate = useNavigate()

    const [formTitle, setFormTitle] = useState('Login')
    const [loginUser, setLoginUser] = useState('')
    const [loginPass, setLoginPass] = useState('')
    const [signupUser, setSignupUser] = useState('')
    const [signupName, setSignupName] = useState('')
    const [signupPass, setSignupPass] = useState('')
    const [signupConfirmPass, setSignupConfirmPass] = useState('')
    const [loginUserError, setLoginUserError] = useState(false)
    const [loginUserErrorMessage, setLoginUserErrorMessage] = useState('')
    const [loginPassError, setLoginPassError] = useState(false)
    const [loginPassErrorMessage, setLoginPassErrorMessage] = useState(false)
    const [loginError, setLoginError] = useState('')
    const [loginErrorMessage, setLoginErrorMessage] = useState('')
    const [signupPassError, setSignupPassError] = useState(false)

    const handleSignup = (event) => {

        if (signupPass !== signupConfirmPass) {
            event.preventDefault()
            return setSignupPassError(true)
        }
        event.preventDefault()
        const token = sessionStorage.getItem('JWTtoken');

        axios
            .post(`${API_URL}/signup`, {
                username: signupUser,
                password: signupPass,
                name: signupName
            }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => {
                console.log(err)
            })
    }

    const handleLogin = (event) => {

        setLoginError(false)

        if (!loginUser || !loginPass) {
            event.preventDefault()
            if (!loginUser) {
                setLoginUserError(true)
                setLoginUserErrorMessage('Field Required')
            }
            if (!loginPass) {
                setLoginPassError(true)
                setLoginPassErrorMessage('Field Required')
            }
            return
        }

        event.preventDefault()
        const item = {
            username: loginUser,
            password: loginPass
        }
        axios
            .post(`${API_URL}/login`, item)
            .then((res) => {
                console.log(res.data)
                sessionStorage.setItem("JWTtoken", res.data.token)
                navigate('/')
                console.log('sent')
            })
            .catch(err => {
                console.log(err.response.data)
                setLoginError(true)
                setLoginErrorMessage(err.response.data)
            })


    }


    const handleFormChange = () => {
        setFormTitle('Signup')
        if (formTitle === 'Signup') {
            setFormTitle('Login')
        }
        setSignupUser('')
        setSignupName('')
        setSignupPass('')
        setSignupConfirmPass('')
    }

    const handleLoginUserChange = (event) => {
        setLoginUser(event.target.value)
        setLoginUserError(false)
    }
    const handleLoginPassChange = (event) => {
        setLoginPass(event.target.value)
        setLoginPassError(false)
    }
    const handleSignupUserChange = (event) => {
        setSignupUser(event.target.value)
    }
    const handleSignupPassChange = (event) => {
        setSignupPass(event.target.value)
    }
    const handleSignupConfirmPassChange = (event) => {
        setSignupConfirmPass(event.target.value)
        setSignupPassError(false)
    }
    const handleSignupNameChange = (event) => {
        setSignupName(event.target.value)
    }


    return (
        <>
            <div>
                <div className="login-signup__logo-container">
                    <img className='login-signup__logo' src={logo} alt="logo" />
                    <p className='login-signup__logo-text'>PROGRESSIVE</p>
                </div>
            </div>
            <div className='form-container'>
                <div className="form__title-container">
                    <h1 className='form__title'>{formTitle}</h1>
                </div>
                <div className="form__radio-container">
                    <input className='form__radio' type="radio" name="slider" id="login" defaultChecked onChange={handleFormChange} />
                    <label className='form__radio-label' htmlFor="login" >Login</label>
                    <input className='form__radio' type="radio" name="slider" id="signup" onChange={handleFormChange} />
                    <label className='form__radio-label' htmlFor="signup" >Signup</label>
                </div>

                {formTitle === 'Login' &&
                    <form className='form' onSubmit={handleLogin}>
                        <div className="form__input-container">
                            {loginError && <ErrorText message={loginErrorMessage} isLogin='error--login' />}
                            <input className='form__input' type="text" name='username' placeholder='Username' onChange={handleLoginUserChange} />
                            {loginUserError && <ErrorText message={loginUserErrorMessage} />}
                            <input className='form__input' type="password" name='password' placeholder='Password' onChange={handleLoginPassChange} />
                            {loginPassError && <ErrorText message={loginPassErrorMessage} />}
                            <button className='form__btn'>Login</button>
                        </div>
                    </form>}


                {formTitle === 'Signup' &&
                    <form className='form' onSubmit={handleSignup}>
                        <div className="form__input-container">
                            <input className='form__input' type="text" name='username' placeholder='Username' onChange={handleSignupUserChange} />
                            <input className='form__input' type="text" name='name' placeholder='Name' onChange={handleSignupNameChange} />
                            <input className='form__input' type="password" name='password' placeholder='Password' onChange={handleSignupPassChange} />
                            <input className='form__input' type="password" name='confirmPassword' placeholder='Confirm Password' onChange={handleSignupConfirmPassChange} />
                            {signupPassError && <ErrorText message='Passwords do not match' />}
                            {!signupUser || !signupPass || !signupName ?
                                <button className='form__btn form__btn--disabled' disabled>Signup</button> : <button className='form__btn'>Signup</button>}

                        </div>
                    </form>}
            </div>


        </>
    );
};

export default LoginSignupForm;