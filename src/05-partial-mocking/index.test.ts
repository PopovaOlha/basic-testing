jest.mock('./index', () => ({
  mockOne: jest.fn(),
  mockTwo: jest.fn(),
  mockThree: jest.fn(),
  unmockedFunction: jest.requireActual('./index').unmockedFunction,
}));

describe('partial mocking', () => {
  afterAll(() => {
    jest.unmock('./index');
  });

  test('mockOne, mockTwo, mockThree should not log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const { mockOne, mockTwo, mockThree } = require('./index');
    mockOne();
    mockTwo();
    mockThree();

    expect(consoleSpy).not.toHaveBeenCalled();

    consoleSpy.mockRestore();
  });

  test('unmockedFunction should log into console', () => {
    const consoleSpy = jest.spyOn(console, 'log').mockImplementation(() => {});

    const { unmockedFunction } = require('./index');
    unmockedFunction();

    expect(consoleSpy).toHaveBeenCalledWith('I am not mocked');

    consoleSpy.mockRestore();
  });
});
