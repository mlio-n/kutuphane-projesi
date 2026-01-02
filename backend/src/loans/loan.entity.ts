import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../auth/user.entity';
import { Book } from '../books/book.entity';

@Entity('loans')
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  // Hangi Kitap?
  @ManyToOne(() => Book, (book) => book.loans, { eager: true })
  book: Book;

  // Kim Aldı?
  @ManyToOne(() => User, (user) => user.loans, { eager: true })
  user: User;

  // Ne Zaman Aldı?
  @CreateDateColumn()
  borrowDate: Date;

  // Ne Zaman İade Etti? (Boşsa hala elinde demektir)
  @Column({ nullable: true })
  returnDate: Date;
}