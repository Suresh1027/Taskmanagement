import React, { useEffect, useState } from 'react';
import styles from './Createproject.module.css'
import axios from 'axios';

function Createproject() {
    const [getUser, setGetUser] = useState([])
    const [getStatus, setGetStatus] = useState([])

    const [postData, setPostdata] = useState({
        name: "",
        description: "",
        budget: "",
        team: '',
        status: '',
        startDate: "",
        endDate: "",
    })

    useEffect(() => {
        async function getproject() {

            const response2 = await axios.get(`http://localhost:5000/auth/getAllUsers`);
            const response3 = response2.data
            setGetUser(response3)

            const response4 = await axios.get(`http://localhost:5000/status`);
            const response5 = response4.data.enumstatus
            setGetStatus(response5);
        }
        getproject()
    }, [])

    function handleInput(e) {
        setPostdata({ ...postData, [e.target.name]: e.target.value })
    }

    async function handlesubmit(e) {
        e.preventDefault();
        const response = await axios.post('http://localhost:5000/projects', postData);
        alert("Project Created Successfully")
    }
    return (
        <>
            {/*this projects */}
            <div className={`${styles.projectcon} container-fluid d-flex align-item-center justify-content-center mt-4`} >
                <div>
                    <div className={`${styles.sidebar}`} >
                        <h5 className="card-title text-center">Create Project</h5>
                        <form className={styles.form} onSubmit={handlesubmit}>
                            <div className="mb-3">
                                <label htmlFor="taskTitle" className="form-label">Project Title</label>
                                <input type="text" placeholder='title' className="form-control" id="taskTitle" name='name' value={postData.name} onChange={handleInput} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="taskTitle" className="form-label">budget</label>
                                <input type="text" placeholder='Amount' className="form-control" id="taskTitle" name='budget' value={postData.budget} onChange={handleInput} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="taskPriority" className="form-label">Team</label>

                                <select className="form-select" name='team' value={postData.team} onChange={handleInput} id="taskPriority">
                                    <option value="low">show user</option>
                                    {
                                        getUser.map((user) => (
                                            <option value={user._id} key={user._id}>{user.username}</option>

                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="taskPriority" className="form-label">Status</label>
                                <select className="form-select" name='status' value={postData.status} onChange={handleInput} id="taskPriority">
                                    <option value="low">show status</option>
                                    {
                                        getStatus.map((status) => (
                                            <option value={status} key={status}>{status}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="taskDueDate" className="form-label">StartDate</label>
                                <input type="date" className="form-control" id="taskDueDate" name='startDate' value={postData.startDate} onChange={handleInput} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="taskDueDate" className="form-label">EndDate</label>
                                <input type="date" className="form-control" id="taskDueDate" name='endDate' value={postData.endDate} onChange={handleInput} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="taskDescription" className="form-label">Project Description</label>
                                <textarea className="form-control" id="taskDescription" name='description' value={postData.description} onChange={handleInput}></textarea>
                            </div>
                            <div className="mb-3 d-flex gap-5">
                                <button type="submit" className={`${styles.btn}`}>Create Project</button>
                                <button type='reset' className={`${styles.btn}`}>Reset</button>
                            </div>
                        </form>

                    </div>
                </div>
            </div >
            {/*this projects end */}
        </>
    )
}

export default Createproject