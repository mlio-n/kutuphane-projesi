import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Loan } from '../loans/loan.entity';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  username: string;

  @Column()
  password: string;

  @Column({ default: 'member' }) // 'admin' veya 'member'
  role: string;

  @Column()
  name: string;

  @OneToMany(() => Loan, (loan) => loan.user)
  loans: Loan[];
}