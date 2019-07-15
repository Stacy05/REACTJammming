import React from 'react';
import './Playlist.css';
import { TrackList } from '../TrackList/TrackList';

export class Playlist extends React.Component {

    constructor(props) {
        super(props);
        this.state = { defaultValue: ' ' };

        this.handleNameChange = this.handleNameChange.bind(this);

        this.handleResetName = this.handleResetName.bind(this);


    }

    handleNameChange(event) {
        this.props.onNameChange(event.target.value);
    }

    handleResetName(event) {
        this.setState({ value: event.target.defaultValue });

    }


    render() {


        return (
            <div className="Playlist">
                <input defaultValue={'Enter Playlist Name'} onChange={this.handleNameChange} onClick={this.handleResetName} />
                <TrackList tracks={this.props.tracks} onRemove={this.props.onRemove} />
                <button className="Playlist-save" onClick={this.props.onSave}>SAVE TO SPOTIFY</button>
            </div>
        );
    }
}

//export default Playlist;
