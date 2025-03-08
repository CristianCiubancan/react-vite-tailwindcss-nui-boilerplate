export {};

declare global {
  interface Window {
    eventHandlers: Record<string, Array<(data: any) => void | Promise<void>>>;
  }
}
