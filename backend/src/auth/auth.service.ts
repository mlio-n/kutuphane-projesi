import { Injectable, UnauthorizedException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { User } from './user.entity';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private jwtService: JwtService,
  ) {}

  // --- KAYIT OLMA (REGISTER) ---
  async register(registerDto: RegisterDto) {
    const { username, password, name, role } = registerDto;

    // 1. Kullanıcı adı var mı kontrol et
    const existingUser = await this.userRepo.findOne({ where: { username } });
    if (existingUser) {
      throw new BadRequestException('Bu kullanıcı adı zaten kullanılıyor.');
    }

    // 2. Kullanıcıyı oluştur (ŞİFRELEME YOK, DÜZ METİN)
    const newUser = this.userRepo.create({
      name,
      username,
      password: password, // Şifreyi olduğu gibi kaydediyoruz
      role: role || 'student', // Rol gelmezse 'student' olsun
    });

    // 3. Veritabanına kaydet
    const savedUser = await this.userRepo.save(newUser);

    // 4. Token üretip döndür
    return this.generateToken(savedUser);
  }

  // --- GİRİŞ YAPMA (LOGIN) ---
  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    // 1. Kullanıcıyı bul
    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Kullanıcı adı veya şifre hatalı.');
    }

    // 2. Şifreyi kontrol et (DÜZ KONTROL)
    // Kullanıcının girdiği şifre === Veritabanındaki şifre mi?
    if (user.password !== password) {
      throw new UnauthorizedException('Kullanıcı adı veya şifre hatalı.');
    }

    // 3. Başarılıysa token üret
    return this.generateToken(user);
  }

  // --- TOKEN ÜRETİCİ ---
  private async generateToken(user: User) {
    const payload = { sub: user.id, username: user.username, role: user.role };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        id: user.id,
        name: user.name,
        username: user.username,
        role: user.role,
      },
    };
  }
  async getAllUsers() {
    return this.userRepo.find();
  }

  // KULLANICI SİL
  async deleteUser(id: number) {
    return this.userRepo.delete(id);
  }
}
