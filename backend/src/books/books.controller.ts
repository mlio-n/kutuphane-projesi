import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  // Tüm kitapları getir
  @Get()
  getAll() {
    // BURASI DEĞİŞTİ: findAll -> getAllBooks
    return this.booksService.getAllBooks();
  }

  // Tek bir kitap getir
  @Get(':id')
  getOne(@Param('id') id: string) {
    // BURASI DEĞİŞTİ: findOne -> getBookById
    return this.booksService.getBookById(+id);
  }

  // Yeni kitap ekle
  @Post()
  create(@Body() body: any) {
    // BURASI DEĞİŞTİ: create -> createBook
    return this.booksService.createBook(body);
  }

  // Kitap sil
  @Delete(':id')
  delete(@Param('id') id: string) {
    // BURASI DEĞİŞTİ: delete -> deleteBook
    return this.booksService.deleteBook(+id);
  }
}