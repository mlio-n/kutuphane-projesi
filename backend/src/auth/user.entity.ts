import { Column, Entity, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Loan } from '../loans/loan.entity';
import { Book } from '../books/book.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 'member' })
  role: string;

  @Column()
  name: string;

  @OneToMany(() => Loan, (loan) => loan.user)
  loans: Loan[];

  @ManyToMany(() => Book)
  @JoinTable({ name: 'user_favorites' })
  favoriteBooks: Book[];
}