import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/utils';
import WorkoutModal from '../../components/WorkoutModal/WorkoutModal';
import './HomePage.scss'
import Overlay from '../../components/Overlay/Overlay';

const HomePage = () => {

    const [user, setUser] = useState('')
    const [date, setDate] = useState('')
    const [modal, setModal] = useState(false)

    useEffect(() => {
        const token = sessionStorage.getItem('JWTtoken');

        axios
            .get(`${API_URL}/users`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setUser(res.data[0].name)
            })
            .catch(err => {
                console.log(err.response)
            })

        function getCurrentDate() {
            const date = new Date();
            const monthNames = ["January", "February", "March", "April", "May", "June",
                "July", "August", "September", "October", "November", "December"];
            const monthIndex = date.getMonth();
            const day = date.getDate();
            const year = date.getFullYear();
            return `${monthNames[monthIndex]} ${day}, ${year}`;
        }

        setDate(getCurrentDate())
    }, [])


    const handleClick = () => {
        setModal(true)
        if (modal) {
            setModal(false)
        }
    }




    return (
        <div className='home'>
            <p className='home__date'>{date}</p>
            <h1 className='home__title'>Hello {user}</h1>

            <p className='home__text'>No Workout Completed Today</p>
            <div className="home__btn-container">
                <button className='home__btn' onClick={handleClick}>Do a Workout Today</button>
            </div>

            {modal && <WorkoutModal func={handleClick} />}
            {modal && <Overlay />}


        </div>
    );
};

export default HomePage;