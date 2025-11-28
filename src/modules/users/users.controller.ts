import { Controller, Post, Body } from "@nestjs/common";
import { UsersService } from "./users.service";
import { RegisterDto } from "./dto/users-register.dto";
import { LoginDto } from "./dto/users-login.dto";

@Controller('user')
export class UsersController{
  constructor(private readonly usersService: UsersService){}

  @Post('register')
  async register(@Body() dto: RegisterDto){
    return this.usersService.register(dto.email, dto.password);
  }

  @Post('login')
  async login(@Body() dto: LoginDto){
    return this.usersService.login(dto.email, dto.password);
  }
}