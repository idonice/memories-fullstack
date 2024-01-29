// src/app.module.ts

import { Module } from '@nestjs/common';
import { MongooseConfigModule } from './mongoose.module';
import { ImageModule } from './images/image.module';

@Module({
  imports: [MongooseConfigModule, ImageModule],
  controllers: [],
  providers: [],
})
export class AppModule { }
