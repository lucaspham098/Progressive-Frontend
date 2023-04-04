import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../utils/utils';
import Modal from '../components/Modal/Modal';

const ComparisonPage = () => {

    const [exerciseList, setExerciseList] = useState([])
    const [exerciseID, setExerciseID] = useState('')
    const [exerciseName, setExerciseName] = useState('')
    const [modal, setModal] = useState(false)

    useEffect(() => {
        const token = sessionStorage.getItem('JWTtoken');

        axios
            .get(`${API_URL}/exercises`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then((res) => {
                setExerciseList(res.data)
            })
            .catch((err) => {
                console.log(err.response.data)
            })

    }, [])

    const handleClick = (event) => {
        setExerciseID(event.target.id)
        setExerciseName(event.target.dataset.name)
        setModal(true)
    }


    return (
        <div>
            {modal && <Modal id={exerciseID} name={exerciseName} />}
            {exerciseList.map(exercise => {
                return (<div key={exercise.id} id={exercise.id} data-name={exercise.exercise_name} onClick={handleClick}>{exercise.exercise_name}</div>
                )
            })}
        </div>
    );
};

export default ComparisonPage;