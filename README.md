Below is a comprehensive **README** that you can adapt for your own needs. It explains the purpose of this boilerplate, how to set it up, and how to extend it for your FiveM server.

---

# FiveM React + TypeScript + Vite + Tailwind Boilerplate

A modern boilerplate for building FiveM resources with **React**, **TypeScript**, **Vite**, **TailwindCSS**, and server/client scripts. This setup allows you to create an interactive UI (NUI) in React, while also writing your client- and server-side scripts in TypeScript.

## Table of Contents

- [Features](#features)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Development](#development)
- [Building for Production](#building-for-production)
- [Usage in FiveM](#usage-in-fivem)
- [Project Structure](#project-structure)
- [Configuration Files](#configuration-files)
- [Scripts](#scripts)
- [Adding and Using NUI Callbacks](#adding-and-using-nui-callbacks)
- [License](#license)
- [Contributing](#contributing)
- [Credits](#credits)

---

## Features

1. **React 19 + TypeScript** for the UI.
2. **Vite** for fast development and bundling.
3. **TailwindCSS** for easy and customizable styling.
4. **Rollup** build pipeline for your client/server TypeScript scripts.
5. **ESLint** configured for linting.
6. **Hot Reloading** via `vite dev` and `tailwindcss` watch.
7. Example **NUI callbacks** to communicate between the UI and the client script.
8. Example **camera management** script in the client.
9. Example **server events** to demonstrate client ↔ server communication.

---

## Prerequisites

1. **Node.js** (LTS or higher recommended).
2. **npm** or **yarn** (npm is used in the examples here).
3. **FiveM Server Artifacts** and a basic server setup.
4. A text editor or IDE that supports TypeScript (e.g., VSCode).

---

## Installation

1. **Clone or download** this repository into your FiveM server’s `resources` folder.  
   For example, clone into `[resources]/fivem-react-boilerplate`.

2. **Install dependencies** inside the resource folder:
   ```bash
   cd fivem-react-boilerplate
   npm install
   ```
   or
   ```bash
   yarn
   ```

3. (Optional) **Rename** the resource folder if desired.  
   If you do rename it, also update the `fxmanifest.lua` if you want it to match.

4. **Ensure** the resource in your `server.cfg`:
   ```cfg
   ensure fivem-react-boilerplate
   ```

---

## Development

For local development with hot-reload:

1. **Start** your FiveM server (so the resource is active).
2. In a separate terminal, **run**:
   ```bash
   npm run dev
   ```
   This will run two processes concurrently:
   - `vite` (for the React UI, on port 5173 by default)
   - `tailwindcss` in watch mode

3. **Test** in FiveM:
   - Connect to your server.
   - The UI is served by Vite locally; you can open the NUI or trigger events to see changes instantly.

> **Note**: Some features (like `SetNuiFocus`) only work when the resource is running on an actual FiveM server. For local dev with hot reload, you’ll still need to be connected to your FiveM server and resource.

---

## Building for Production

When you’re ready to deploy:

1. **Build** everything:
   ```bash
   npm run build
   ```
   This will:
   - Compile TypeScript (both the app and node configs).
   - Bundle the React UI via Vite into `dist/web`.
   - Bundle the client/server scripts via Rollup into `dist/client` and `dist/server`.
2. **Verify** that the `dist/` folder contains:
   - `web/index.html`, `assets/`, JS and CSS bundles for the UI.
   - `client/bundle.client.js`.
   - `server/bundle.server.js`.
3. **Deploy** the resource folder to your production server.
4. **Ensure** it in your production `server.cfg` if not already done:
   ```cfg
   ensure fivem-react-boilerplate
   ```

---

## Usage in FiveM

### Press **P** to toggle the example camera

The included scripts demonstrate how to:
- Move the player to a preview location.
- Create a custom camera (front view).
- Toggle the camera on/off from the UI or via the `P` key.

You can see this in action by:
1. Joining your server.
2. Pressing **P** in-game (handled in `ClientNuiComponent.tsx` via a keydown event).
3. Observing the logs in the client console for feedback.

### Example NUI Focus

When the React UI mounts, it sends a `focusTestResource` event to the client. The client script sets `SetNuiFocus(true, true)`, which allows the mouse to interact with the UI. This is demonstrated in:

- `src/fivem/client/ui.ts` (client callback registration)
- `src/App.tsx` (UI effect that calls `fetchNui("focusTestResource")`)

---

## Project Structure

```
fivem-react-boilerplate
├─ dist/
├─ node_modules/
├─ src/
│  ├─ assets/        # Static assets (images, fonts, etc.)
│  ├─ components/    # React components
│  ├─ fivem/         # FiveM-related TS scripts
│  │  ├─ client/
│  │  │  ├─ camera.ts
│  │  │  ├─ config.ts
│  │  │  ├─ main.ts
│  │  │  └─ ui.ts
│  │  └─ server/
│  │     ├─ events.ts
│  │     └─ main.ts
│  ├─ utils/         # Utility functions for NUI, events, etc.
│  ├─ App.tsx        # Root React component
│  ├─ input.css      # Tailwind input
│  ├─ output.css     # Tailwind compiled output
│  └─ main.tsx       # React entry point
├─ .eslintrc.js
├─ tailwind.config.js
├─ postcss.config.js
├─ rollup.config.js
├─ tsconfig.*.json   # Multiple tsconfig files for app, node, client, server
├─ vite.config.ts
├─ fxmanifest.lua
├─ package.json
└─ README.md
```

### Notable Files

- **fxmanifest.lua**: Defines the FiveM resource with client scripts, server scripts, and UI files.
- **vite.config.ts**: Configures how the React app is built.
- **rollup.config.js**: Configures how the TypeScript client/server scripts are bundled for FiveM.
- **tailwind.config.js**: TailwindCSS config.
- **postcss.config.js**: PostCSS + Tailwind config.
- **tsconfig.***: Separate configs for the different builds (Vite, Node, FiveM client, FiveM server).

---

## Configuration Files

### fxmanifest.lua

Points to:
- The built UI files in `dist/web/`.
- The client script in `dist/client/bundle.client.js`.
- The server script in `dist/server/bundle.server.js`.

Update or rename these references if you change the output directory or resource name.

### Vite & Rollup

- **vite.config.ts** handles bundling of the React UI into `dist/web`.
- **rollup.config.js** handles bundling of your `src/fivem/client/*.ts` and `src/fivem/server/*.ts` files into `dist/client/` and `dist/server/`.

### Tailwind & PostCSS

- **tailwind.config.js** ensures Tailwind scans all files in `src/`.
- **postcss.config.js** includes Tailwind and autoprefixer plugins.

### TypeScript Configs

- **tsconfig.app.json** (and others) specify different compiler options for each build context (client, server, node, app).
- This ensures that your code is compiled correctly whether it’s for the UI, the FiveM client, or the server.

---

## Scripts

All scripts are defined in `package.json` under `"scripts"`:

- **`npm run dev`**  
  Runs both Vite dev server and Tailwind in watch mode concurrently.

- **`npm run build:ui`**  
  Builds only the React UI via Vite and Tailwind.

- **`npm run build:fivem`**  
  Builds only the FiveM client/server scripts via Rollup.

- **`npm run build`**  
  Runs a full build for both UI and FiveM scripts.

- **`npm run lint`**  
  Runs ESLint over the entire codebase.

- **`npm run preview`**  
  Serves the built UI locally for a production preview (without starting a FiveM server).

---

## Adding and Using NUI Callbacks

This boilerplate shows how to:
1. **Send data** from the React UI to the client script with `fetchNui("eventName", data)`.
2. **Handle** that event in the client script with:
   ```ts
   RegisterNuiCallbackType('eventName');
   on('__cfx_nui:eventName', (data, cb) => {
     // do something with data
     cb({ status: 'ok', message: 'Response from client' });
   });
   ```
3. **Optionally** push data from the client script back to the UI using:
   ```ts
   SendNuiMessage(JSON.stringify({
     type: 'someEventType',
     data: { /* ... */ }
   }));
   ```
4. **Listen** in React for `type: 'someEventType'` using the `useNuiEvents` hook (in `utils/nui-events.ts`).

### Example

- **UI** side (`App.tsx` or any other component):
  ```ts
  fetchNui("testEventName", { foo: "bar" })
    .then(resp => console.log("Response:", resp))
    .catch(err => console.error("NUI fetch error:", err));
  ```

- **Client** side (`ui.ts`):
  ```ts
  RegisterNuiCallbackType('testEventName');
  on('__cfx_nui:testEventName', (data, cb) => {
    console.log('Client received data:', data);
    cb({ status: 'ok', message: 'Hello from client script!' });
  });
  ```

---

## License

You may use and modify this boilerplate for any personal or commercial FiveM projects. If you publish or redistribute it, a mention or link back to this repository is appreciated but not required. Please respect the licenses of any included third-party dependencies.

---

## Contributing

Contributions are welcome! Feel free to open issues or pull requests to enhance functionality, fix bugs, or improve documentation.

---

## Credits

- [React](https://reactjs.org/) and [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/) for the dev/build pipeline
- [TailwindCSS](https://tailwindcss.com/) for utility-first styling
- [Rollup](https://rollupjs.org/) for bundling FiveM scripts
- The [CitizenFX Collective](https://forum.cfx.re/) for the FiveM platform

---

Happy coding and have fun creating your FiveM resource! If you have any questions, feel free to open an issue or reach out on the FiveM forums.