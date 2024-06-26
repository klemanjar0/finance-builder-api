import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
  Request,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import {
  CreateUserDto,
  CreateUserPayload,
  SignInSuccessDto,
  SignInUserDto,
} from './entities';
import { AuthGuard } from './auth.guard';
import {
  ApiBody,
  ApiOperation,
  ApiProperty,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';
import { getUserIdFromRequest } from '../../utils/utility';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('register')
  @ApiBody({
    type: CreateUserDto,
    examples: {
      User: {
        description: 'Blank user schema',
        value: { email: 'user@gmail.com', password: '123321Qwe!' },
      },
    },
  })
  @ApiOperation({
    summary: 'Create a new user.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns access token.',
    type: SignInSuccessDto,
  })
  @ApiResponse({
    status: 409,
    description: 'User with provided name already exists.',
  })
  register(@Body() payload: CreateUserDto): Promise<SignInSuccessDto> {
    return this.authService.create(payload);
  }

  @Post('sign_in')
  @ApiBody({ type: SignInUserDto })
  @ApiOperation({
    summary: 'Get access token by credentials.',
  })
  @ApiResponse({
    status: 200,
    description: 'Returns access token.',
    type: SignInSuccessDto,
  })
  @ApiResponse({
    status: 404,
    description: 'Password is not correct or user not found.',
  })
  @ApiResponse({
    status: 422,
    description: 'Request body is not full or user does not exist.',
  })
  signIn(@Body() payload: SignInUserDto): Promise<SignInSuccessDto> {
    return this.authService.signIn(payload);
  }

  @UseGuards(AuthGuard)
  @Get('check_auth')
  @ApiResponse({
    status: 200,
    description: 'The found record.',
  })
  @ApiResponse({
    status: 401,
    description: 'Unauthorized.',
  })
  getProfile(@Request() req: Request) {
    return this.authService.getProfile(getUserIdFromRequest(req));
  }
}
