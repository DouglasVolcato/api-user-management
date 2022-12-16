import { HttpResponse } from 'src/domain/http';

export class HttpResponseHandler {
  constructor(
    private readonly statusCode: number,
    private readonly body: any,
  ) {}

  response(): HttpResponse {
    return {
      statusCode: this.statusCode,
      body: this.body,
    };
  }
}
