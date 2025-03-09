export const Config = {
    // Coordinates for the character preview (e.g., in an apartment interior)
    ApartmentCoords: { x: -1035.71, y: -2731.87, z: 12.86 },
  
    // Where the preview character ped should be spawned, including its facing direction (heading)
    CharacterCoords: { x: -813.97, y: 176.22, z: 76.74, heading: -7.5 },
  
    // Coordinates to hide the actual player ped during the character selection
    HiddenCoords: { x: -812.23, y: 182.54, z: 76.74, heading: 156.5 },
  
    // Coordinates for the preview camera, including a heading for the camera’s rotation
    CameraCoords: { x: -813.46, y: 178.95, z: 76.85, heading: 174.5 },
  
    // Additional options
    EnableDeleteButton: true,
    customNationality: false,
    SkipSelection: false,
    DefaultNumberOfCharacters: 5,
  };
  
  export default Config;
  