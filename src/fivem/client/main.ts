// client.ts
/// <reference types="@citizenfx/client" />

// 1) Register the callback name
RegisterNuiCallbackType('testEventName');

// 2) Listen for the UI calling fetchNui('testEventName', data)
on('__cfx_nui:testEventName', (data: any, cb: (returnData: any) => void) => {
  console.log('Client received data from NUI:', data);

  // 3) Send a response back to the front-end’s fetchNui Promise
  cb({ status: 'ok', message: 'Client got your data!' });

  // 4) (Optional) Push an event to the front-end
  //    This triggers the "type" = "testEvent" in useNuiEvents
  SendNuiMessage(
    JSON.stringify({
      type: 'testEvent',
      data: {
        message: 'Hello from the client script!',
      },
    })
  );
});
