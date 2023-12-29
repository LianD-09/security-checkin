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
import * as configData from "../../../config/config.json";
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
            return {
                status: HttpStatus.OK,
                data: {
                    distance: configData.ACCEPT_DISTANCE
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
