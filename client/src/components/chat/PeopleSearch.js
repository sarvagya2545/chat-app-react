import React, { Component } from 'react';
import PeopleSearchItem from './PeopleSearchItem';

class PeopleSearch extends Component {
    render() { 
        return (
            <div className="people-search">
                {this.props.people.map(person => (
                    <PeopleSearchItem
                        key={person.id}
                        name={person.username}
                        email={person.email}
                    />
                ))}
            </div>
        );
    }
}
 
export default PeopleSearch;