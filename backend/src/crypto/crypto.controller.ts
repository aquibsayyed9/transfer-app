import { Controller, Get, Post, Query } from '@nestjs/common';
import { CryptoService } from './crypto.service';
import * as ccxt from 'ccxt';

@Controller('crypto')
export class CryptoController {

    private exchange: ccxt.Exchange;
    constructor(private readonly cryptoService: CryptoService) {}

    @Get('balance')
    getBalance() {
        return this.cryptoService.getBalance();
    }

    @Post('withdraw')
    withdraw(
        @Query('currency') currency: string, 
        @Query('amount') amount: number, 
        @Query('address') address: string, 
        @Query('tag') tag: string = '', 
        @Query('network') network: string = ''
    ) {
        return this.cryptoService.withdraw(currency, amount, address, tag, network);
    }
}
