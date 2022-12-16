export class HttpRequest {
  id?: string;
  authorization?: string;
  body?: any;
}

export class HttpResponse {
  statusCode: number;
  body?: any;
}
