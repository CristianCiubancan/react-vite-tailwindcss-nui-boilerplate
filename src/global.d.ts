export {};

declare global {
  interface Window {
    __nuiListenerRegistered?: boolean;
    eventHandlers: { [key: string]: Array<(data: any) => void | Promise<void>> };
  }
}
