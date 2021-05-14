import React, { Component } from "react";
import PeopleSearchItem from "./PeopleSearchItem";
import Badge from "../../utils/badge";
import cx from "classnames";
import { connect } from 'react-redux';

class PeopleSearch extends Component {
    render() {
        const { peopleList } = this.props;
        return (
            <div className="people-search">
                <div className={cx("people-selected", { "no-badges": this.props.selectedPeople.length === 0 })}>
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
                        name={peopleList[person.id]?.username}
                        email={peopleList[person.id]?.email}
                        pfp={peopleList[person.id]?.pfp}
                        select={(person) => this.props.toggleSelectedPeople(person)}
                        selected={this.props.personIsSelected(person)}
                    />
                ))}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        peopleList: state.chat.peopleList
    }
}

export default connect(mapStateToProps)(PeopleSearch);