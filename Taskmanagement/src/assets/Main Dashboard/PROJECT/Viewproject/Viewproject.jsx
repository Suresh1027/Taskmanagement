import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import styles from './Viewproject.module.css';
import Gettask from '../../TASK/GetTask/Gettask';
import Createtask from '../../TASK/CreateTask/CreatetasK'
function Viewproject() {
    const { id } = useParams();
    const [project, setProject] = useState([]);

    useEffect(() => {
        async function fetchProject() {
            try {
                const response = await axios.get(`http://localhost:5000/project/single/${id}`);
                const projectData = response.data.project;
                setProject(projectData);                

            } catch (error) {
                console.error("Failed to fetch project:", error);
            }
        }

        fetchProject();
    }, [id]);

    return (
        <div>
            <div className={`${styles.cardcontainer}`}>
                <div className={`${styles.card} card`}>
                    <div className={`${styles.cardbody} card-body`}>
                        <h3>View Project</h3>
                        <p className="card-title">Title: {project.name}</p>
                        <p className="card-text">Description: {project.description}</p>
                        <p className='card-text'>Budget: {project.budget}</p>
                        <p className='card-text'>Status: {project.status}</p>
                        <p className='card-text'>Team: {project.team?.username}</p>
                        <p className="card-text">Start Date: {project.startDate?.substring(0,10)}</p>
                        <p className="card-text">End Date: {project.endDate?.substring(0,10)}</p>
                        <div>
                            <Link className={`${styles.cardbutton}`} to={`/Updateproject/${project._id}`}>Edit</Link>
                        </div>
                    </div>
                </div>
                <Gettask />
                <div className={`conatiner-fluid ${styles.taskcon}`}>
                    <Createtask />
                </div>

            </div>
        </div >
    );
}

export default Viewproject;
