const socket = new WebSocket("ws://localhost:8080/ws");

interface Channel {
    (m: MessageEvent): void
}

const connect = (channel:  Channel) => {
    console.log("Attempting Connection...");

    socket.onopen = () => {
        console.log("Successfully Connected");
    };

    socket.onmessage = message => {
        console.log(message);
        channel(message)
    };

    socket.onclose = event => {
        console.log("Socket Closed Connection: ", event);
    };

    socket.onerror = error => {
        console.log("Socket Error: ", error);
    };
};

const sendMsg = (msg: string | ArrayBufferLike | Blob | ArrayBufferView) => {
    socket.send(msg);
};

export { connect, sendMsg };