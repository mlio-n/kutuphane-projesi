import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany } from 'typeorm';
import { Category } from '../categories/category.entity';
import { Loan } from '../loans/loan.entity';

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  author: string;


  @ManyToOne(() => Category, (category) => category.books, { eager: true, onDelete: 'SET NULL' })
  category: Category;

  @OneToMany(() => Loan, (loan) => loan.book)
  loans: Loan[];
}