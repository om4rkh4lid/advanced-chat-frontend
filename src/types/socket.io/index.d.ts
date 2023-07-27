export {};

declare module 'socket.io-client' {
    export interface Socket {
      session: any;
    }
}
