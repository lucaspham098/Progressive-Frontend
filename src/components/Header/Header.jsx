import React, { useState } from 'react';
import './Header.scss'
import hamburger from '../../assets/icons/hamburger.svg'
import Overlay from '../Overlay/Overlay'
import NavModal from '../NavModal/NavModal';

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
            <p className='header__logo'>LOGO</p>
            {navModal && <NavModal close={handleClose} />}
            {navModal && <Overlay />}
        </div>
    );
};

export default Header;