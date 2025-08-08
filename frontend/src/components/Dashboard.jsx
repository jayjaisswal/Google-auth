import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
    const [userInfo, setUserInfo] = useState(null);
    const navigate = useNavigate();

    useEffect(()=>{
        const data = localStorage.getItem('user-info');
        const userData = JSON.parse(data);
        setUserInfo(userData);
        console.log("User Info:", userData);
    },[])

    const handleLogout = ()=>{
        localStorage.removeItem('user-info');
        navigate('/login');
    }

    return (
        <div className="dashboard-container">
            {userInfo && (
                <div className="profile-card">
                    <img 
                        src={userInfo.image} 
                        alt={userInfo.name} 
                        className="profile-image"
                        onError={(e) => e.target.src = "https://via.placeholder.com/120?text=User"} 
                    />
                    <h1 className="profile-name">{userInfo.name}</h1>
                    <h3 className="profile-email">{userInfo.email}</h3>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
            )}
        </div>
    )
}

export default Dashboard