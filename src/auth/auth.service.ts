import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  private readonly adminEmail = 'admin@codesfortomorrow.com';
  private readonly adminPassword = 'Admin123!@#';

  constructor(private readonly jwtService: JwtService) {}

  async auth(email: string, password: string): Promise<any> {
    if (email === this.adminEmail && password === this.adminPassword) {
      return { email };
    }
    return null;
  }

  async login(email: string, password: string) {
    const user = await this.auth(email, password);
    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const payload = { email: user.email };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}