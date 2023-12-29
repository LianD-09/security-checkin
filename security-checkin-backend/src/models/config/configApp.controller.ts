import {
    Controller,
    Get,
    Post,
    Body,
    HttpStatus,
} from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { HttpException } from '@nestjs/common/exceptions';
import { UpdateConfigDto } from './dto/configApp.dto';
import * as fs from 'fs';

@Controller('config')
@ApiTags('config')
export class ConfigAppController {
    @Post()
    async update(@Body() updateConfigDto: UpdateConfigDto) {
        try {
            const newData = {
                ACCEPT_DISTANCE: updateConfigDto.distance
            }
            fs.writeFileSync("./config/config.json", JSON.stringify(newData));

            return {
                status: HttpStatus.OK,
                message: "Update config successfully!",
                data: updateConfigDto,
            }
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

    @Get()
    async getConfig() {
        try {
            const configData = fs.readFileSync("./config/config.json");
            return {
                status: HttpStatus.OK,
                data: {
                    distance: JSON.parse(configData.toString('utf8')).ACCEPT_DISTANCE
                }
            }
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
