import { Body, Controller, Post, Get, Delete, Param } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dtos/register.dto';
import { LoginDto } from './dtos/login.dto';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/register')
  register(@Body() body: RegisterDto) {
    return this.authService.register(body);
  }

  @Post('/login')
  login(@Body() body: LoginDto) {
    return this.authService.login(body);
  }


  @Get('/users')
  getUsers() {
    return this.authService.getAllUsers();
  }

  @Delete('/users/:id')
  deleteUser(@Param('id') id: string) {
    return this.authService.deleteUser(parseInt(id));
  }
}