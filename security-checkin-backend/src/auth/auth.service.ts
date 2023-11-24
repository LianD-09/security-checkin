import { Injectable } from '@nestjs/common';
import { compare, hash } from 'bcryptjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class AuthService {
    constructor(
        private readonly prismaService: PrismaService,
    ) { }

    async hashPassword(password: string) {
        return await hash(
            password,
            parseInt(process.env.AUTH_SALT),
        );
    }

    async compareAuth(password: string, hashPassword: string) {
        return compare(password, hashPassword)
    }

    async resetPassword(id: number, password: string) {
        const hashPassword = await this.hashPassword(password);
        
        return await this.prismaService.user.update({
            where: {
                id,
            },
            data: {
                password: hashPassword
            },
        });
    }
}
