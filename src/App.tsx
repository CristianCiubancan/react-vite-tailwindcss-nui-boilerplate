import { useEffect } from "react";
import ClientNuiComponent from "./components/ClientNuiComponent";
import { fetchNui } from "./utils/fetch-nui";

function App() {
  useEffect(() => {
    fetchNui("focusTestResource", {})
      .then((resp) => console.log("Focus event response:", resp))
      .catch((err) => console.error("Focus event error:", err));

    fetchNui("frontview", { action: "on" })
      .then((resp) => console.log("Front view toggled:", resp))
      .catch((err) => console.error("NUI fetch error:", err));
  }, []);

  return (
    <>
      <ClientNuiComponent />
    </>
  );
}

export default App;
