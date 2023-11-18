import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import axios from 'axios';
import './viewUser.css';
import { Card, Row } from 'react-bootstrap';

const ViewUser = () => {
    const { username } = useParams(); // Extract username from the route
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const [albumList, setAlbumList] = useState([]);
    const [songList, setSongList] = useState([]);
    const [songData, setSongData] = useState([]);
    const history = useHistory();

    useEffect(() => {
        console.log('ViewUser.js');
        fetchAlbumList();
    }, [username]); // Fetch data when the username changes

    const fetchAlbumList = async () => {
        try {
            const response = await fetch(
                `private=${username}`,
                {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );
            console.log(`made username request for ${username}`);

            const data = await response.json();
            const songRatings = data.songRatings;
            const songData = [];

            const fetchPromises = [];

            for (const songId in songRatings) {
                console.log(songId);
                const rating = songRatings[songId];
                const fetchPromise = fetch(`https://api.spotify.com/v1/tracks/${songId}`, {
                    method: 'GET',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: 'Bearer ' + localStorage.getItem('accessToken'),
                    },
                })
                    .then((response) => response.json())
                    .then((data) => {
                        const songName = data.name;
                        console.log(songName);
                        songData.push({ songId, songName, rating });
                    });

                fetchPromises.push(fetchPromise);
            }

            await Promise.all(fetchPromises);

            setSongData(songData);
        } catch (error) {
            console.error('Error:', error);
            throw error;
        }
    };

    return (
        <div className='SpotifyPage'>
            <h1>Viewing: {username}'s song ratings</h1>
            {songData.length > 0 && (
                <div>
                    <h2>All Song Data:</h2>
                    {songData.map((song) => (
                        <div key={song.songId} className='SongData'>
                            <Row className="mx-2 row row-cols-4">
                                    <Card key={song.songId}>
                                        <Card.Body>
                                            <Card.Title>{song.songName}</Card.Title>
                                            <Card.Footer>{song.rating}</Card.Footer>
                                        </Card.Body>
                                    </Card>
                            </Row>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default ViewUser;