import React, { useEffect, useState } from 'react'
import axios from 'axios'
import styles from '../Updatetask/Updatetask.module.css'
import { Link, useParams } from 'react-router-dom'
function Updatetask() {
    const { id } = useParams()

    const [getStatus, setGetStatus] = useState([]);
    const [updatetask, setUpdatetask] = useState({
        title: "",
        description: "",
        status: "",
        assignedTo: "",
        project: "",
        dueDate: ""
    })

    useEffect(() => {
        async function viewtask() {
            const response = await axios.get(`http://localhost:5000/task/viewtask/${id}`)
            const response1 = response.data.task
            setUpdatetask(response1)

            const response6 = await axios.get('http://localhost:5000/tasks/status');
            const response7 = response6.data.status;
            setGetStatus(response7);
        }
        viewtask()
    }, [])

    function handleInput(e) {
        setUpdatetask({ ...updatetask, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const updateform = await axios.put(`http://localhost:5000/task/updatetask/${id}`, updatetask)
            alert("Successfully updated");

        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update project");
        }
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div className={`${styles.updcardcontainer}`}>
                    <div className={`${styles.updcard} card`}>
                        <div className={`${styles.updcardbody} card-body`}>
                            <input type="text" name='title' value={updatetask.title} onChange={handleInput} />
                            <textarea name="description" value={updatetask.description} id="" onChange={handleInput}></textarea>
                            <select className="form-select" name='status' value={updatetask.status} onChange={handleInput} id="taskPriority">
                                <option value="low">show status</option>
                                {
                                    getStatus.map((status) => (
                                        <option key={status} value={status}>{status}</option>
                                    ))
                                }
                            </select>
                            <input type="text" name='assignedTo' value={updatetask.assignedTo?.username || ''} onChange={handleInput} />
                            <input type="text" name='project' value={updatetask.project?.name || ''} onChange={handleInput} />
                            <input type="Date" name='dueDate' value={updatetask.dueDate?.substring(0, 10)} onChange={handleInput} />
                            <div>
                                <button className={`${styles.updcardbutton}`}>Update</button>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

        </>
    )
}

export default Updatetask