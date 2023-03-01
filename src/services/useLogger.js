import {useCallback} from 'react';
import * as Device from 'expo-device';

export const useLogger = (name) => {
  const log = useCallback(
    (...args) => {
      const prefix = [
        `${Device.isDevice ? '[Device]' : '[Emulator]'}`,
        `[${Device.osName ?? '-'}]`,
        `[${Device.modelId ?? '-'}]`,
        `[${Device.platformApiLevel ?? '-'}]`,
        `[${name}]`,
      ].join('');

      console.log(`${prefix}: `, ...args);
    },
    [name]
  );

  return {
    log,
  };
};
