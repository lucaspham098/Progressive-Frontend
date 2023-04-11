import React from 'react';
import './NavModal.scss'
import backbtn from '../../assets/icons/backbtn.svg'
import { useNavigate } from 'react-router-dom';

const NavModal = ({ close }) => {
    const navigate = useNavigate()

    return (

        <div className='nav-modal'>
            <img className='nav-modal__btn' src={backbtn} alt="back button" onClick={close} />
            <div className="nav-modal__flex-container">
                <div className='nav-modal__link-container'>
                    <p className='nav-modal__link'>Home</p>
                    <p className='nav-modal__link'>Workouts</p>
                    <p className='nav-modal__link'>Exercises</p>
                </div>
                <div className='nav-modal__link-container'>
                    <p className='nav-modal__link'>Account</p>
                    <p className='nav-modal__link'>Sign Out</p>
                </div>
            </div>
        </div>

    );
};

export default NavModal;