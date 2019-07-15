import React from 'react';
import './SearchResults.css';
//import { search } from '../App/App';
import { TrackList } from '../TrackList/TrackList';
import { Spotify } from '../../util/Spotify.js';

export class SearchResults extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
        this.search = this.search.bind(this);

    };

    search(term) {
        Spotify.search(term).then(searchResults => this.setState({
            searchResults: searchResults
        }));
    }

    render() {

        return (
            <div className="SearchResults">
                {/* onChange={this.handleTermChange} */}
                {/* <SearchBar onSearch={this.search} /> */}
                <h2>Results</h2>
                <TrackList
                    tracks={this.props.searchResults}
                    onAdd={this.props.onAdd}
                    onSearch={this.props.searchResults}

                />
            </div>
        );
    }
}

//export default SearchResults;
