import { Injectable, BadRequestException } from "@nestjs/common";
import { UsersRepository } from "./users.repository";
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService{
  constructor(private readonly userRepository: UsersRepository){}

  async register(email: string, password: string){
    const exists = await this.userRepository.findByEmail(email);
    if (exists){
      throw new BadRequestException("Email already exists");
    }

    const hashed = await bcrypt.hash(password, 10);

    this.userRepository.create({
      email,
      password: hashed,
    });

    return { message: "Registed successful" };
  }

  async login(email: string, password: string){
    const exists = await this.userRepository.findByEmail(email);
    if (!exists){
      throw new BadRequestException("Invalid email or password");
    }

    const isMatch = await bcrypt.compare(password, exists.password);
    if (!isMatch){
      throw new BadRequestException("Invalid email or password");
    }

    return { message: "Login successful" };
  }
}