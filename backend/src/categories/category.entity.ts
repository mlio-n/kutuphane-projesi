import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Book } from '../books/book.entity';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @OneToMany(() => Book, (book) => book.category)
  books: Book[];
}