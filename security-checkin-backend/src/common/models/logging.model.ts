export class LoggingModel {
    id: string;

    request: RequestLogger;

    response?: ResponseLogger;
}

class RequestLogger {

    method?: string;

    path: string;

    body?: any;

    params?: any;
}

class ResponseLogger {
    statusCode?: any;

    body: any;
}