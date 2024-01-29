// user.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './user.model';

@Injectable()
export class UserService {
    constructor(@InjectModel(User.name) private userModel: Model<User>) { }

    async createUser(firstName: string, lastName: string): Promise<User> {
        const user = new this.userModel({ firstName, lastName });
        return user.save();
    }

    async getUserById(userId: string): Promise<User | null> {
        return this.userModel.findById(userId).exec();
    }

    async followUser(userId: string, followUserId: string): Promise<User | null> {
        const user = await this.userModel.findById(userId).exec();
        const followUser = await this.userModel.findById(followUserId).exec();

        if (user && followUser) {
            user.following.push(followUser._id);
            return user.save();
        }

        return null;
    }

    // Add more methods as needed
}
