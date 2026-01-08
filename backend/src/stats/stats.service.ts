import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Book } from '../books/book.entity';
import { User } from '../auth/user.entity';
import { Category } from '../categories/category.entity';
import { Loan } from '../loans/loan.entity';

@Injectable()
export class StatsService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
    @InjectRepository(User) private userRepo: Repository<User>,
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
    @InjectRepository(Loan) private loanRepo: Repository<Loan>,
  ) {}

  async getDashboardStats() {
    const totalBooks = await this.bookRepo.count();
    const totalUsers = await this.userRepo.count();
    const totalCategories = await this.categoryRepo.count();
    
    const activeLoans = await this.loanRepo.count({
      where: { returnDate: IsNull() }
    });

    return {
      totalBooks,
      totalUsers,
      totalCategories,
      activeLoans
    };
  }
}