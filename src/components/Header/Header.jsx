import React, { useState } from 'react';
import './Header.scss'
import hamburger from '../../assets/icons/hamburger.svg'
import Overlay from '../Overlay/Overlay'
import NavModal from '../NavModal/NavModal';
import logo from '../../assets/icons/logo.svg'

const Header = () => {
    const [navModal, setnavModal] = useState(false)

    const handleClick = () => {
        setnavModal(true)
    }
    const handleClose = () => {
        setnavModal(false)
    }


    return (
        <div className='header'>
            <img className='header__icon' src={hamburger} alt="hamburger" onClick={handleClick} />
            <div className='header__logo-container'>
                <img className='header__logo' src={logo} alt="logo" />
                <p className='header__logo-text'>PROGRESSIVE</p>
            </div>
            {navModal && <NavModal close={handleClose} />}
            {navModal && <Overlay />}
        </div>
    );
};

export default Header;