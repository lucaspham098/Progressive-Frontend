import React from 'react';
import './NavModal.scss'
import backbtn from '../../assets/icons/backbtn.svg'
import { useNavigate } from 'react-router-dom';

const NavModal = ({ close }) => {
    const navigate = useNavigate()

    const handleSignout = () => {
        sessionStorage.clear()
        navigate('/login-signup')
        close()
    }

    return (

        <div className='nav-modal'>
            <img className='nav-modal__btn' src={backbtn} alt="back button" onClick={close} />
            <div className="nav-modal__flex-container">
                <div className='nav-modal__link-container'>
                    <p className='nav-modal__link' onClick={() => {
                        navigate('/')
                        close()
                    }}>Home</p>
                    <p className='nav-modal__link' onClick={() => {
                        navigate('/workouts')
                        close()
                    }}>Workouts</p>
                    <p className='nav-modal__link' onClick={() => {
                        navigate('/exercises')
                        close()
                    }}>Exercises</p>
                </div>
                <div className='nav-modal__link-container'>
                    <p className='nav-modal__link'>Account</p>
                    <p className='nav-modal__link' onClick={handleSignout}>Sign Out</p>
                </div>
            </div>
        </div>

    );
};

export default NavModal;