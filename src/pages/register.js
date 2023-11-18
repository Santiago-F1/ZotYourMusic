import React, { useState } from 'react';
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const Register = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const history = useHistory();

    const handleUsernameChange = (event) => {
        setUsername(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Add your registration logic here
        console.log('Username:', username);
        console.log('Password:', password);
    };

    const handleRegister = () => {
            fetch(`private/?userName=${username}&password=${password}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            })
            .then(response => response.json())
            .then(data => {
                console.log(data);
                if (data.success === "true") {
                    console.log("success")
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
        <div className="login-page">
                <h1>Register</h1>
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
                <button onClick={handleRegister}>Register</button>
            </div>
    );
};

export default Register;
