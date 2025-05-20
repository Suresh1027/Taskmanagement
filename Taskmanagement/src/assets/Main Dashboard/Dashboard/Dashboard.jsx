import { useEffect, useState } from 'react';
import styles from '../Dashboard/Dashboard.module.css';
import Createproject from '../PROJECT/Createproject/Createproject';
import Getproject from '../PROJECT/Getproject/Getproject';

function Dashboard() {
    const [logindata, setloginData] = useState('')

    useEffect(() => {
        const userdata = localStorage.getItem('user')
        setloginData(JSON.parse(userdata))

    }, [])
    return (
        <>
            <div className={styles.dashboardContainer}>
                <div className={`flex-grow-1 p-4 ${styles.mainContent}`}>
                    <div className={`${styles.mainContentHeader} d-flex justify-content-between align-items-center`}>
                        <h2>Dashboard</h2>
                        <div className="d-flex align-items-center">
                            <input type="text" className="form-control me-2" placeholder="Search..." />
                            <button className="btn btn-outline-secondary">Search</button>
                        </div>
                    </div>
                    <div className={`container-fluid ${styles.mainContentbody}`}>
                        {
                            logindata.userRole == "admin" ? (<Createproject />) : ('')
                        }
                        <Getproject />
                    </div>
                </div>
            </div>

        </>
    );
}

export default Dashboard;