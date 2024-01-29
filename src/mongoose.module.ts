// src/mongoose.module.ts

import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
    imports: [
        MongooseModule.forRoot('mongodb+srv://idonice3:4HethOQgS8aUP1iL@cluster0.mvdxyqz.mongodb.net/')
    ],
})
export class MongooseConfigModule { }
