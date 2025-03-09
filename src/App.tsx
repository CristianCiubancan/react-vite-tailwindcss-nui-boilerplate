// src/App.tsx
import { useState } from "react";
import ClientNuiComponent from "./components/ClientNuiComponent";
import { useNuiEvents } from "./utils/nui-events";

function App() {
  const [showUI, setShowUI] = useState(false);

  useNuiEvents("playerSpawnComplete", () => {
    setShowUI(true);
  });

  return (
    <>
      {showUI ? <ClientNuiComponent onClose={() => setShowUI(false)} /> : null}
    </>
  );
}

export default App;
