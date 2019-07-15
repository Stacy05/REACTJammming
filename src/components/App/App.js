import React from 'react';
//import logo from './logo.svg';
import './App.css';
//remove?
import { SearchBar } from '../SearchBar/SearchBar';
import { SearchResults } from '../SearchResults/SearchResults';
import { Playlist } from '../Playlist/Playlist';
import { Spotify } from '../../util/Spotify.js';

Spotify.getAccessToken();

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state =
            {
                searchResults: [],
                playlistName: 'My Playlist',
                playlistTracks: []
            }

        this.addTrack = this.addTrack.bind(this);
        this.removeTrack = this.removeTrack.bind(this);
        this.updatePlaylistName = this.updatePlaylistName.bind(this);
        this.savePlaylist = this.savePlaylist.bind(this);

        // remove?
        this.search = this.search.bind(this);


    };

    addTrack(track) {
        if (!this.state.playlistTracks.find(playlistTrack => playlistTrack.id === track.id)) {
            this.setState(prevState => ({
                playlistTracks: [...prevState.playlistTracks, track]
            }));
        }
    }

    removeTrack(track) {
        this.setState({
            playlistTracks: this.state.playlistTracks.filter(playlistTrack => playlistTrack.id !== track.id)
        });
    }

    updatePlaylistName(name) {
        this.setState({
            playlistName: name
        });
    }

    savePlaylist() {
        const trackURIs = this.state.playlistTracks.map(playlistTrack => playlistTrack.uri);
        Spotify.savePlaylist(this.state.playlistName, trackURIs);
        this.setState({ playlistTracks: [] });
        this.updatePlaylistName('Newest Playlist');
        console.info(trackURIs);
    }


    search(term) {
        Spotify.search(term).then(searchResults => this.setState({
            searchResults: searchResults
        }));
    }



    render() {
        return (
            <div>
                <h1><sub>easily</sub> Create A <span className="highlight">Spotify</span> Playlist
                <sup><img src={require('./Spotify_Icon_RGB_Green.png')} alt='spotify logo' className="spotifyLogo" /></sup>
                </h1>
                <div className="App">
                    <SearchBar onSearch={this.search} />
                    <div className='App-playlist'>
                        <SearchResults
                            onSearch={this.search}
                            searchResults={this.state.searchResults}
                            onAdd={this.addTrack}
                        />
                        <Playlist
                            name={this.state.playlistName}
                            tracks={this.state.playlistTracks}
                            onRemove={this.removeTrack}
                            onNameChange={this.updatePlaylistName}
                            onSave={this.savePlaylist}
                            onSearch={this.search}
                        />
                    </div>
                    <p><span className="info">Background image by <a href="https://unsplash.com/photos/WZ43jnCeWOs" target="_blank">Brian Kostiuk - @BriKost</a> from <a href="https://unsplash.com/" target="_blank">Unsplash</a>.</span></p>
                    <p><span className="info">Spotify references used: <a href="https://developer.spotify.com/branding-guidelines/" target="_blank">Branding Guidelines</a> &amp; <a href="https://developer.spotify.com/documentation/web-api/" target="_blank">Web API</a>.
                    </span></p>

                </div>

            </div>
        )
    }
}

export default App;
