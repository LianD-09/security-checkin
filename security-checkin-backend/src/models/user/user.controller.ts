import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  HttpStatus,
  ParseIntPipe,
  Delete,
  Logger,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common/exceptions';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserService } from './user.service';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
@ApiTags('user')
export class UserController {
  private readonly logger = new Logger("hash pass");

  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService
  ) { }

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    try {
      const { password, ...rest } = createUserDto;
      const hashPassword = await this.authService.hashPassword(password);

      return await this.userService.create({
        ...rest,
        password: hashPassword,
      });
    }
    catch (e) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: e,
        },
        HttpStatus.FORBIDDEN,
        {
          cause: e
        }
      )
    }
  }

  @Get()
  async findAll() {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.userService.findOne(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.FORBIDDEN,
          error: 'This is a custom message',
        },
        HttpStatus.FORBIDDEN,
        {
          cause: error,
        },
      );
    }
  }

  @Post(':id')
  async update(
    @Body() updateUserDto: UpdateUserDto,
    @Param('id', ParseIntPipe) id: number,
  ) {
    return await this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    return await this.userService.delete(id);
  }
}
