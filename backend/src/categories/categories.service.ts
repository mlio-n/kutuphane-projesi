import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './category.entity';
import { CreateCategoryDto } from './create-category.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepo: Repository<Category>,
  ) {}

  findAll() {
    return this.categoryRepo.find();
  }

  create(data: CreateCategoryDto) {
    const category = this.categoryRepo.create(data);
    return this.categoryRepo.save(category);
  }

  delete(id: number) {
    return this.categoryRepo.delete(id);
  }
}