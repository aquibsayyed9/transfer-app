import { Test, TestingModule } from '@nestjs/testing';
import { CryptoController } from './crypto.controller';
import { CryptoService } from './crypto.service';

describe('CryptoController', () => {
  let controller: CryptoController;
  let service: CryptoService;

  beforeEach(async () => {
    const mockCryptoService = {
      getBalance: jest.fn().mockResolvedValue({ total: { BTC: 1 } }),
      withdraw: jest.fn().mockResolvedValue({ id: '12345' }),
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [CryptoController],
      providers: [
        {
          provide: CryptoService,
          useValue: mockCryptoService,
        },
      ],
    }).compile();

    controller = module.get<CryptoController>(CryptoController);
    service = module.get<CryptoService>(CryptoService);
  });

  it('should call getBalance and return balance', async () => {
    await expect(controller.getBalance()).resolves.toEqual({ total: { BTC: 1 } });
    expect(service.getBalance).toHaveBeenCalled();
  });

  it('should call withdraw and return transaction ID', async () => {
    await expect(controller.withdraw('BTC', 0.5, 'address', '', '')).resolves.toEqual({ id: '12345' });
    expect(service.withdraw).toHaveBeenCalledWith('BTC', 0.5, 'address', '', '');
  });
});
