import React from 'react';
import './Footer.scss'
import hamburger from '../../assets/icons/hamburger.svg'

const Footer = () => {
    return (
        <div className='footer'>
            <img className='footer__icon' src={hamburger} alt="hamburger" />
            <p className='footer__logo'>LOGO</p>
        </div>
    );
};

export default Footer;