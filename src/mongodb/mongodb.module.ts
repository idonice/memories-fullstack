import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { MongodbService } from './mongodb.service';
import { Image, ImageSchema } from '../images/image.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Image.name, schema: ImageSchema }]),
  ],
  providers: [MongodbService],
  exports: [MongodbService],
})
export class MongodbModule { }
