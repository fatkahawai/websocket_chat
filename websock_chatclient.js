/*
 * WEBSOCK_CHATCLIENT.JS
 * 
 * an example for use of websockets. compare to the comet version of the chat example
 * Ex22.16 from O'Reilly
 * 
 * the server is run using Node.js :
 * open a terminal window
 * go to the websock_chat folder in user/Sites
 * run> node js/websockt_chatserver.js
 * this starts the Websocket server which starts the HTTP server as well
 * 
 * in your web browser, connect to http://localhost:8000 
 * then index.html is loaded, which loads this js file to process user input messages and send to the server
 * and to display messages from other users arrriving via the websocket 
 * the comet push message is received and processed in an event handler - an anonymous function 
 * assigned to the event using .onmessage() on the websocket
*/
var debug = utils.debug;
var sprintf = utils.string.sprintf;

window.onload = function() {
    debug.setLevelVerbose();

    // Take care of some UI details
    var nick = prompt("Enter your nickname");     // Get user's nickname
    var input = document.getElementById("input"); // Find the input field
    input.focus();                                // Set keyboard focus

    debug.trace("new user:"+nick);
        
    // Open a WebSocket to send and receive chat messages on.
    // Assume that the HTTP server we were downloaded from also functions as
    // a websocket server, and use the same host name and port, but change
    // from the http:// protocol to ws://
    var socket = new WebSocket("ws://" + location.host + "/");

    // This is how we receive messages from the server through the web socket
    socket.onmessage = function(event) {          // When a new message arrives
        var msg = event.data;                     // Get text from event object
        var node = document.createTextNode(msg);  // Make it into a text node
        var div = document.createElement("div");  // Create a <div>

        debug.trace("received new message:"+msg);
        
        div.appendChild(node);                    // Add text node to div
        document.body.insertBefore(div, input);   // And add div before input
        input.scrollIntoView();                   // Ensure input elt is visible
    }

    // This is how we send messages to the server through the web socket
    input.onchange = function() {                 // When user strikes return
        var msg = nick + ": " + input.value;      // Username plus user's input

        debug.trace("user entered new message:"+msg);
        
        socket.send(msg);                         // Send it through the socket
        input.value = "";                         // Get ready for more input
    }
};
