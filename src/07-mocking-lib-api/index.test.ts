import axios from 'axios';
import { throttledGetDataFromApi } from './index';

jest.mock('axios');

describe('throttledGetDataFromApi', () => {
  const relativePath = '/posts/1';
  const mockResponseData = { id: 1, title: 'Test Post' };

  const mockAxiosInstance = {
    get: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (axios.create as jest.Mock).mockReturnValue(mockAxiosInstance);
  });

  test('should perform request to correct provided url', async () => {
    mockAxiosInstance.get.mockResolvedValue({ data: mockResponseData });

    await throttledGetDataFromApi(relativePath);

    expect(mockAxiosInstance.get).toHaveBeenCalledWith(relativePath);
  });

  test('should return response data', async () => {
    mockAxiosInstance.get.mockResolvedValue({ data: mockResponseData });

    const data = await throttledGetDataFromApi(relativePath);

    expect(data).toEqual(mockResponseData);
  });
});
