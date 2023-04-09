import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/utils';
import WorkoutModal from '../../components/WorkoutModal/WorkoutModal';
import './HomePage.scss'
import Overlay from '../../components/Overlay/Overlay';
import InputTable from '../../components/InputTable/InputTable';

const HomePage = () => {

    const [user, setUser] = useState('')
    const [date, setDate] = useState('')
    const [modal, setModal] = useState(false)
    const [workoutList, setWorkoutList] = useState([])
    const [workoutID, setWorkoutID] = useState('')
    const [inProgress, setInProgress] = useState(false)

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

    const handleChooseWorkout = (event) => {
        const token = sessionStorage.getItem('JWTtoken');

        axios
            .get(`${API_URL}/preset-workouts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setWorkoutList(res.data)
            })
            .catch((err) => {
                console.log(err.response)
            })
        setWorkoutID(event.target.id)
        setInProgress(true)
        setModal(false)

    }

    const handleWorkoutChange = (event) => {
        setWorkoutID(event.target.value)
    }


    return (
        <div className='home'>
            <p className='home__date'>{date}</p>
            <h1 className='home__title'>Hello {user}</h1>

            {!inProgress &&
                <>
                    <p className='home__text'>No Workout Completed Today</p>
                    <div className="home__btn-container">
                        <button className='home__btn' onClick={handleClick}>Do a Workout Today</button>
                    </div>
                </>}

            {modal && <WorkoutModal func={handleClick} handleChooseWorkout={handleChooseWorkout} />}
            {modal && <Overlay />}

            {inProgress &&
                <>
                    <p className='home__text'>Workout In Progress</p>
                    <select name="" id="" onChange={handleWorkoutChange} defaultValue=''>
                        <option disabled value=''>Switch Workouts</option>
                        {workoutList.map(workout => {
                            return (<option key={workout.id} value={workout.id}>{workout.workout_name}</option>)
                        })}
                    </select>
                    <InputTable workout_id={workoutID} />
                </>}

        </div>
    );
};

export default HomePage;