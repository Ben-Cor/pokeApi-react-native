require('react-native-gesture-handler/jestSetup');
const fetchMock = require('jest-fetch-mock');

fetchMock.enableMocks();

// Mock the react-native-reanimated
jest.mock('react-native-reanimated', () => {
  const Reanimated = require('react-native-reanimated/mock');
  Reanimated.default.call = () => {};
  return Reanimated;
});

// Mock AsyncStorage
jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock')
);

// Mock Expo modules
jest.mock('expo-font');
jest.mock('expo-status-bar');
