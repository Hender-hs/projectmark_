// Test setup file

// Global mocks
jest.mock('../src/shared/jwt/jwt', () => ({
  Jwt: {
    sign: jest.fn().mockResolvedValue('mock-jwt-token'),
    verify: jest.fn().mockReturnValue({ id: '1', email: 'test@example.com', role: 'USER' }),
  },
}));

jest.mock('../src/shared/di/init.di', () => ({
  Di: {
    getInstance: jest.fn(() => ({
      userController: {
        getUserById: jest.fn(),
      },
      userAuthController: {
        register: jest.fn(),
        login: jest.fn(),
      },
      userAuthService: {
        authenticationMiddleware: jest.fn((req, res, next) => next()),
      },
      resourceController: {
        getResourceByTopicId: jest.fn(),
        createResource: jest.fn(),
      },
      topicController: {
        getAllTopics: jest.fn(),
        getTopicById: jest.fn(),
        createTopic: jest.fn(),
        updateTopic: jest.fn(),
        deleteTopic: jest.fn(),
        getTopicHierarchyTree: jest.fn(),
        getShortestPath: jest.fn(),
      },
      logger: {
        info: jest.fn(),
        error: jest.fn(),
        warn: jest.fn(),
        debug: jest.fn(),
      },
    })),
  },
}));

// Mock console methods to reduce noise in tests
global.console = {
  ...console,
  log: jest.fn(),
  debug: jest.fn(),
  info: jest.fn(),
  warn: jest.fn(),
  error: jest.fn(),
}; 