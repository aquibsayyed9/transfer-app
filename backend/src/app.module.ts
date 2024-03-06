import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { CryptoService } from './crypto/crypto.service';
import { CryptoController } from './crypto/crypto.controller';
import { User } from './entities/user.entity';
import { Transaction } from './entities/transaction.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'postgres',
      password: '123456',
      database: 'crypto_transfer',
      entities: [User, Transaction],
      synchronize: true, // Note: only use in development mode
    }),
    TypeOrmModule.forFeature([User, Transaction]),
    ConfigModule.forRoot(),
  ],
  controllers: [CryptoController],
  providers: [CryptoService],
})
export class AppModule {}
