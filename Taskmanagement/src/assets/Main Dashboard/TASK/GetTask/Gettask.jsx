import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from './GetTask.module.css'
import axios from 'axios'
function Gettask() {
    const [GetTask, setGettask] = useState([])
    useEffect(() => {
        async function getTask() {
            const token = localStorage.getItem("token")
            const response = await axios.get(`http://localhost:5000/task/user/individual`,{
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response);
            
            const response1 = response.data
            console.log(response1);
            
            setGettask(response1)
        }
        getTask()
    }, [])

    async function handledelete(id) {
        try {

            const deletetask = await axios.delete(`http://localhost:5000/task/deletetask/${id}`)
            console.log(deletetask);
            alert("succesfully deleted")
            setGettask(prev => prev.filter(t => t._id !== id));
        } catch (error) {
            console.error("server error", error);
            alert("project can't delete")
        }
    }
    return (
        <>
            <div className={`${styles.gettaskcon}`}>
                {GetTask.map((task) => (
                    < div className="" key={task._id}>
                        <div className=" mb-3">
                            <div className={`${styles.card} card`}>
                                <div className="card-body">
                                    <h5 className="card-title">{task.title}</h5>
                                    <p className="card-text">{task.status}</p>
                                    <p className='card-text'>{task.project.name}</p>
                                    <p className='card-text'>{task.assignedTo.username}</p>
                                    <p className='card-text'>{task.dueDate?.substring(0, 10)}</p>
                                    <p className="card-text">{task.description}</p>
                                    <div className='d-flex justify-content-between align-items-center'>
                                        <Link to={`/Viewtask/${task._id}`} className="btn btn-secondary">View</Link>
                                        <button className="btn btn-secondary" onClick={() => handledelete(task._id)}>Delete</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div >
        </>
    )
}

export default Gettask