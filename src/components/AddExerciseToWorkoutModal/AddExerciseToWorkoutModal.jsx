import React, { useEffect, useState } from 'react';
import './AddExerciseToWorkoutModal.scss'
import { API_URL } from '../../utils/utils';
import axios from 'axios';
import CloseBtn from '../CloseBtn/CloseBtn';
import EmptyText from '../EmptyText/EmptyText'
import { uuid } from 'uuidv4';

const AddExerciseToWorkoutModal = ({ workoutID, func }) => {
    const { v4: uuidv4 } = require('uuid');
    const [exerciseInWorkout, setExerciseInWorkout] = useState([])
    const [availableExercises, setAvailableExercises] = useState([])
    const [listOfExercises, setListOfExercises] = useState([])

    useEffect(() => {
        const token = sessionStorage.getItem('JWTtoken');

        const requests = [
            axios
                .get(`${API_URL}/exercises/no-workout/${workoutID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }),
            axios
                .get(`${API_URL}/preset-workouts/${workoutID}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })
        ]

        Promise.all(requests)
            .then((res) => {
                const [firstReq, secondReq] = res

                console.log(firstReq.data)
                console.log(secondReq.data)

                let availableExercises = firstReq.data.map(item => {
                    if (!secondReq.data.find(secondItem => secondItem.exercise_id === item.exercise_id)) {
                        return item
                    }
                }).filter(item => item)


                for (let i = 0; i < availableExercises.length - 1;) {
                    if (availableExercises[i].exercise_id === availableExercises[i + 1].exercise_id) {
                        availableExercises.splice(i + 1, 1)
                    } else {
                        i++
                    }
                }


                console.log(availableExercises)

                setAvailableExercises(availableExercises)
            })
            .catch(err => {
                console.log(err)
            })

    }, [])

    const handleSelect = (event) => {
        const id = event.target.id;
        if (listOfExercises.some(exercise => exercise.exercise_id === id)) {
            console.log(`Exercise ${id} already exists in list.`);
        } else {
            setListOfExercises([...listOfExercises, { id: uuidv4(), exercise_id: id }]);
        }
        event.target.classList.add('add-exercise-modal__exercise--selected')
    }

    const handleAdd = () => {
        const token = sessionStorage.getItem('JWTtoken');

        const reqBody = listOfExercises.map(item => {
            return {
                ...item,
                workout_id: workoutID
            }
        })
        console.log(reqBody)

        axios
            .post(`${API_URL}/exercises/add-to-workout`, reqBody, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(res => {
                console.log(res)
                window.location.reload()
            })
            .catch(err => {
                console.log(err.response.data)
            })


    }

    return (
        <div className='add-exercise-modal'>
            <CloseBtn func={func} />
            <p className='add-exercise-modal__title'>Choose Which Exercises to Add</p>
            {availableExercises.length === 0 && <EmptyText text={'No available exercises to add.'} modifier={'empty-text__container--higher'} />}

            <div className="add-exercise-modal__exercise-container">
                {availableExercises && availableExercises.map(item => {
                    return (
                        <p key={item.exercise_id} id={item.exercise_id} onClick={handleSelect} className='add-exercise-modal__exercise'>{item.exercise_name}</p>
                    )
                })}
            </div>
            {listOfExercises.length === 0 ? <button disabled className='add-exercise-modal__btn--disabled'>Add</button> : <button onClick={handleAdd} className='add-exercise-modal__btn'>Add</button>}
        </div>
    );
};

export default AddExerciseToWorkoutModal;