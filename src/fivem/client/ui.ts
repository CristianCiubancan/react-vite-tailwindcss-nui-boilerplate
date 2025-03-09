/// <reference types="@citizenfx/client" />

// Existing event for handling test data from UI
RegisterNuiCallbackType('testEventName');
on('__cfx_nui:testEventName', (data: any, cb: (returnData: any) => void) => {
  console.log('Client received data from NUI:', data);

  // Send a response back to the front-end’s fetchNui Promise
  cb({ status: 'ok', message: 'Client got your data!' });

  // (Optional) Push an event to the front-end
  SendNuiMessage(
    JSON.stringify({
      type: 'testEvent',
      data: {
        message: 'Hello from the client script!',
      },
    })
  );
});

// New event for setting focus when the UI mounts
RegisterNuiCallbackType('focusTestResource');
on('__cfx_nui:focusTestResource', (_data: any, cb: (returnData: any) => void) => {
  console.log('Focusing NUI for focusTestResource event');
  SetNuiFocus(true, true); // This will allow both mouse and keyboard inputs.
  cb({ status: 'ok', message: 'NUI focus set' });
});
