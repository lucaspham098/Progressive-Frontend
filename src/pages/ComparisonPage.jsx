import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { API_URL } from '../utils/utils';
import Modal from '../components/Modal/Modal';
import AdditionModal from '../components/AdditionModal/AdditionModal';

const ComparisonPage = () => {

    const [exerciseList, setExerciseList] = useState([])
    const [exerciseID, setExerciseID] = useState('')
    const [exerciseName, setExerciseName] = useState('')
    const [modal, setModal] = useState(false)
    const [additionModal, setAdditiionModal] = useState(false)


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

    const handleAdd = () => {
        setAdditiionModal(true)
    }

    const handleSubmit = (event) => {
        event.preventDefault()
        setAdditiionModal(false)

        const token = sessionStorage.getItem('JWTtoken');

        axios
            .post(`${API_URL}/exercises`, { exercise: event.target.name.value }, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err.response.data)
            })

        window.location.reload()
    }

    const handleDelete = (event) => {
        const token = sessionStorage.getItem('JWTtoken');
        const id = event.target.id
        console.log(event.target.id)
        axios
            .delete(`${API_URL}/exercises/id/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(res => {
                console.log(res)
            })
            .catch(err => {
                console.log(err.response.data)
            })

        window.location.reload()
    }

    return (
        <div>
            {modal && <Modal id={exerciseID} name={exerciseName} />}
            {exerciseList.map(exercise => {
                return (<div key={exercise.id} id={exercise.id} data-name={exercise.exercise_name} onClick={handleClick}>
                    {exercise.exercise_name}
                    <button onClick={handleDelete} id={exercise.id}>delete</button>
                </div>
                )
            })}
            <button onClick={handleAdd}>add new exercise</button>
            {additionModal && <AdditionModal heading='Exercise' handleSubmit={handleSubmit} />}
        </div>
    );
};

export default ComparisonPage;