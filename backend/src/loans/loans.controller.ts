import { Controller, Get, Post, Param, UseGuards, Request, Put } from '@nestjs/common';
import { LoansService } from './loans.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('loans')
export class LoansController {
  constructor(private loansService: LoansService) {}

  @Get()
  getAll() {
    return this.loansService.getAllLoans();
  }

  @Get('my-loans')
  getMyLoans(@Request() req) {
    return []; 
  }

  @Post('borrow/:bookId')
  borrow(@Param('bookId') bookId: string, @Request() req) {
    return this.loansService.borrowBook(parseInt(bookId), req.body.user); 
  }

  @Put('return/:bookId')
  returnBook(@Param('bookId') bookId: string) {
    return this.loansService.returnBook(parseInt(bookId));
  }
}