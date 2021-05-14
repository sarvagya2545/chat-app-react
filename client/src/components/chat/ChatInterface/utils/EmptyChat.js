import React from 'react';
import chatIllustration from '../../../../images/Work chat-amico.svg';

const EmptyChat = () => {
    return (
        <div className="empty-chat">
            <img src={chatIllustration} alt="CHAT" className="empty-chat-img"/>
        </div>
    );
}

export default EmptyChat;