import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, IsNull } from 'typeorm';
import { Loan } from './loan.entity';
import { Book } from '../books/book.entity';
import { User } from '../auth/user.entity';

@Injectable()
export class LoansService {
  constructor(
    @InjectRepository(Loan) private loanRepo: Repository<Loan>,
    @InjectRepository(Book) private bookRepo: Repository<Book>,
  ) {}

  async getAllLoans() {
    return this.loanRepo.find({ order: { borrowDate: 'DESC' } });
  }

  async getUserLoans(userId: number) {
    return this.loanRepo.find({
      where: { user: { id: userId } },
      order: { borrowDate: 'DESC' },
    });
  }

  async borrowBook(bookId: number, user: User) {
    const book = await this.bookRepo.findOne({ where: { id: bookId } });
    if (!book) throw new NotFoundException('Kitap bulunamadı.');

    const activeLoan = await this.loanRepo.findOne({
      where: { book: { id: bookId }, returnDate: IsNull() },
    });

    if (activeLoan) {
      throw new BadRequestException('Bu kitap şu an başkasında.');
    }

    const userActiveLoansCount = await this.loanRepo.count({
      where: { 
        user: { id: user.id }, 
        returnDate: IsNull() 
      }
    });

    if (userActiveLoansCount >= 1) {
      throw new BadRequestException('Aynı anda en fazla 1 kitap alabilirsin! Önce elindekini iade et.');
    }

    const newLoan = this.loanRepo.create({
      book,
      user,
    });

    return this.loanRepo.save(newLoan);
  }

  async returnBook(bookId: number) {
    const activeLoan = await this.loanRepo.findOne({
      where: { book: { id: bookId }, returnDate: IsNull() },
    });

    if (!activeLoan) {
      throw new BadRequestException('Bu kitap zaten iade edilmiş.');
    }

    activeLoan.returnDate = new Date();
    return this.loanRepo.save(activeLoan);
  }
}