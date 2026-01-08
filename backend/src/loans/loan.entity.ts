import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../auth/user.entity';
import { Book } from '../books/book.entity';

@Entity('loans')
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => Book, (book) => book.loans, { eager: true, onDelete: 'CASCADE' })
  book: Book;

  @ManyToOne(() => User, (user) => user.loans, { eager: true })
  user: User;

  @CreateDateColumn()
  borrowDate: Date;

  @Column({ nullable: true })
  returnDate: Date;
}