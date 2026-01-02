import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './loan.entity';
import { LoansService } from './loans.service';
import { LoansController } from './loans.controller';
import { Book } from '../books/book.entity';
import { User } from '../auth/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Loan, Book, User])],
  controllers: [LoansController],
  providers: [LoansService],
})
export class LoansModule {}