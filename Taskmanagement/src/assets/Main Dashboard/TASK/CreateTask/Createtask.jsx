import React, { useEffect, useState } from 'react'
import styles from './Createtask.module.css';
import axios from 'axios';

function Createtask() {
    const [getAllUsers, setGetAllUsers] = useState([]);
    const [getAllProjects, setGetAllProjects] = useState([]);
    const [getStatus, setGetStatus] = useState([]);

    const [postdata, setPostdata] = useState({
        title: "",
        description: "",
        status: "",
        assignedTo: "",
        project: "",
        dueDate: ''
    });

    useEffect(() => {
        async function getAllUsers() {
            const response = await axios.get('http://localhost:5000/auth/getAllUsers');
            const response1 = response.data;
            setGetAllUsers(response1);

            const response2 = await axios.get('http://localhost:5000/projects');
            const response3 = response2.data.projects;
            setGetAllProjects(response3);

            const response6 = await axios.get('http://localhost:5000/tasks/status');
            const response7 = response6.data.status;
            setGetStatus(response7);
            
        }
        getAllUsers()

    }, [])

    function handlechange(e) {
        setPostdata({ ...postdata, [e.target.name]: e.target.value })
    }


    async function handlesubmit(e) {
        e.preventDefault();
        console.log(postdata);
        
        const repsonse = await axios.post('http://localhost:5000/tasks', postdata);
        console.log(repsonse);
        alert("Task Created Successfully")
    }
    return (
        <>
            <div>
                <div className={`${styles.leftbar} card`}>
                    <div className="card-body">
                        <h5 className="card-title text-center">Create Task</h5>
                        <form className={styles.form} onSubmit={handlesubmit}>
                            <div className="mb-3">
                                <label htmlFor="taskTitle" className="form-label">Task Title</label>
                                <input type="text" className="form-control" placeholder='title' id="taskTitle" name='title' value={postdata.title} onChange={handlechange} />
                            </div>
                            <div className="mb-3">
                                <label htmlFor="taskPriority" className="form-label">AssignTo</label>
                                <select className="form-select" name='assignedTo' value={postdata.assignedTo} onChange={handlechange} id="taskPriority">
                                    <option value="low">show user</option>
                                    {getAllUsers.map((user) => (
                                        <option key={user._id} value={user._id}>{user.username}</option>
                                    ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="taskPriority" className="form-label">Project</label>
                                <select className="form-select" name='project' value={postdata.project} onChange={handlechange} id="taskPriority">
                                    <option value="low">show project</option>
                                    {
                                        getAllProjects.map((item) => {
                                            return (
                                                <option key={item._id} value={item._id}>{item.name}</option>
                                            )
                                        })
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="taskPriority" className="form-label">Status</label>
                                <select className="form-select" name='status' value={postdata.status} onChange={handlechange} id="taskPriority">
                                    <option value="low">show status</option>
                                    {
                                        getStatus.map((status) => (
                                            <option key={status} value={status}>{status}</option>
                                        ))
                                    }
                                </select>
                            </div>
                            <div className="mb-3">
                                <label htmlFor="taskDueDate" className="form-label">Due Date</label>
                                <input type="date" className="form-control" id="taskDueDate" name='dueDate' value={postdata.dueDate} onChange={handlechange} />
                            </div>


                            <div className="mb-3">
                                <label htmlFor="taskDescription" className="form-label">Task Description</label>
                                <textarea className="form-control" name='description' value={postdata.description} onChange={handlechange} id="taskDescription"></textarea>
                            </div>
                            <button type="submit" className={`${styles.button}`}>Create Task</button>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Createtask