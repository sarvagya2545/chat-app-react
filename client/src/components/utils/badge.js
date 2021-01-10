import React from 'react';

const Badge = ({ person, select }) => {
    return (
        <span className="badge">
            <p>{person.name || "Name"}</p>
            <button className="btn btn-close-badge" onClick={() => select(person)}>x</button>
        </span>
    );
}
 
export default Badge;