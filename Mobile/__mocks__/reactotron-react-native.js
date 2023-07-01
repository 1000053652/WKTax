const reactotron = {
  configure: () => reactotron,
  useReactNative: () => reactotron,
  use: () => reactotron,
  connect: () => ({
    createEnhancers: () => jest.fn(),
  }),
  setAsyncStorageHandler: () => reactotron,
  createEnhancers: () => jest.fn(),
}

module.exports = reactotron
