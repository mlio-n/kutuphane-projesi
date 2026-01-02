import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateBookDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  author: string;

  @IsNumber()
  isbn: number;

  @IsNumber()
  pageCount: number;

  @IsNumber()
  categoryId: number; // Frontend'den tüm kategori objesini değil, sadece ID'sini isteyeceğiz
}