import { useCallback, useEffect, useState } from "react";
import { fetchNui } from "../utils/fetch-nui";
import { useNuiEvents } from "../utils/nui-events";
interface ClientNuiComponentProps {
  onClose: () => void;
}

const ClientNuiComponent = ({ onClose: onClose }: ClientNuiComponentProps) => {
  const [serverMessage, setServerMessage] = useState("No data received yet.");

  const handleClose = useCallback(async () => {
    await fetchNui("frontview", { action: "off" });
    await fetchNui("closeUI");
    onClose();
  }, []);

  const handleFrontViewOn = useCallback(async () => {
    await fetchNui("frontview", { action: "on" });
  }, []);

  const handleFrontViewOff = useCallback(async () => {
    await fetchNui("frontview", { action: "off" });
  }, []);

  const handleTestEvent = useCallback((data: any) => {
    console.log("Received data from client in NUI:", data);
    setServerMessage(data?.message || "No message received");
  }, []);

  useEffect(() => {
    const unregister = useNuiEvents("testEvent", handleTestEvent);
    return () => unregister();
  }, [handleTestEvent]);

  return (
    <div className="bg-red-500 p-6 rounded shadow-md">
      <button
        className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleFrontViewOn}
      >
        Enable Front View
      </button>

      <button
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
        onClick={handleFrontViewOff}
      >
        Disable Front View
      </button>
      <button onClick={handleClose} className="close-button">
        Close
      </button>
      <div className="text-gray-800">{serverMessage}</div>
    </div>
  );
};

export default ClientNuiComponent;
