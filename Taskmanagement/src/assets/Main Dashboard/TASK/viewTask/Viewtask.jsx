import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../viewTask/Viewtask.module.css'
import { Link, useParams } from 'react-router-dom'
function Viewtask() {
    const { id } = useParams()
    const [task, getTask] = useState([])

    useEffect(() => {
        async function viewtask() {
            const response = await axios.get(`http://localhost:5000/task/viewtask/${id}`)
            const response1 = response.data.task
            getTask(response1)
            console.log(response.data.task);

        }
        viewtask()
    }, [])

    return (
        <>
            <div className={`${styles.cardcontainer}`}>
                <div className={`${styles.card} card`}>
                    <div className={`${styles.cardbody} card-body`}>
                        <p className="card-title">Title: {task.title}</p>
                        <p className="card-text">Description: {task.description}</p>
                        <p className='card-text'>Status: {task.status}</p>
                        <p className='card-text'>AssignedTo: {task.assignedTo?.username}</p>
                        <p className='card-text'>Project: {task.project?.name}</p>
                        <p className="card-text">Due Date: {task.dueDate?.substring(0,10)}</p>
                        <div>
                            <Link className={`${styles.cardbutton}`} to={`/Updatetask/${task._id}`}>Edit</Link>
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Viewtask