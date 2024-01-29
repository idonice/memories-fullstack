// user.controller.ts
import { Controller, Post, Body, Param, Get } from '@nestjs/common';
import { UserService } from './user.service';

@Controller('users')
export class UserController {
    constructor(private readonly userService: UserService) { }

    @Post()
    async createUser(@Body('firstName') firstName: string, @Body('lastName') lastName: string) {
        const user = await this.userService.createUser(firstName, lastName);
        return user;
    }

    @Get(':userId')
    async getUserById(@Param('userId') userId: string) {
        const user = await this.userService.getUserById(userId);
        return user;
    }

    @Post(':userId/follow/:followUserId')
    async followUser(@Param('userId') userId: string, @Param('followUserId') followUserId: string) {
        const user = await this.userService.followUser(userId, followUserId);
        return user;
    }

    // Add more routes as needed
}
