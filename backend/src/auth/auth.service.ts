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

  async register(registerDto: RegisterDto) {
    const { username, password, name, role } = registerDto;

    const existingUser = await this.userRepo.findOne({ where: { username } });
    if (existingUser) {
      throw new BadRequestException('Bu kullanıcı adı zaten kullanılıyor.');
    }

    const newUser = this.userRepo.create({
      name,
      username,
      password: password,
      role: role || 'student',
    });

    const savedUser = await this.userRepo.save(newUser);

    return this.generateToken(savedUser);
  }

  async login(loginDto: LoginDto) {
    const { username, password } = loginDto;

    const user = await this.userRepo.findOne({ where: { username } });
    if (!user) {
      throw new UnauthorizedException('Kullanıcı adı veya şifre hatalı.');
    }

    if (user.password !== password) {
      throw new UnauthorizedException('Kullanıcı adı veya şifre hatalı.');
    }

    return this.generateToken(user);
  }

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

  async deleteUser(id: number) {
    return this.userRepo.delete(id);
  }
}
