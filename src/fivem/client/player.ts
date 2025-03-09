// src/fivem/client/player.ts
import { Config, CharacterCoordinates } from './config';
import { showLoadingScreen, hideLoadingScreen, createFrontView } from './camera';
import { sendNuiMessageByType } from './utils';

const SPAWN_TRANSITION_DELAY = 1000;

function movePlayerToPreview() {
    // Destructure with type assertion
    const { x, y, z, heading } = Config.CharacterCoords as CharacterCoordinates;
    const playerPed = PlayerPedId();
  
    // Add safety check
    if (typeof heading !== 'number') {
      throw new Error('CharacterCoords.heading is missing or invalid');
    }
  
    SetEntityCoords(playerPed, x, y, z, false, false, false, true);
    SetEntityHeading(playerPed, heading);
  }

on('playerSpawned', () => {
  showLoadingScreen();
  movePlayerToPreview();
  
  setTimeout(() => {
    createFrontView();
    hideLoadingScreen();
    
    sendNuiMessageByType('playerSpawnComplete', {
      inApartment: true,
      frontViewActive: true
    });
    SetNuiFocus(true, true);
  }, SPAWN_TRANSITION_DELAY);
});