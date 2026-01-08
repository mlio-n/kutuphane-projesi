import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Book } from './book.entity';

@Injectable()
export class BooksService {
  constructor(
    @InjectRepository(Book) private bookRepo: Repository<Book>,
  ) {}

  async getAllBooks() {
    return this.bookRepo.find({
      order: { id: 'DESC' },
      relations: ['loans', 'category'],
    });
  }

  async createBook(body: any) {
    const newBook = this.bookRepo.create({
      title: body.title,
      author: body.author,
      category: body.category
    });

    return this.bookRepo.save(newBook);
  }

  async deleteBook(id: number) {
    const result = await this.bookRepo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`ID'si ${id} olan kitap bulunamadı.`);
    }
    return { deleted: true };
  }
  
  async getBookById(id: number) {
     const book = await this.bookRepo.findOne({ 
        where: { id },
        relations: ['loans', 'category'] 
     });
     if (!book) throw new NotFoundException('Kitap bulunamadı');
     return book;
  }
}