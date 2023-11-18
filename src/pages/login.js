import React, { useState } from 'react';
import axios from 'axios';
import './login.css'; // Import CSS file for styling
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { API } from 'aws-amplify';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    
    const history = useHistory();

    const handleLogin = async () => {
        fetch(`private/?userName=${username}&password=${password}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if (data.editable === "true") {
                window.username = username;
                window.password = password;
                history.push('/search');
                localStorage.setItem('username', username);
                localStorage.setItem('password', password);
                window.location.reload();
            }
        })
        .catch((error) => {
            console.error('Error:', error);
        }); 
    };
    
    return (
        <Router>
            <div className="login-page">
                <h1>Login</h1>
                <input
                    type="text"
                    placeholder="Username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                />
                <input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
                <button onClick={handleLogin}>Login</button>
            </div>
        </Router>
    );
};
export default LoginPage;