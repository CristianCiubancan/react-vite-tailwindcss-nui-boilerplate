/// <reference types="@citizenfx/server" />

// Example: Listen for a net event from the client
onNet('exampleServerEvent', (someData: any) => {
    console.log('Server received data from client:', someData);
  
    // Send something back to that client
    // 'source' is the player ID that triggered the event
    emitNet('exampleClientEvent', source, { message: 'Hello from the server!' });
  });
  