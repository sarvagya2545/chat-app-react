import io from 'socket.io-client';

const socket = (function() {
    let socket;

    const connect = (cb) => {
        socket = io(window.location.origin);
        if(cb !== undefined) cb();
    }
    
    const defineSocketEvent = (msg, cb) => {
        socket.on(msg, cb);
    }
    
    const sendSocketEvent = (msg, data) => {
        socket.emit(msg, data);
    }
    
    const disconnect = () => {
        socket.disconnect();
    }

    return {
        connect,
        defineSocketEvent,
        sendSocketEvent,
        disconnect
    }

})();

export default socket;