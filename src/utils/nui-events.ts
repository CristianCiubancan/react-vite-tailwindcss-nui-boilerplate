if (!window.eventHandlers) {
  window.eventHandlers = {};
}

window.addEventListener('message', (event) => {
  const { type, data } = event.data;
  if (type && window.eventHandlers[type]) {
    window.eventHandlers[type].forEach((handler) => handler(data));
  }
});

export function useNuiEvents(type: string, handler: (data: any) => void | Promise<void>) {
  if (!window.eventHandlers[type]) {
    window.eventHandlers[type] = [];
  }
  window.eventHandlers[type].push(handler);

  return () => {
    window.eventHandlers[type] = window.eventHandlers[type].filter((h) => h !== handler);
    if (window.eventHandlers[type].length === 0) {
      delete window.eventHandlers[type];
    }
  };
}