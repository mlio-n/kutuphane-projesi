import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtModule } from '@nestjs/jwt';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { User } from './user.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([User]),
    JwtModule.register({
      global: true,
      secret: 'GIZLI_KELIME', // Gerçek projede env dosyasında olur
      signOptions: { expiresIn: '1h' }, // Giriş 1 saat geçerli kalsın
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}