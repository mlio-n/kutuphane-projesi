import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StatsController } from './stats.controller';
import { StatsService } from './stats.service';
import { Book } from '../books/book.entity';
import { User } from '../auth/user.entity';
import { Category } from '../categories/category.entity';
import { Loan } from '../loans/loan.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Book, User, Category, Loan])],
  controllers: [StatsController],
  providers: [StatsService],
})
export class StatsModule {}