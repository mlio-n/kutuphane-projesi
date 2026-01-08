import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { CategoriesModule } from './categories/categories.module';
import { BooksModule } from './books/books.module';
import { LoansModule } from './loans/loans.module';
import { StatsModule } from './stats/stats.module';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'dpg-d5c3q6khg0os73e1vko0-a',
      port: 5432,
      username: 'kutuphane_db_ilml_user',
      password: 'NPi8RSsC3OZY8PG29hJXY4ZQBwquirYv',
      database: 'kutuphane_db_ilml',
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      ssl: false,
      synchronize: true,
    }),
    AuthModule,
    CategoriesModule,
    BooksModule,
    LoansModule,
    StatsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}