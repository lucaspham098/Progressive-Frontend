import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import './Header.scss'
import hamburger from '../../assets/icons/hamburger.svg'
import Overlay from '../Overlay/Overlay'
import NavModal from '../NavModal/NavModal';
import logo from '../../assets/icons/logo.svg'

const Header = () => {

    const [navModal, setnavModal] = useState(false)
    const [open, setOpen] = useState('')
    const [hasToken, setHasToken] = useState(null)
    const location = useLocation()

    const handleClick = () => {
        setnavModal(true)
        setOpen('nav-modal--open')
    }
    const handleClose = () => {
        setnavModal(false)
        setOpen('nav-modal--close')
    }

    useEffect(() => {
        if (sessionStorage.getItem('JWTtoken')) {
            setHasToken(true)
        } else {
            setHasToken(false)
        }
    }, [location.pathname])


    return (
        <>
            {hasToken && <div className='header'>
                <img className='header__icon' src={hamburger} alt="hamburger" onClick={handleClick} />
                <div className='header__logo-container'>
                    <img className='header__logo' src={logo} alt="logo" />
                    <p className='header__logo-text'>PROGRESSIVE</p>
                </div>
                <NavModal func={handleClose} open={open} />
                {navModal && <Overlay />}
            </div>}

        </>
    );
};

export default Header;