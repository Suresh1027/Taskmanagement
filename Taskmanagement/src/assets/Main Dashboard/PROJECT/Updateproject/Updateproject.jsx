import React, { useEffect, useState } from 'react'
import styles from '../Updateproject/Updateproject.module.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'
function Updateproject() {
    const { id } = useParams()
    const [updatepro, setupdatePro] = useState({
        name: "",
        description: "",
        budget: "",
        status: "",
        startDate: '',
        endDate: ''
    })

    useEffect(() => {
        async function getProject() {
            const response = await axios.get(`http://localhost:5000/updateproject/${id}`)
            const response1 = response.data
            setupdatePro(response1)
        }
        getProject()
    }, [])

    function handleInput(e) {
        setupdatePro({ ...updatepro, [e.target.name]: e.target.value })
    }

    async function handleSubmit(e) {
        e.preventDefault();
        try {
            const updateproject = await axios.put(`http://localhost:5000/updateproject/${id}`, updatepro);
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
                        <label htmlFor="taskTitle" className="form-label">status</label>
                        <input type="text" placeholder='title' className="form-control" id="taskTitle" name='status' value={updatepro.status} onChange={handleInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="taskTitle" className="form-label">startDate</label>
                        <input type="text" placeholder='title' className="form-control" id="taskTitle" name='startDate' value={updatepro.startDate} onChange={handleInput} />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="taskTitle" className="form-label">endDate</label>
                        <input type="text" placeholder='title' className="form-control" id="taskTitle" name='endDate' value={updatepro.endDate} onChange={handleInput} />
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