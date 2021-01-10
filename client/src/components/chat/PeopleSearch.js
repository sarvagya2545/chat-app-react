import React, { Component } from "react";
import PeopleSearchItem from "./PeopleSearchItem";
import Badge from "../utils/badge";

class PeopleSearch extends Component {
    state = {
        // ids of selected people
        selectedPeople: [],
    };

    personIsSelected = (person) => {
        const arr = this.state.selectedPeople;

        for (let i = 0; i < arr.length; i++) {
            if (arr[i].id === person.id) {
                return true;
            }
        }

        return false;
    };

    toggleSelectedPeople = (person) => {
        if (!this.personIsSelected(person)) {
            console.log("push");
            this.setState({ selectedPeople: [...this.state.selectedPeople, person] });
        } else {
            const newArray = this.state.selectedPeople.filter(
                (selectedPerson) => person.id !== selectedPerson.id
            );
            this.setState({
                selectedPeople: newArray,
            });
        }
    };

    render() {
        return (
            <div className="people-search">
                <div className="people-selected">
                    {this.state.selectedPeople.map((person) => (
                        <Badge
                            person={person}
                            key={person.id}
                            select={(person) => this.toggleSelectedPeople(person)}
                        />
                    ))}
                </div>
                {this.props.people.map((person) => (
                    <PeopleSearchItem
                        key={person.id}
                        personId={person.id}
                        name={person.username}
                        email={person.email}
                        select={(person) => this.toggleSelectedPeople(person)}
                        selected={this.personIsSelected(person)}
                    />
                ))}
            </div>
        );
    }
}

export default PeopleSearch;