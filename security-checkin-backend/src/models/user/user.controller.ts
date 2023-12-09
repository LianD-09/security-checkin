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
import { AuthService } from '../../auth/auth.service';

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
          status: HttpStatus.BAD_REQUEST,
          error: e,
        },
        HttpStatus.BAD_REQUEST,
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
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
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
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
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
    try {
      return await this.userService.update(id, updateUserDto);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }

  @Delete(':id')
  async delete(@Param('id', ParseIntPipe) id: number) {
    try {
      return await this.userService.delete(id);
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          error: error,
        },
        HttpStatus.BAD_REQUEST,
        {
          cause: error,
        },
      );
    }
  }
}
