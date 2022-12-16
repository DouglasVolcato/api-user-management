import {
  Body,
  Controller,
  Post,
  Headers,
  Get,
  Param,
  Delete,
  Patch,
  UseInterceptors,
} from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger/dist';
import { HttpResponse } from 'src/domain/http';
import { Login } from 'src/domain/login.dto';
import { UserInput } from 'src/domain/user-input';
import { makeUserController } from 'src/main/factories/user-controller-factory';
import { HttpRequestHandler } from 'src/main/utils/http/http-request';
import { ResponseInterceptor } from '../interceptors/response-interceptor';
const user = makeUserController();

@Controller('user')
export class UserController {
  @Post('create-user')
  @UseInterceptors(ResponseInterceptor)
  async create(@Body() body: UserInput): Promise<HttpResponse> {
    const http = new HttpRequestHandler({ body });
    return await user.create(http.request());
  }

  @Get('get-user-by-id/:id')
  @ApiBearerAuth()
  @UseInterceptors(ResponseInterceptor)
  async getOneById(
    @Param('id') id: string,
    @Headers() headers: { authorization: string },
  ): Promise<HttpResponse> {
    const { authorization } = headers;
    const http = new HttpRequestHandler({ id, authorization });
    return await user.getOneById(http.request());
  }

  @Post('get-user-by-email')
  @ApiBearerAuth()
  @UseInterceptors(ResponseInterceptor)
  async getOneByEmail(
    @Body() body: UserInput,
    @Headers() headers: { authorization: string },
  ): Promise<HttpResponse> {
    const { authorization } = headers;
    const http = new HttpRequestHandler({ body, authorization });
    return await user.getOneByEmail(http.request());
  }

  @Get('get-all-users')
  @ApiBearerAuth()
  @UseInterceptors(ResponseInterceptor)
  async getAll(
    @Headers() headers: { authorization: string },
  ): Promise<HttpResponse> {
    const { authorization } = headers;
    const http = new HttpRequestHandler({ authorization });
    return await user.getAll(http.request());
  }

  @Delete('delete-user/:id')
  @ApiBearerAuth()
  @UseInterceptors(ResponseInterceptor)
  async delete(
    @Param('id') id: string,
    @Headers() headers: { authorization: string },
  ): Promise<HttpResponse> {
    const { authorization } = headers;
    const http = new HttpRequestHandler({ id, authorization });
    return await user.delete(http.request());
  }

  @Patch('update-user/:id')
  @ApiBearerAuth()
  @UseInterceptors(ResponseInterceptor)
  async update(
    @Param('id') id: string,
    @Body() body: UserInput,
    @Headers() headers: { authorization: string },
  ): Promise<HttpResponse> {
    const { authorization } = headers;
    const http = new HttpRequestHandler({ body, authorization, id });
    return await user.update(http.request());
  }

  @Post('user-login')
  @UseInterceptors(ResponseInterceptor)
  async login(@Body() body: Login): Promise<HttpResponse> {
    const http = new HttpRequestHandler({ body });
    return await user.login(http.request());
  }
}
