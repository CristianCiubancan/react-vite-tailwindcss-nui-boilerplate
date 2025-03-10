import { useEffect } from "react";

// Extend the global Window interface.
declare global {
  interface Window {
    __nuiListenerRegistered?: boolean;
    eventHandlers: { [key: string]: Array<(data: any) => void | Promise<void>> };
  }
}

// Initialize the global eventHandlers object if needed.
if (!window.eventHandlers) {
  window.eventHandlers = {};
}

// Register the global message listener only once.
if (!window.__nuiListenerRegistered) {
  window.addEventListener("message", (event) => {
    console.log("[NUI] Received message event:", event);
    // Support for both raw objects and JSON strings.
    let msg = event.data;
    if (typeof msg === "string") {
      try {
        msg = JSON.parse(msg);
      } catch (e) {
        console.error("[NUI] Failed to parse message:", event.data);
        return;
      }
    }
    const { type, data } = msg;
    if (type && window.eventHandlers[type]) {
      console.log(
        `[NUI] Found ${window.eventHandlers[type].length} handler(s) for type: "${type}"`
      );
      Promise.all(
        window.eventHandlers[type].map(async (handler, index) => {
          console.log(
            `[NUI] Executing handler ${index + 1} for type: "${type}" with data:`,
            data
          );
          try {
            await handler(data);
            console.log(
              `[NUI] Handler ${index + 1} for type: "${type}" completed successfully.`
            );
          } catch (error) {
            console.error(
              `[NUI] Error in async handler ${index + 1} for type "${type}":`,
              error
            );
          }
        })
      );
    } else {
      console.log(`[NUI] No handlers registered for type: "${type}"`);
    }
  });
  window.__nuiListenerRegistered = true;
}

/**
 * React hook for registering a NUI event handler.
 * @param type The type of event to listen for.
 * @param handler The callback to execute when an event of this type is received.
 */
export function useNuiEvents(
  type: string,
  handler: (data: any) => void | Promise<void>
) {
  useEffect(() => {
    if (!window.eventHandlers[type]) {
      window.eventHandlers[type] = [];
    }
    window.eventHandlers[type].push(handler);
    console.log(`[NUI] Registered handler for type: "${type}"`);

    // Cleanup: unregister the handler when the component unmounts.
    return () => {
      console.log(`[NUI] Unregistering handler for type: "${type}"`);
      window.eventHandlers[type] = window.eventHandlers[type].filter(
        (h) => h !== handler
      );
      if (window.eventHandlers[type].length === 0) {
        delete window.eventHandlers[type];
        console.log(`[NUI] All handlers removed for type: "${type}"`);
      }
    };
  }, [type, handler]);
}
