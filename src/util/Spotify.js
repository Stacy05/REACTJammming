//import { SearchBar } from "../components/SearchBar/SearchBar";

let userAccessToken;
const accessTokenParam = window.location.href.match(/access_token=([^&]*)/);
const expirationParam = window.location.href.match(/expires_in=([^&]*)/);
//dev creds and redirect
// const clientID = '';
// const redirectURI = 'http://localhost:3000/';


// // live 
const clientID = '';
const redirectURI = 'https://musing-mcnulty-35c982.netlify.com';


export const Spotify = {

    getAccessToken() {
        if (userAccessToken) {
            return userAccessToken;
        }

        if (accessTokenParam && expirationParam) {
            userAccessToken = accessTokenParam[1];
            const expires = Number(expirationParam[1]);
            window.setTimeout(() => userAccessToken = '', expires * 1000);
            window.history.pushState('Access Token', null, '/');
            return userAccessToken;
        } else {

            const spotifyURI = `https://accounts.spotify.com/authorize?client_id=${clientID}&response_type=token&scope=playlist-modify-public&redirect_uri=${redirectURI}`;
            window.location = spotifyURI;
        }
    },

    async search(term) {
        const accessToken = Spotify.getAccessToken();
        const response = await fetch(`https://api.spotify.com/v1/search?type=track&q=${term}`, {
            headers: {
                Authorization: `Bearer ${accessToken}`
            }
        });
        const jsonResponse = await response.json();
        if (!jsonResponse.tracks) {
            return [];
        }
        return jsonResponse.tracks.items.map(track => ({
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            uri: track.uri
        }));

    },

    savePlaylist(name, trackURIs) {
        if (!name || !trackURIs || !trackURIs.length === 0) {
            return;
        }

        const accessToken = Spotify.getAccessToken();;
        const headers = {
            Authorization: `Bearer ${accessToken}`
        };

        let userID = undefined;
        let playlistID = undefined;

        fetch(`https://api.spotify.com/v1/me`, {
            headers: headers
        }).then(response =>

            response.json()




        ).then(jsonResponse => userID = jsonResponse.id
        ).then(() => {
            fetch(`https://api.spotify.com/v1/users/${userID}/playlists`, {
                method: 'POST',
                headers: headers,
                body: JSON.stringify(
                    { name: name })
            }).then(
                response => response.json()

            ).then(
                jsonResponse =>
                    playlistID = jsonResponse.id

            ).then(() => {
                fetch(`https://api.spotify.com/v1/users/${userID}/playlists/${playlistID}/tracks`, {
                    method: 'POST',
                    headers: headers,
                    body: JSON.stringify({
                        uris: trackURIs,
                    })
                });



            })
        });
    }

}
