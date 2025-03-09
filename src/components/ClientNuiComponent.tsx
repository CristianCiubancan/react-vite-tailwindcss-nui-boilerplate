import React, { useCallback, useEffect, useState } from "react";
import { fetchNui } from "../utils/fetch-nui";
import { useNuiEvents } from "../utils/nui-events";

const ClientNuiComponent: React.FC = () => {
  const [serverMessage, setServerMessage] = useState("No data received yet.");

  const handleFrontViewOn = useCallback(() => {
    fetchNui("frontview", { action: "on" })
      .then((resp: any) => console.log("Response from client callback:", resp))
      .catch((err: any) => console.error("NUI fetch error:", err));
  }, []);

  const handleFrontViewOff = useCallback(() => {
    fetchNui("frontview", { action: "off" })
      .then((resp: any) => console.log("Response from client callback:", resp))
      .catch((err: any) => console.error("NUI fetch error:", err));
  }, []);

  const handleClick = useCallback(() => {
    fetchNui("testEventName", { foo: "bar" })
      .then((resp: any) => console.log("Response from client callback:", resp))
      .catch((err: any) => console.error("NUI fetch error:", err));
  }, []);

  // Handle keyboard events
  useEffect(() => {
    const handleKeyPress = (event: KeyboardEvent) => {
      if (event.key === "p" || event.key === "P") {
        // Works for both lowercase and uppercase
        handleClick();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleClick]); // Add handleClick as dependency

  // Rest of the component remains the same
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
        className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded mb-4"
        onClick={handleClick}
      >
        Send Data to Client
      </button>

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

      <div className="text-gray-800">{serverMessage}</div>
    </div>
  );
};

export default ClientNuiComponent;
