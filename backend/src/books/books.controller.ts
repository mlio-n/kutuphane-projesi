import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { BooksService } from './books.service';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  getAll() {
    return this.booksService.getAllBooks();
  }

  @Get(':id')
  getOne(@Param('id') id: string) {
    return this.booksService.getBookById(+id);
  }

  @Post()
  create(@Body() body: any) {
    return this.booksService.createBook(body);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.booksService.deleteBook(+id);
  }
}