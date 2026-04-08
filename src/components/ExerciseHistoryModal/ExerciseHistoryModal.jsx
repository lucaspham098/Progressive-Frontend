import React, { useEffect } from 'react';
import './ExerciseHistoryModal.scss'
import CloseBtn from '../CloseBtn/CloseBtn';
import EmptyText from '../EmptyText/EmptyText';
import { useState } from 'react';
import Spinner from '../Spinner/Spinner';
import axios from 'axios';
import { API_URL } from '../../utils/utils';

const ExerciseHistoryModal = ({ exerciseId, exerciseName, func, closeExerciseHistoryModal }) => {

    const [loading, setLoading] = useState(true)
    const [exerciseHistory, setExerciseHistory] = useState([])

    useEffect(() => {
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
                setLoading(false)
            })
            .catch((err) => {
                console.error(err)
            })
    }
        , [exerciseId])

    function displayDate(dateString) {
        const date = new Date(dateString);
        const options = { month: 'short', day: 'numeric' };
        const formattedDate = date.toLocaleDateString('en-US', options);
        return formattedDate;
    }

    return (
        <div className={`exercise-history-modal ${closeExerciseHistoryModal}`}>
            <div className="exercise-history-modal__desktop-container">
                <h1 className='exercise-history-modal__title'>{exerciseName}</h1>
                <CloseBtn func={func} />

                {loading ?
                    <Spinner />
                    :
                    <>
                        {exerciseHistory.length === 0 && < EmptyText text={`No data recorded for ${exerciseName}. Complete a workout that includes ${exerciseName} first`} modifier={'empty-text__container--modal'} />}
                        {exerciseHistory.length > 0 && <>
                            {exerciseHistory &&
                                <table className='exercise-history-modal__table'>
                                    <thead>
                                        <tr>
                                            <th>Date</th>
                                            <th>Weight (lbs)</th>
                                            <th>Set 1</th>
                                            <th>Set 2</th>
                                            <th>Set 3</th>
                                            <th>Training Volume</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {exerciseHistory.map(item => {
                                            return (
                                                <tr key={item.date}>
                                                    <td>{displayDate(item.date)}</td>
                                                    <td>{item.weight_lbs}</td>
                                                    <td>{item.set_1}</td>
                                                    <td>{item.set_2}</td>
                                                    <td>{item.set_3}</td>
                                                    <td>{item.training_volume}</td>
                                                </tr>
                                            )
                                        })}
                                    </tbody>
                                </table>}
                        </>}
                    </>
                }

            </div>
        </div>
    );
};

export default ExerciseHistoryModal;