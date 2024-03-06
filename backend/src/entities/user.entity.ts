import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Transaction } from './transaction.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string; // In a real app, ensure this is hashed!

  @OneToMany(() => Transaction, (transaction) => transaction.user)
  transactions: Transaction[];
}
