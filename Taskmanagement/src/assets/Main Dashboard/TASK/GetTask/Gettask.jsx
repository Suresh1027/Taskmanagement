import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import styles from './GetTask.module.css'
import axios from 'axios'
function Gettask() {
    const [GetTask, setGettask] = useState([])

    useEffect(() => {
        async function getTask() {
            const response = await axios.get('http://localhost:5000/tasks')
            const response1 = response.data.tasks
            setGettask(response1)
            console.log(response1);
            
        }
        getTask()
    }, [])
    return (
        <>
            <div className={"container d-flex align-item-center justify-content-center mt-2 gap-5"} style={{ width: "22rem" }} >
                {GetTask.map((task) => (
                    < div className="col-md-7" >
                        <div className=" mb-3">
                            <div className={`${styles.card} card`}>
                                <div className="card-body">
                                    <h5 className="card-title">{task.title}</h5>
                                    <p className="card-text">{task.status}</p>
                                    <p className='card-text'>{task.project.name}</p>
                                    <p className='card-text'>{task.assignedTo.username}</p>
                                    <p className='card-text'>{task.dueDate}</p>
                                    <p className="card-text">{task.description}</p>
                                    <Link to={'/'} className="btn btn-secondary">View Project</Link>
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