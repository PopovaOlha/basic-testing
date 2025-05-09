import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const result = simpleCalculator({ a: 3, b: 5, action: Action.Add });
    expect(result).toBe(8);
  });

  test('should subtract two numbers', () => {
    const result = simpleCalculator({ a: 10, b: 4, action: Action.Subtract });
    expect(result).toBe(6);
  });

  test('should multiply two numbers', () => {
    const result = simpleCalculator({ a: 2, b: 6, action: Action.Multiply });
    expect(result).toBe(12);
  });

  test('should divide two numbers', () => {
    const result = simpleCalculator({ a: 20, b: 4, action: Action.Divide });
    expect(result).toBe(5);
  });

  test('should exponentiate two numbers', () => {
    const result = simpleCalculator({
      a: 2,
      b: 3,
      action: Action.Exponentiate,
    });
    expect(result).toBe(8);
  });

  test('should return null for invalid action', () => {
    const result = simpleCalculator({ a: 2, b: 3, action: '%' });
    expect(result).toBeNull();
  });

  test('should return null for non-numeric "a"', () => {
    const result = simpleCalculator({ a: '2', b: 3, action: Action.Add });
    expect(result).toBeNull();
  });

  test('should return null for non-numeric "b"', () => {
    const result = simpleCalculator({ a: 2, b: '3', action: Action.Add });
    expect(result).toBeNull();
  });

  test('should return null if both "a" and "b" are invalid', () => {
    const result = simpleCalculator({
      a: 'x',
      b: null,
      action: Action.Multiply,
    });
    expect(result).toBeNull();
  });
});
