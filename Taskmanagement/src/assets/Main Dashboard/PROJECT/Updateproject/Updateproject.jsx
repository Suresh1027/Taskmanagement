import React, { useEffect, useState } from 'react'
import styles from '../Updateproject/Updateproject.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
function Updateproject() {
    const { id } = useParams()

    const [getStatus, setGetStatus] = useState([])

    const [updatepro, setupdatePro] = useState({
        name: "",
        description: "",
        budget: "",
        status: "",
        startDate: "",
        endDate: ""
    })

    useEffect(() => {
        async function getProject() {
            const response = await axios.get(`http://localhost:5000/project/update/${id}`)
            const response1 = response.data
            setupdatePro(response1)

            const response4 = await axios.get(`http://localhost:5000/project/status`);
            const response5 = response4.data.enumstatus
            setGetStatus(response5);
        }
        getProject()
    }, [])

    function handleInput(e) {
        setupdatePro({ ...updatepro, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const updateproject = await axios.post(`http://localhost:5000/project/update/${id}`, updatepro);
            alert("Successfully updated");
        } catch (error) {
            console.error("Update failed:", error);
            alert("Failed to update project");
        }
    }


    return (
        <>
            <form className={`${styles.form}`} onSubmit={handleSubmit}>
                <div className={`${styles.updatecon}`}>
                    <h1 className='card-header fs-5 '>Update Project</h1>
                    <div className="mb-3 mt-3">
                        <label htmlFor="taskTitle" className="form-label">Title</label>
                        <input type="text" placeholder='title' className="form-control" id="taskTitle" name='name' value={updatepro.name} onChange={handleInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="taskTitle" className="form-label">budget</label>
                        <input type="text" placeholder='title' className="form-control" id="taskTitle" name='budget' value={updatepro.budget} onChange={handleInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="taskTitle" className="form-label">description</label>
                        <textarea className="form-control" id="taskDescription" name='description' value={updatepro.description} onChange={handleInput}></textarea>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="taskPriority" className="form-label">Status</label>
                        <select className="form-select" name='status' value={updatepro.status} onChange={handleInput} id="taskPriority">
                            <option value="low">show status</option>
                            {
                                getStatus.map((status) => (
                                    <option value={status} key={status}>{status}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="taskTitle" className="form-label">startDate</label>
                        <input type="Date" placeholder='title' className="form-control" id="taskTitle" name='startDate' value={updatepro.startDate?.substring(0,10)} onChange={handleInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="taskTitle" className="form-label">endDate</label>
                        <input type="Date" placeholder='title' className="form-control" id="taskTitle" name='endDate' value={updatepro.endDate?.substring(0,10)} onChange={handleInput} />
                    </div>
                    <div >
                        <button className={`${styles.updatebtn}`}>Submit</button>
                    </div>

                </div>
            </form>
        </>
    )
}

export default Updateproject