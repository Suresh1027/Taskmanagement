import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from '../Getproject/Getproject.module.css'
import axios from 'axios';
function Getproject() {
    const [getData, setGetdata] = useState([]);

    useEffect(() => {
        async function getProject() {
            const response = await axios.get(`http://localhost:5000/projects`)
            const response1 = response.data.projects
            setGetdata(response1)
        }
        getProject()
    }, [])

    async function handleclick(id) {
        try {
            const deletepro = await axios.delete(`http://localhost:5000/deleteproject/${id}`)
            console.log(deletepro);
            alert("succesfully deleted")
        } catch (error) {
            console.error("server error", error);
            alert("project can't delete")
        }
    }
    return (
        <>
            <div className={`container-fluid ${styles.cardcont}`} >
                {
                    getData.map((list) => (
                        < div key={list._id}>
                            <div className=" mb-3">
                                <div className={`${styles.card} card`}>
                                    <div className="card-body">
                                        <h5 className="card-title">{list.name}</h5>
                                        <p className="card-text">{list.description}</p>
                                        <p className='card-text'>{list.budget}</p>
                                        <p className='card-text'>{list.status}</p>
                                        <p className='card-text'>{list.team.username}</p>
                                        <p className="card-text">{list.startDate}</p>
                                        <p className="card-text">{list.endDate}</p>
                                        <div>
                                            <Link to={`/Viewproject/${list._id}`} className={`${styles.btn}`}>View Project</Link>
                                            <Link className={`${styles.btn}`} onClick={() => handleclick(list._id)}>Delete</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                }
            </div >
        </>
    )
}

export default Getproject