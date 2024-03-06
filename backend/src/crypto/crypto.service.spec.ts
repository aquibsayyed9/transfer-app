import { Test, TestingModule } from '@nestjs/testing';
import { CryptoService } from './crypto.service';
import * as ccxt from 'ccxt';

jest.mock('ccxt', () => ({
  binance: jest.fn().mockImplementation(() => ({
    fetchBalance: jest.fn().mockResolvedValue({ total: { BTC: 1 } }),
    withdraw: jest.fn().mockResolvedValue({ id: '12345' }),
    setSandboxMode: jest.fn(),
  })),
}));

describe('CryptoService', () => {
  let service: CryptoService;
  let mockBinanceInstance;

  beforeEach(async () => {
    // const module: TestingModule = await Test.createTestingModule({
    //   providers: [CryptoService],
    // }).compile();
    jest.clearAllMocks();
    service = new CryptoService();

    // service = module.get<CryptoService>(CryptoService);
    mockBinanceInstance = service['exchange'];
  });

  it('should fetch balance correctly', async () => {
    const balance = await service.getBalance();
    expect(balance).toEqual({ total: { BTC: 1 } });
    expect(mockBinanceInstance.fetchBalance).toHaveBeenCalled();
  });

  it('should handle withdraw correctly', async () => {
    const response = await service.withdraw('BTC', 0.5, 'address', 'tag', 'network');
    expect(response).toEqual({ id: '12345' });
    // Ensure the withdraw method was called with the correct arguments
    expect(mockBinanceInstance.withdraw).toHaveBeenCalledWith(
      'BTC', 
      0.5, 
      'address', 
      'tag', 
      { 
        addressTag: 'tag', // This was missing in your original expectation
        network: 'network',
      }
    );
  });
});
