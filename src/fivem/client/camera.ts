import { Config } from './config';
import { sendNuiMessageByType } from './utils';

let frontCamera: number | null = null;

export function showLoadingScreen() {
  sendNuiMessageByType('showLoadingScreen');
}

export function hideLoadingScreen() {
  sendNuiMessageByType('hideLoadingScreen');
}

export function createFrontView(): void {
  // Destructure with safe defaults
  const { 
    x = -813.46, 
    y = 178.95, 
    z = 76.85, 
    heading = 174.5 
  } = Config.CameraCoords;

  // Create camera with guaranteed number values
  frontCamera = CreateCamWithParams(
    "DEFAULT_SCRIPTED_CAMERA",
    x, y, z,            // Position
    0.0, 0.0, heading,  // Rotation (X, Y, Z)
    60.0,               // FOV
    true,               // Active
    0                   // Rotation order
  );
  SetCamActive(frontCamera, true);
  RenderScriptCams(true, false, 0, true, true);
}

export function destroyFrontView(): void {
  RenderScriptCams(false, false, 0, true, true);
  if (frontCamera) {
    DestroyCam(frontCamera, false);
    frontCamera = null;
  }
}