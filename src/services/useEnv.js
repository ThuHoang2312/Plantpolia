import * as Device from 'expo-device';

export const useEnv = () => {
  return {
    isDevelopment: process.env.NODE_ENV === 'development',
    isProduction: process.env.NODE_ENV === 'production',
    isDevice: Device.isDevice,
  };
};
