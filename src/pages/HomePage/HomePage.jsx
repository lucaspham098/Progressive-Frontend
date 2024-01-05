import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../../utils/utils';
import WorkoutModal from '../../components/WorkoutModal/WorkoutModal';
import './HomePage.scss'
import Overlay from '../../components/Overlay/Overlay';
import InputTable from '../../components/InputTable/InputTable';
import DisplayTable from '../../components/DisplayTable/DisplayTable';
import { useNavigate } from 'react-router-dom';
import ExerciseHistoryModal from '../../components/ExerciseHistoryModal/ExerciseHistoryModal';

const HomePage = () => {
    const navigate = useNavigate()

    if (!sessionStorage.getItem('JWTtoken')) {
        navigate('/login-signup')
    }

    const [user, setUser] = useState('')
    const [date, setDate] = useState('')
    const [modal, setModal] = useState(false)
    const [workoutList, setWorkoutList] = useState([])
    const [workoutID, setWorkoutID] = useState('')
    const [inProgress, setInProgress] = useState(false)
    const [completedWorkout, setCompletedWorkout] = useState([])
    const [closeModal, setCloseModal] = useState('')
    const [exerciseHistoryModal, setExerciseHistoryModal] = useState(false)
    const [exerciseHistory, setExerciseHistory] = useState([])
    const [exerciseName, setExerciseName] = useState('')
    const [closeExerciseHistoryModal, setCloseExerciseHistoryModal] = useState('')



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

        const currentDateSearchFormat = () => {
            const date = new Date();
            const year = date.getFullYear();
            const month = ('0' + (date.getMonth() + 1)).slice(-2);
            const day = ('0' + date.getDate()).slice(-2);
            const formattedDate = `${year}-${month}-${day}`;
            return formattedDate;
        }
        console.log(currentDateSearchFormat())

        axios
            .get(`${API_URL}/exercise-data/current-day/${currentDateSearchFormat()}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(res => {
                setCompletedWorkout(res.data)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])


    const handleOpenModal = () => {
        setModal(true)
        setCloseModal('')
    }

    const handleCloseModal = () => {
        setCloseModal('workout-modal--close')
        setTimeout(() => {
            setModal(false)
        }, 200);
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

    const getExerciseHistory = (exerciseId) => {

        const token = sessionStorage.getItem('JWTtoken');

        axios
            .get(`${API_URL}/exercises/id/${exerciseId}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                const dataChronological = [...res.data].sort((a, b) => {
                    return new Date(b.date) - new Date(a.date)
                })
                console.log(dataChronological)
                setExerciseHistory(dataChronological)
                setExerciseHistoryModal(true)
            })
            .catch((err) => {
                console.error(err)
            })
    }

    const handleCloseExerciseHistoryModal = () => {
        setCloseExerciseHistoryModal('exercise-history-modal--close')
        setTimeout(() => {
            setExerciseHistoryModal(false)
            setCloseExerciseHistoryModal('')
        }, 200);
    }


    return (
        <div className='home'>

            <div className="home__desktop-container">
                <p className='home__date'>{date}</p>
                <h1 className='home__title'>Hello {user}</h1>
                {!inProgress && completedWorkout.length === 0 &&
                    <>
                        <p className='home__text'>No Workout Completed Today</p>
                        <div className="home__btn-container">
                            <button className='home__btn' onClick={handleOpenModal}>Do a Workout Today</button>
                        </div>
                    </>}
            </div>

            {modal && <WorkoutModal func={handleCloseModal} handleChooseWorkout={handleChooseWorkout} closeModal={closeModal} />}
            {modal && < Overlay />}

            {exerciseHistoryModal &&
                <ExerciseHistoryModal
                    exerciseHistory={exerciseHistory}
                    exerciseName={exerciseName}
                    func={handleCloseExerciseHistoryModal}
                    closeExerciseHistoryModal={closeExerciseHistoryModal}
                />
            }
            {exerciseHistoryModal && <Overlay />}

            <div className="home__desktop-container">
                {inProgress &&
                    <>
                        <p className='home__text'>Workout In Progress</p>
                        <div className="home__select-container">
                            <select className='home__select' name="" id="" onChange={handleWorkoutChange} defaultValue=''>
                                <option disabled value=''>Switch Workouts</option>
                                {workoutList.map(workout => {
                                    return (<option key={workout.id} value={workout.id}>{workout.workout_name}</option>)
                                })}
                            </select>
                        </div>
                        <InputTable workout_id={workoutID} getExerciseHistory={getExerciseHistory} setExerciseName={setExerciseName} />
                    </>}
                {completedWorkout.length > 0 &&
                    <>
                        <p className='home__text'>Workout Completed Today</p>
                        <DisplayTable title={completedWorkout[0].workout_name} arr={completedWorkout} />
                    </>
                }
            </div>


        </div>
    );
};

export default HomePage;