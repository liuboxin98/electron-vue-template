/**
 * Should match main/preload.ts for typescript support in renderer
 */
export default interface ElectronApi {
  sendMessage: (message: string) => void
  openSomething: (message: string) => void
  openFile: () => Promise<string>
}

declare global {
  interface Window {
    electronAPI: ElectronApi,
  }
}
