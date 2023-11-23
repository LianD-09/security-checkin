import {
    CallHandler,
    ExecutionContext,
    Logger,
    NestInterceptor,
} from '@nestjs/common';
import { Observable, map } from 'rxjs';
import { v4 as uuidv4 } from 'uuid';
import { LoggingModel } from '../models/logging.model';

export class LoggerInterceptor implements NestInterceptor {
    private logger = new Logger('😌😍 ResponseInterceptor');

    intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
        const requestId = uuidv4();
        const req = context.switchToHttp().getRequest();
        const now = Date.now();

        let logData: LoggingModel;

        return next.handle().pipe(
            map((res) => {
                logData = {
                    id: requestId,
                    request: {
                        path: req.path,
                        method: req.method,
                        body: req.body,
                        params: req.params
                    },
                    response: {
                        statusCode: req.statusCode,
                        body: res,
                    }
                }

                this.logger.debug(
                    `${context.getClass().name} - Time: ${Date.now() - now} ms`,
                    logData
                );

                return res;
            }),
        );
    }
}