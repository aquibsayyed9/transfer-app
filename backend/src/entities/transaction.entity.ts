import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Transaction {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  amount: number;

  @Column()
  currency: string;

  @Column({ default: 'pending' })
  status: string;

  @Column()
  toAddress: string;

  @ManyToOne(() => User, (user) => user.transactions)
  user: User;
}
