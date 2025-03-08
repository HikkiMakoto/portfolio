import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import * as bcrypt from 'bcrypt';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private configService: ConfigService,
  ) {}

  async validateUser(loginDto: LoginDto): Promise<any> {
    const adminEmail = this.configService.get<string>('ADMIN_EMAIL');
    const adminPassword = this.configService.get<string>('ADMIN_PASSWORD');

    if (loginDto.email !== adminEmail) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(
      loginDto.password,
      await bcrypt.hash(adminPassword, 10) // This is a simplified approach; in a real app, you'd store hashed passwords
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return { userId: 'admin', email: adminEmail, role: 'admin' };
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user.userId, role: user.role };
    
    return {
      access_token: this.jwtService.sign(payload),
      user: {
        email: user.email,
        role: user.role
      }
    };
  }
}