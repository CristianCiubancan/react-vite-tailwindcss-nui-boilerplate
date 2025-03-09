// src/fivem/client/utils.ts

export function sendNuiMessageByType(type: string, payload: Record<string, any> = {}) {
    SendNuiMessage(JSON.stringify({ type, ...payload }));
  }
  