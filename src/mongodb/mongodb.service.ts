import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Image } from '../images/image.schema'; // Define your image schema

@Injectable()
export class MongodbService {
    constructor(@InjectModel(Image.name) private readonly imageModel: Model<Image>) { }

    async createImage(location: string, description: string, image: Express.Multer.File): Promise<Image> {
        const newImage = new this.imageModel({ location, description, image });
        return await newImage.save();
    }
}
