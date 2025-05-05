const mockNetInfoState = {
    type: 'wifi',
    isConnected: true,
    isInternetReachable: true,
};

export const useNetInfo = jest.fn(() => mockNetInfoState);

const NetInfo = {
    fetch: jest.fn(() => Promise.resolve(mockNetInfoState)),
    addEventListener: jest.fn(() => jest.fn()), // mock unsubscribe function
};

export default NetInfo;
