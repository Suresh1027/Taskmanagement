import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import styles from '../Getproject/Getproject.module.css'
import axios from 'axios';
function Getproject() {
    const [getData, setGetdata] = useState([]);
    console.log(getData);

    useEffect(() => {
        async function getProject() {
            const token = localStorage.getItem("token")
            const response = await axios.get(`http://localhost:5000/project/user/Individual`, {
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })
            console.log(response);
            
            const response1 = response.data
            console.log(response1);
            
            setGetdata(response1)
        }
        getProject()
    }, [])

    async function handleclick(id) {
        try {
            const deletepro = await axios.delete(`http://localhost:5000/project/delete/${id}`)
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
                                        <p className="card-text">{list.startDate?.substring(0,10)}</p>
                                        <p className="card-text">{list.endDate?.substring(0,10)}</p>
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