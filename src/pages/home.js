import React from 'react';
import { useHistory } from 'react-router-dom';
import './home.css';
import { BrowserRouter as Router } from 'react-router-dom';

const Home = () => {
    const history = useHistory();

    const handleButtonClick = () => {
        history.push('/login')
        window.location.reload();
    };

    return (
    <Router>
        <div className="home-container">
            <div className="background-image"></div>
            <div className="content">
                <h1 className="title fade-in">Welcome to ZotYourMusic!</h1>
                <p className="description fade-in">Rate and share your favorite songs with others.</p>
                <button className="cool-button" onClick={handleButtonClick}>Go to Login</button>
            </div>
        </div>
    </Router>
    );
};

export default Home;
