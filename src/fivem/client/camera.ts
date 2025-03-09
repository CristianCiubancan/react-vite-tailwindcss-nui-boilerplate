// Import your configuration (adjust the path as needed)
import Config from './config';

let frontCamera: any = null;

function movePlayerToPreview() {
  // Retrieve the preview coordinates for the player's ped from the config
  const { x, y, z, heading } = Config.CharacterCoords;
  const playerPed = PlayerPedId();

  // Move the player ped to the designated preview coordinates and set the heading
  SetEntityCoords(playerPed, x, y, z, false, false, false, true);
  SetEntityHeading(playerPed, heading);
}

function createFrontView() {
  // Use the preset camera coordinates from the configuration
  const { x, y, z, heading } = Config.CameraCoords;

  // Create the camera with the provided coordinates and heading using CreateCamWithParams
  frontCamera = CreateCamWithParams("DEFAULT_SCRIPTED_CAMERA", x, y, z, 0.0, 0.0, heading, 60.0, true, 0);

  // Activate the camera
  SetCamActive(frontCamera, true);
  RenderScriptCams(true, false, 0, true, true);
}

function destroyFrontView() {
  // Disable the custom camera and revert to the default gameplay camera
  RenderScriptCams(false, false, 0, true, true);
  if (frontCamera) {
    DestroyCam(frontCamera, false);
    frontCamera = null;
  }
}

on('playerSpawned', () => {
  // Force spawn at the apartment
  movePlayerToPreview();

  // Wait a moment for everything to be ready, then set the front view.
  setTimeout(() => {
    createFrontView();
  }, 1000); // Adjust the delay as needed
});

// Toggle the front view camera using the event "frontview"
// It expects an object with an "action" property set to "on" or "off".
RegisterNuiCallbackType('frontview');
on('__cfx_nui:frontview', (data: any, cb: (data: any) => void) => {
  if (data.action === 'on') {
    createFrontView();
    cb({ status: 'ok', message: 'Front view enabled!' });
  } else if (data.action === 'off') {
    destroyFrontView();
    cb({ status: 'ok', message: 'Front view disabled!' });
  } else {
    cb({ status: 'error', message: 'Invalid action. Please use "on" or "off".' });
  }
});
