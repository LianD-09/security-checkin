import {
    Controller,
    Post,
    Body,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common/exceptions';
import { AuthService } from './auth.service';
import { UserAuthDto } from './dto/user-auth.dto';
import { PrismaService } from '../prisma/prisma.service';

@Controller('auth')
@ApiTags('auth')
export class AuthController {
    constructor(
        private readonly authService: AuthService,
        private readonly prismaService: PrismaService
    ) { }

    @Post()
    async authenticate(@Body() dto: UserAuthDto) {
        try {
            const { password, userName } = dto;
            const userExist = await this.prismaService.user.findFirst({ where: { userName } })

            if (userExist) {
                const isAuthernticated = await this.authService.compareAuth(password, userExist.password);
                if (isAuthernticated) {
                    return {
                        status: HttpStatus.OK,
                        message: "Login successfully!"
                    }
                }
            }
            throw new HttpException(
                {
                    status: HttpStatus.BAD_REQUEST,
                    error: "Wrong username or password!"
                },
                HttpStatus.BAD_REQUEST
            )
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
