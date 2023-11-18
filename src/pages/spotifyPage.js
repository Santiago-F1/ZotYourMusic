import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, InputGroup, FormControl, Button, Row, Card } from 'react-bootstrap';
import { useHistory } from 'react-router-dom';
import { useState, useEffect } from 'react';

const CLIENT_ID = "private";
const CLIENT_SECRET = "private";


function SpotifyPage() {
    const [searchInput, setSearchInput] = useState('');
    const [accessToken, setAccessToken] = useState('');
    const [songList, setSongList] = useState([]);
    const [albumList, setAlbumList] = useState([]);
    const [selectedAlbum, setSelectedAlbum] = useState(null);
    const history = useHistory();

    useEffect(() => {
        var authParams = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
            body: 'grant_type=client_credentials&client_id=' + CLIENT_ID + '&client_secret=' + CLIENT_SECRET,
        }
        fetch('https://accounts.spotify.com/api/token', authParams)
            .then(result => result.json())
            .then(data => {
                setAccessToken(data.access_token)
                localStorage.setItem('accessToken', data.access_token)
                console.log(data.access_token)
            })
    }, [])

    async function handleRatingChange(songID, rating) {
        const userName = localStorage.getItem('username').toString()
        const password = localStorage.getItem('password').toString()
        console.log(userName)
        console.log(password)
        console.log(songID)
        console.log(rating)
        fetch(private=${userName}&password=${password}&songRating=${rating}&songName=${songID}`,{
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',}
        }).then(response => response.json())
        .then(data => 
            {
                console.log(data);
                if (data.editable == "true"){
                    history.push('/search')
                    window.location.reload();
                }
            })
    }
        

    async function getSongs(albumID) {
        var songs = await fetch('https://api.spotify.com/v1/albums/' + albumID + '/tracks', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            }
        })
            .then(response => response.json())
            .then(data => data.items);

        setSongList(songs);
        console.log(songs);
    }

    async function search() {
        console.log('searching for ' + searchInput);

        var searchParameters = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + accessToken,
            }
        }

        var artistID = await fetch('https://api.spotify.com/v1/search?q=' + searchInput + '&type=artist', searchParameters)
            .then(response => response.json())
            .then(data => data.artists.items[0].id)
        console.log(artistID);
        console.log("calling album");
        var albums = await fetch('https://api.spotify.com/v1/artists/' + artistID + '/albums?include_groups=album&offset=0&limit=50&market=US&locale=en-US,en', searchParameters)
            .then(response => response.json())
            .then(data => setAlbumList(data.items))
    }
    return (
        <div className='SpotifyPage'>
            <h1>Account logged in: {localStorage.getItem('username')}</h1>
            <Container>
                <InputGroup className="mb-3" size="lg">
                    <FormControl
                        placeholder="Search for a song"
                        type="input"
                        onKeyPress={(e) => {
                            if (e.key == "Enter") {
                                search()
                            }
                        }}
                        onChange={event => setSearchInput(event.target.value)}
                    />
                    <Button onClick={() => { search() }}>
                        Search
                    </Button>
                </InputGroup>
            </Container>
            <Container>
                {selectedAlbum ? (
                    <div>
                        <Button variant="primary" onClick={() => setSelectedAlbum(null)}>Back to Albums</Button>
                        <h2>Songs of {selectedAlbum.name}</h2>
                        {songList.map((song) => (
                            <div key={song.id}>
                                {song.name}
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <Button
                                        key={rating}
                                        variant="outline-primary"
                                        className="mx-1"
                                        onClick={() => handleRatingChange(song.id, rating)}
                                    >
                                        {rating}
                                    </Button>
                                ))}
                            </div>
                        ))}
                    </div>
                ) : (
                    <Row className="mx-2 row row-cols-4">
                        {albumList.map((album) => {
                            return (
                                <Card key={album.id}>
                                    <Card.Img src={album.images[0].url} />
                                    <Card.Body>
                                        <Card.Title>{album.name}</Card.Title>
                                        <Button variant="primary" onClick={() => {
                                            setSelectedAlbum(album);
                                            getSongs(album.id);
                                        }}>Rate Songs!</Button>
                                    </Card.Body>
                                </Card>
                            );
                        })}
                    </Row>
                )}
            </Container>
        </div>
    )
}

export default SpotifyPage;