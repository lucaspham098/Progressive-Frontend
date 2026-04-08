import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/utils';
import './WorkoutModal.scss'
import axios from 'axios';
import CloseBtn from '../CloseBtn/CloseBtn';
import EmptyText from '../EmptyText/EmptyText';
import Spinner from '../Spinner/Spinner';

const WorkoutModal = ({ func, handleChooseWorkout, closeModal }) => {

    const [loading, setLoading] = useState(true)
    const [workoutList, setWorkoutList] = useState([])

    useEffect(() => {

        const token = sessionStorage.getItem('JWTtoken');

        axios
            .get(`${API_URL}/preset-workouts`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setWorkoutList(res.data)
                setLoading(false)
                console.log(res.data)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])



    return (
        <div className={`workout-modal ${closeModal}`}>
            <CloseBtn
                func={func}
            />
            <p className='workout-modal__heading'>Choose Workout</p>

            {loading ?
                <Spinner />
                :
                <div className="workout-modal__btn-container">
                    {workoutList.length === 0 && <EmptyText text='You have no workouts created. Create some on the workouts page.' />}
                    {workoutList && workoutList.map(item => {
                        return <button className='workout-modal__btn' key={item.id} id={item.id} onClick={handleChooseWorkout}>{item.workout_name}</button>
                    })}
                </div>
            }

        </div>
    );
};

export default WorkoutModal;