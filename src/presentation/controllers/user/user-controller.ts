import { HttpRequest, HttpResponse } from 'src/domain/http';
import { AuthMiddleware } from 'src/presentation/middlewares/auth/auth-middleware';
import { UserService } from 'src/data/services/user-service';
import { HttpResponseHandler } from 'src/main/utils/http/http-response';

export class UserController {
  constructor(
    private readonly service: UserService,
    private readonly authMiddleware: AuthMiddleware,
  ) {}

  async create(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const userBody = httpRequest.body;
      const createdUser = await this.service.create(userBody);
      const http = new HttpResponseHandler(200, createdUser);
      return http.response();
    } catch (error) {
      const http = new HttpResponseHandler(400, error);
      return http.response();
    }
  }

  async getOneById(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.authMiddleware.auth(httpRequest);
      const userId = httpRequest.id;
      const foundUser = await this.service.getOneById(userId);
      const http = new HttpResponseHandler(200, foundUser);
      return http.response();
    } catch (error) {
      const http = new HttpResponseHandler(400, error);
      return http.response();
    }
  }

  async getOneByEmail(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.authMiddleware.auth(httpRequest);
      const userEmail = httpRequest.body.email;
      const foundUser = await this.service.getOneByEmail(userEmail);
      const http = new HttpResponseHandler(200, foundUser);
      return http.response();
    } catch (error) {
      const http = new HttpResponseHandler(400, error);
      return http.response();
    }
  }

  async getAll(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.authMiddleware.auth(httpRequest);
      const foundUsers = await this.service.getAll();
      const http = new HttpResponseHandler(200, foundUsers);
      return http.response();
    } catch (error) {
      const http = new HttpResponseHandler(400, error);
      return http.response();
    }
  }

  async delete(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.authMiddleware.auth(httpRequest);
      const userId = httpRequest.id;
      const foundUser = await this.service.delete(userId);
      const http = new HttpResponseHandler(200, foundUser);
      return http.response();
    } catch (error) {
      const http = new HttpResponseHandler(400, error);
      return http.response();
    }
  }

  async update(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      await this.authMiddleware.auth(httpRequest);
      const userId = httpRequest.id;
      const userBody = httpRequest.body;
      const foundUser = await this.service.update(userBody, userId);
      const http = new HttpResponseHandler(200, foundUser);
      return http.response();
    } catch (error) {
      const http = new HttpResponseHandler(400, error);
      return http.response();
    }
  }

  async login(httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const userBody = httpRequest.body;
      const foundUser = await this.service.login(userBody);
      const http = new HttpResponseHandler(200, foundUser);
      return http.response();
    } catch (error) {
      const http = new HttpResponseHandler(400, error);
      return http.response();
    }
  }
}
