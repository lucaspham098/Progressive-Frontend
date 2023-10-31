
import './NavModal.scss'
import backbtn from '../../assets/icons/backbtn.svg'
import { Link, useNavigate } from 'react-router-dom';

const NavModal = ({ open, func }) => {
    const navigate = useNavigate()

    const handleSignout = () => {
        sessionStorage.clear()
        navigate('/login-signup')
        func()
    }

    return (

        <div className={`nav-modal ${open}`}>
            <img className='nav-modal__btn' src={backbtn} alt="back button" onClick={() => { func() }} />
            <div className="nav-modal__flex-container">
                <div className='nav-modal__link-container'>
                    <Link className='nav-modal__link' to='/' onClick={() => {
                        func()
                    }}>Home</Link>
                    <Link className='nav-modal__link' to="/workouts" onClick={() => {
                        func()
                    }}>Workouts</Link>
                    <Link className='nav-modal__link' to='/exercises' onClick={() => {
                        func()
                    }}>Exercises</Link>
                </div>
                <div className='nav-modal__link-container'>
                    <p className='nav-modal__link' onClick={handleSignout}>Sign Out</p>
                </div>
            </div>
        </div>

    );
};

export default NavModal;