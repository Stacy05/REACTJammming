import React from 'react';
import './SearchResults.css';
import { SearchBar } from '../SearchBar/SearchBar';
import { TrackList } from '../TrackList/TrackList';
import { Spotify } from '../../util/Spotify.js';

export class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.search = this.search.bind(this);

        //this.refineSearchArtist = this.refineSearchArtist.bind(this)
        //this.refineSearchAlbum = this.refineSearchAlbum.bind(this)
    };

    search(term) {
        Spotify.search(term).then(searchResults => this.setState({
            searchResults: searchResults
        }));
    }

    // refineSearchArtist() {
    //     //this.props.refineSearchArtist(this.props.track.artist)
    //     this.search(this.props.track.artist);
    // }

    // refineSearchAlbum() {
    //     this.props.refineSearchAlbum(this.props.track.album)
    // }
    render() {

        return (
            <div className="SearchResults">
                {/* onChange={this.handleTermChange} */}
                {/* <SearchBar onSearch={this.search} /> */}
                <h2>Results</h2>
                <TrackList
                    tracks={this.props.searchResults}
                    onAdd={this.props.onAdd}
                //onClick={this.refineSearchArtist}
                //refineSearchAlbum={this.props.refineSearchAlbum}
                />
            </div>
        );
    }
}

//export default SearchResults;
