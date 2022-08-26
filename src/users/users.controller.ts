import { CreateUserDto } from './dtos/create-user.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('auth')
export class UsersController {
  constructor(private userService: UsersService) {}
  @Post('/signup')
  create(@Body() body: CreateUserDto) {
    return this.userService.create(body.email, body.password);
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.userService.find(email);
  }

  @Get('/:id')
  getUser(@Param() params) {
    return this.userService.findOne(params.id);
  }

  @Patch('/:id')
  update(@Param('id') id: number, @Body() body: CreateUserDto) {
    return this.userService.update(id, body);
  }

  @Delete('/:id')
  remove(@Param() params) {
    return this.userService.remove(params.id);
  }
}
