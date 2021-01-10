import React, { Component } from "react";
import PeopleSearchItem from "./PeopleSearchItem";
import Badge from "../utils/badge";

class PeopleSearch extends Component {
    render() {
        return (
            <div className="people-search">
                <div className="people-selected">
                    {this.props.selectedPeople.map((person) => (
                        <Badge
                            person={person}
                            key={person.id}
                            select={(person) => this.props.toggleSelectedPeople(person)}
                        />
                    ))}
                </div>
                {this.props.people.map((person) => (
                    <PeopleSearchItem
                        key={person.id}
                        personId={person.id}
                        name={person.username}
                        email={person.email}
                        select={(person) => this.props.toggleSelectedPeople(person)}
                        selected={this.props.personIsSelected(person)}
                    />
                ))}
            </div>
        );
    }
}

export default PeopleSearch;