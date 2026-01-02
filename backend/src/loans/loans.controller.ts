import { Controller, Get, Post, Param, UseGuards, Request, Put } from '@nestjs/common';
import { LoansService } from './loans.service';
import { AuthGuard } from '@nestjs/passport'; // Token kontrolü için (Opsiyonel ama iyi olur)

@Controller('loans')
export class LoansController {
  constructor(private loansService: LoansService) {}

  // Tüm ödünçleri gör (Sadece Admin görebilmeli aslında ama şimdilik açık olsun)
  @Get()
  getAll() {
    return this.loansService.getAllLoans();
  }

  // Benim ödünçlerimi getir
  @Get('my-loans')
  getMyLoans(@Request() req) {
    // Not: Bu kısmın çalışması için JWT Guard lazım, şimdilik ID'yi elle yollayacağız
    // İleride token'dan alacağız. Şimdilik admin panelinden görelim.
    return []; 
  }

  // Kitap Ödünç Al (POST /loans/borrow/:bookId)
  // Body'de userId göndereceğiz (Geçici olarak)
  @Post('borrow/:bookId')
  borrow(@Param('bookId') bookId: string, @Request() req) {
    // Not: Normalde kullanıcıyı token'dan alırız. 
    // Ama sistemi basitleştirmek için, User entity'sini Frontend'den yollayacağız.
    return this.loansService.borrowBook(parseInt(bookId), req.body.user); 
  }

  // Kitap İade Et (PUT /loans/return/:bookId)
  @Put('return/:bookId')
  returnBook(@Param('bookId') bookId: string) {
    return this.loansService.returnBook(parseInt(bookId));
  }
}