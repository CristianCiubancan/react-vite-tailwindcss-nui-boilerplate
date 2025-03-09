// src/fivem/client/config.ts

export interface CharacterCoordinates extends Coordinates {
  heading: number;
}
export interface Coordinates {
  x: number;
  y: number;
  z: number;
  heading: number;
}

export const Config = {
  ApartmentCoords: { x: -1035.71, y: -2731.87, z: 12.86 } as Coordinates,
  CharacterCoords: { x: -813.97, y: 176.22, z: 76.74, heading: -7.5 } as Coordinates,
  HiddenCoords: { x: -812.23, y: 182.54, z: 76.74, heading: 156.5 } as Coordinates,
  CameraCoords: { x: -813.46, y: 178.95, z: 76.85, heading: 174.5 } as Coordinates,
  EnableDeleteButton: true,
  customNationality: false,
  SkipSelection: false,
  DefaultNumberOfCharacters: 5,
};