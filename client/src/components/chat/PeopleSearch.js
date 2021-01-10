import React, { Component } from 'react';
import PeopleSearchItem from './PeopleSearchItem';

class PeopleSearch extends Component {
    render() { 
        return (
            <div className="people-search">
                <PeopleSearchItem/>
                <PeopleSearchItem/>
                <PeopleSearchItem/>
            </div>
        );
    }
}
 
export default PeopleSearch;