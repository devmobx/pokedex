import { EmitterSubscription, type NativeEventEmitter } from "react-native";

export const eventListenerManager = (eventEmitter: NativeEventEmitter) => {
  const listeners: Record<string, EmitterSubscription> = {};

  const createListener = <T>(
    eventName: string,
    callback: (args: T) => void
  ) => {
    if (listeners[eventName]) {
      listeners[eventName].remove();
    }

    listeners[eventName] = eventEmitter.addListener(
      eventName,
      (...args: [T]) => {
        callback(args[0]);
        listeners[eventName].remove();
        delete listeners[eventName];
      }
    );
  };

  return { createListener };
};
