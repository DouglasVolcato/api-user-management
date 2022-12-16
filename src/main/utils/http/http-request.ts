import { HttpRequest } from 'src/domain/http';

export class HttpRequestHandler {
  constructor(private readonly clientRequest: any) {}

  request(): HttpRequest {
    const httpRequest: any = {};

    try {
      httpRequest.authorization = this.clientRequest.authorization;
    } catch (error) {
      httpRequest.authorization = '';
    }

    try {
      httpRequest.id = this.clientRequest.id;
    } catch (error) {
      httpRequest.id = '';
    }

    try {
      httpRequest.body = this.clientRequest.body;
    } catch (error) {
      httpRequest.body = {};
    }

    return httpRequest;
  }
}
