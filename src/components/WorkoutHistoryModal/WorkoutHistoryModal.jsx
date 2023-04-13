import React, { useEffect, useState } from 'react';
import './WorkoutHistoryModal.scss'
import axios from 'axios';
import { API_URL } from '../../utils/utils';
import DisplayTable from '../DisplayTable/DisplayTable';
import CloseBtn from '../CloseBtn/CloseBtn';


const WorkoutHistoryModal = ({ workoutName, workoutID, func, closeHistoryModal }) => {

    const [workoutArr, setWorkoutArr] = useState([])
    const [loading, setLoading] = useState(true);

    function formatDate(dateString) {
        const dateObject = new Date(dateString);

        const year = dateObject.getFullYear();
        const month = String(dateObject.getMonth() + 1).padStart(2, '0');
        const day = String(dateObject.getDate()).padStart(2, '0');

        const formattedDate = `${year}-${month}-${day}`;

        return formattedDate;
    }

    function displayDateFormat(dateString) {
        const date = new Date(dateString);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        };
        return date.toLocaleDateString('en-US', options);
    }

    useEffect(() => {
        const token = sessionStorage.getItem('JWTtoken');

        axios
            .get(`${API_URL}/exercise-data/dates/${workoutID}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            .then(res => {
                const dates = res.data.filter((obj, index, self) =>
                    index === self.findIndex((t) => t.date === obj.date)
                );


                const dateArr = (dates.map(item => {
                    return formatDate(item.date)
                }))

                console.log(dateArr.sort())

                const requests = dateArr.map(item => axios.get(`${API_URL}/exercise-data/workouts/${workoutID}/${item}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }))
                Promise.all(requests)
                    .then((responses) => {
                        const data = responses.map((response) => response.data)
                        setWorkoutArr(data.reverse())
                        setLoading(false);
                    })
                    .catch(err => {
                        console.log(err.response)
                    })
            })
            .catch(err => {
                console.log(err.response)
            })

    }, [])

    if (loading) {
        return <div>Loading...</div>;
    }


    return (
        <div className={`history-modal ${closeHistoryModal}`}>
            <CloseBtn func={func} />
            <p className="history-modal__heading">{workoutName}</p>

            {workoutArr && workoutArr.map((item, index) => {
                return <DisplayTable title={displayDateFormat(item[0].date)} arr={item} key={index} />
            })}
        </div>
    );
};

export default WorkoutHistoryModal;