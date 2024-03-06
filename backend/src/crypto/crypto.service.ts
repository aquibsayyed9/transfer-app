import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import * as ccxt from 'ccxt';

@Injectable()
export class CryptoService {
  private exchange: ccxt.Exchange;

  constructor() {
    this.exchange = new ccxt.binance({
        apiKey: process.env.BINANCE_API_KEY || "gEKsTzsskrSvAR24BBLxrlxb4syR1XJYLRPN6z2vc0Zl8OnsdhM8TgB4t5RDmQoo",
        secret: process.env.BINANCE_API_SECRET || "0lNvukzfKJEDkJkD7LC1WCe9K4D6oJMAlX6ZgEwwi0zslXocX8ohfYyEmeAGr58b",
    });

    // Optionally, configure for the testnet as needed
    if (process.env.IS_TESTNET === 'true') {
      this.configureTestnet();
    }
    this.configureTestnet();
  }

  private configureTestnet() {
    this.exchange.setSandboxMode(true);
    // Depending on the exchange, you might also need to set URLs for the testnet manually
    // this.exchange.urls['api'] = 'https://testnet.binance.vision/api';
  }

  async getBalance() {
    try {
      const balance = await this.exchange.fetchBalance();
      console.log("balance: " + JSON.stringify(balance));
      return balance;
    } catch (error) {
      throw new Error(`Failed to fetch balance: ${error.message}`);
    }
  }

  async withdraw(currency: string, amount: number, address: string, tag: string = null, network: string = null) {
    try {
      // Before withdrawing, check if the currency requires a tag/memo (e.g., XRP, XLM)
      const params = tag ? { addressTag: tag } : {};
      // Some exchanges/currencies require specifying the network (e.g., ERC20, TRC20)
      if (network) {
        params['network'] = network;
      }
      const response = await this.exchange.withdraw(currency, amount, address, tag, params);
      console.log("Withdraw response: ", response);
      return response;
    } catch (error) {
      throw new Error(`Failed to withdraw: ${error.message}`);
    }
  }

  async fetchDepositAddress(currency: string): Promise<ccxt.DepositAddress> {
    try {
      const address = await this.exchange.fetchDepositAddress(currency);
      return address;
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  async fetchTransactionsHistory(type: 'deposit' | 'withdrawal', currency: string = '', since: number = undefined, limit: number = undefined): Promise<ccxt.Transaction[]> {
    try {
      let transactions = [];
      if (type === 'deposit') {
        transactions = await this.exchange.fetchDeposits(currency, since, limit);
      } else if (type === 'withdrawal') {
        transactions = await this.exchange.fetchWithdrawals(currency, since, limit);
      }
      return transactions;
    } catch (error) {
      throw new NotFoundException(error.message);
    }
  }

  async checkTransactionStatus(txId: string): Promise<ccxt.Transaction> {
    try {
      // Note: Not all exchanges support fetching a transaction by txId through CCXT
      // You might need to implement custom logic based on the exchange's API
      throw new Error("This method is exchange-specific and may not be supported universally by CCXT.");
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
