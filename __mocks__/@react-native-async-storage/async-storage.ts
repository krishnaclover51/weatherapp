const mockStorage: Record<string, string | null> = {};

const AsyncStorage = {
  setItem: jest.fn(async (key: string, value: string) => {
    mockStorage[key] = value;
    return Promise.resolve();
  }),
  getItem: jest.fn(async (key: string) => {
    return Promise.resolve(mockStorage[key] || null);
  }),
  removeItem: jest.fn(async (key: string) => {
    delete mockStorage[key];
    return Promise.resolve();
  }),
  clear: jest.fn(async () => {
    for (const key in mockStorage) {
      delete mockStorage[key];
    }
    return Promise.resolve();
  }),
  getAllKeys: jest.fn(async () => {
    return Promise.resolve(Object.keys(mockStorage));
  }),
  multiSet: jest.fn(async (items: [string, string][]) => {
    items.forEach(([key, value]) => {
      mockStorage[key] = value;
    });
    return Promise.resolve();
  }),
  multiGet: jest.fn(async (keys: string[]) => {
    return Promise.resolve(keys.map(key => [key, mockStorage[key] || null]));
  }),
};

export default AsyncStorage;
