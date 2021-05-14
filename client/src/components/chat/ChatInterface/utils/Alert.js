import React from 'react';

const Alert = ({ user, entered }) => {
    return (
        <p>{`${user} has ${entered ? 'entered':'left'} the chat`}</p>
    );
}
 
export default Alert;