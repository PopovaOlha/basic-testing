import {
  getBankAccount,
  InsufficientFundsError,
  TransferFailedError,
  SynchronizationFailedError,
} from '.';

describe('BankAccount', () => {
  test('should create account with initial balance', () => {
    const account = getBankAccount(100);
    expect(account.getBalance()).toBe(100);
  });

  test('should throw InsufficientFundsError error when withdrawing more than balance', () => {
    const account = getBankAccount(100);
    expect(() => account.withdraw(150)).toThrow(InsufficientFundsError);
  });

  test('should throw error when transferring more than balance', () => {
    const account1 = getBankAccount(50);
    const account2 = getBankAccount(100);
    expect(() => account1.transfer(75, account2)).toThrow(
      InsufficientFundsError,
    );
  });

  test('should throw error when transferring to the same account', () => {
    const account = getBankAccount(100);
    expect(() => account.transfer(10, account)).toThrow(TransferFailedError);
  });

  test('should deposit money', () => {
    const account = getBankAccount(100);
    account.deposit(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should withdraw money', () => {
    const account = getBankAccount(200);
    account.withdraw(50);
    expect(account.getBalance()).toBe(150);
  });

  test('should transfer money', () => {
    const account1 = getBankAccount(300);
    const account2 = getBankAccount(100);
    account1.transfer(100, account2);
    expect(account1.getBalance()).toBe(200);
    expect(account2.getBalance()).toBe(200);
  });

  test('fetchBalance should return number in case if request did not fail', async () => {
    const account = getBankAccount(100);
    jest
      .spyOn(account as { fetchBalance: () => Promise<number> }, 'fetchBalance')
      .mockResolvedValueOnce(80);

    const balance = await account.fetchBalance();
    expect(typeof balance).toBe('number');
  });

  test('should set new balance if fetchBalance returned number', async () => {
    const account = getBankAccount(0);
    jest
      .spyOn(
        account as { fetchBalance: () => Promise<number | null> },
        'fetchBalance',
      )
      .mockResolvedValueOnce(60);

    await account.synchronizeBalance();
    expect(account.getBalance()).toBe(60);
  });

  test('should throw SynchronizationFailedError if fetchBalance returned null', async () => {
    const account = getBankAccount(0);
    jest
      .spyOn(
        account as { fetchBalance: () => Promise<number | null> },
        'fetchBalance',
      )
      .mockResolvedValueOnce(null);

    await expect(account.synchronizeBalance()).rejects.toThrow(
      SynchronizationFailedError,
    );
  });
});
