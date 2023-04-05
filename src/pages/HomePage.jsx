import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../utils/utils';
import Button from '../components/Button/Button';
import WorkoutModal from '../components/WorkoutModal/WorkoutModal';

const HomePage = () => {

    const [user, setUser] = useState('')
    const [date, setDate] = useState('')
    const [buttonClick, setButtonClick] = useState(false)

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
        setButtonClick(true)
    }




    return (
        <div>
            <h1>Hello {user}</h1>
            <p>Today is {date}</p>

            <p>No Workout Completed Today</p>
            <Button text='Do a Workout Today?' func={handleClick} />

            {buttonClick && <WorkoutModal heading='Choose Workout' />}

        </div>
    );
};

export default HomePage;