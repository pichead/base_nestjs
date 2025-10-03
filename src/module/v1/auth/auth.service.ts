import { Injectable } from '@nestjs/common';
import { CreateAuthDto } from './dto/create-auth.dto';
import { UpdateAuthDto } from './dto/update-auth.dto';
import { JWT } from 'src/utils';
import logger from 'src/utils/logger';
import { Role } from 'src/common/interface/role.enum';
import { AdminLoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {

  async accessToken(payload, role: Role): Promise<string | null> {
    try {
      return await JWT.access.create({
        ...payload,
        role,
      });
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  async refreshToken(payload, role): Promise<string | null> {
    try {
      return await JWT.refresh.create({
        ...payload,
        role,
      });
    } catch (error) {
      logger.error(error);
      return null;
    }
  }

  create(createAuthDto: CreateAuthDto) {
    return 'This action adds a new auth';
  }

  findAll() {
    return `This action returns all auth`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  update(id: number, updateAuthDto: UpdateAuthDto) {
    return `This action updates a #${id} auth`;
  }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }
}
