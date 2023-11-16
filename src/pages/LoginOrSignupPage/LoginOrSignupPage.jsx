import React, { useEffect } from 'react';
import LoginSignupForm from '../../components/LoginSignupForm/LoginSignupForm.jsx';

const LoginOrSignup = () => {

    useEffect(() => {
        document.title = 'Progressive | Login/Signup';

    }, [])

    return (
        <div>
            <LoginSignupForm />
        </div>
    );
};

export default LoginOrSignup;