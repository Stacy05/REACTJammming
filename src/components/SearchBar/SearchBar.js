import React from 'react';
import './SearchBar.css';


export class SearchBar extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            search: ''
        }
        this.search = this.search.bind(this);
        this.handleTermChange = this.handleTermChange.bind(this);
    }

    search(term) {
        this.props.onSearch(term);
    }


    handleClick() {
        console.log('this is:', this);
    }

    handleTermChange(event) {
        this.search(event.target.value);

    };



    render() {

        return (
            <div className="SearchBar" >
                <h2>Search</h2>
                <input
                    placeholder="Enter A Song, Album, or Artist"
                    onChange={this.handleTermChange}
                />

                {/* <button className="SearchButton">SEARCH</button> */}
            </div>
        );
    }
}

//export default SearchBar;
