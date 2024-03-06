// src/repository/transaction.repository.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Transaction } from '../entities/transaction.entity';
import { User } from '../entities/user.entity';

@Injectable()
export class TransactionRepositoryService {
  constructor(
    @InjectRepository(Transaction)
    private readonly transactionRepository: Repository<Transaction>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async createTransaction(userId: number, currency: string, amount: number, toAddress: string, status: string = 'pending'): Promise<Transaction> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    const transaction = this.transactionRepository.create({
      user,
      amount,
      currency,
      status,
      toAddress,
    });

    await this.transactionRepository.save(transaction);
    return transaction;
  }

  async updateTransactionStatus(transactionId: number, status: string, txId?: string): Promise<Transaction> {
    const transaction = await this.transactionRepository.findOneBy({ id: transactionId });
    if (!transaction) {
      throw new Error('Transaction not found');
    }

    transaction.status = status;
    if (txId) {
      transaction.id = parseFloat(txId);
    }

    await this.transactionRepository.save(transaction);
    return transaction;
  }

  async findTransactionsByUser(userId: number): Promise<Transaction[]> {
    const user = await this.userRepository.findOneBy({ id: userId });
    if (!user) {
      throw new Error('User not found');
    }

    return this.transactionRepository.find({ where: { user: user } });
  }

  async findTransactionsByStatus(status: string): Promise<Transaction[]> {
    return this.transactionRepository.find({ where: { status: status } });
  }
}
