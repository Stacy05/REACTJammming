import React from 'react';
import './Track.css';
import { SearchBar } from '../SearchBar/SearchBar';

export class Track extends React.Component {

    constructor(props) {
        super(props);

        this.addTrack = this.addTrack.bind(this)
        this.removeTrack = this.removeTrack.bind(this)
        this.renderAction = this.renderAction.bind(this)

        this.refineSearchArtist = this.refineSearchArtist.bind(this)
        // this.refineSearchAlbum = this.refineSearchAlbum.bind(this)
    }

    renderAction() {
        if (this.props.onRemove) {
            return <button className='Track-action' onClick={this.removeTrack}>-</button>;


        } else {

            return <button className='Track-action' onClick={this.addTrack}>+</button>;

        }
    }




    addTrack() {
        this.props.onAdd(this.props.track);
    }

    removeTrack() {
        this.props.onRemove(this.props.track);
    }

    refineSearchArtist() {
        this.props.search(this.props.track.artist);
    }

    // refineSearchAlbum() {
    //     this.props.refineSearchAlbum(this.props.track.album)
    // }

    render() {

        return (
            <div className="Track">
                <div className="Track-information">
                    <h3>{this.props.track.name}</h3>
                    <p><a onClick={this.refineSearchArtist}>{this.props.track.artist}</a> | <a onClick={this.refineSearchAlbum}>{this.props.track.album}</a></p>
                </div>
                {this.renderAction()}
            </div>
        );
    }
}

