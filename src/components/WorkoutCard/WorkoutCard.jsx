import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../../utils/utils';
import deleteicon from "../../assets/icons/delete.svg"
import editicon from '../../assets/icons/edit.svg'
import './WorkoutCard.scss';

const ExerciseCard = ({ name, id, handleClick, handleAddExerciseClick, handleRemoveExerciseClick }) => {

    const [loadWorkout, setLoadWorkout] = useState([])


    useEffect(() => {
        const token = sessionStorage.getItem('JWTtoken');

        axios
            .get(`${API_URL}/preset-workouts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setLoadWorkout(res.data)
            })
            .catch(err => {
                console.log(err.response)
            })
    }, [])

    const handleDelete = () => {
        const token = sessionStorage.getItem('JWTtoken');

        axios
            .delete(`${API_URL}/preset-workouts/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(res => {
                console.log(res.data)
            })
            .catch(err => {
                console.log(err.response.data)
            })

        window.location.reload()

    }


    return (
        <div className='workout-card' onClick={handleClick} data-name={name} id={id}>
            <p className='workout-card__title' onClick={handleClick}>{name}</p>
            <img src={deleteicon} alt="delete icon" onClick={handleDelete} className='workout-card__delete' />
            <ul className="workout-card__list" onClick={handleClick}>
                {loadWorkout && loadWorkout.map(item => {
                    return <li className='workout-card__list-item' key={item.exercise_id}>- {item.exercise_name}</li>
                })}
            </ul>
            <div className="workout-card__btn-container">
                <button className='workout-card__btn' id={id} onClick={handleAddExerciseClick}>
                    <img className='workout-card__btn-icon' src={editicon} alt="edit icon" /> add exercise</button>
                <button className='workout-card__btn' id={id} onClick={handleRemoveExerciseClick}>
                    <img className='workout-card__btn-icon' src={editicon} alt="edit icon" /> remove exercise</button>
            </div>
        </div>
    );
};

export default ExerciseCard;