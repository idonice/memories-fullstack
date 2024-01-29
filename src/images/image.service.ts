// src/images/image.service.ts

import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { GridFSBucket, ObjectId, GridFSBucketReadStream } from 'mongodb';
import { InjectModel } from '@nestjs/mongoose';
import { ImageDocument, Image } from './image.schema';
import { Model } from 'mongoose';

@Injectable()
export class ImageService {
    constructor(
        @InjectModel('Image') private readonly imageModel: Model<ImageDocument>,
        @Inject('GRID_FS_BUCKET') private readonly gridFSBucket: GridFSBucket,
    ) { }

    // async getFileIdsByLocation(location: string): Promise<ObjectId[]> {
    //     const images = await this.imageModel.find({ location }).exec();
    //     return images.map((image) => image.fileID as any);
    // }
    async getFileIds(query: string, value: string): Promise<ObjectId[]> {
        const filter: any = {};
        filter[query] = value;
        console.log(filter);
        const images = await this.imageModel.find(filter).exec();
        return images.map((image) => image.fileID as any);
    }


    async getImageStream(fileId: ObjectId): Promise<GridFSBucketReadStream> {
        const stream = this.gridFSBucket.openDownloadStream(fileId);
        return stream;
    }

    async listFiles(): Promise<any[]> {
        const filesCursor = this.gridFSBucket.find();
        return await filesCursor.toArray();
    }

    async createImage(data: {
        userID: string;
        location?: string;
        description?: string;
        file: Express.Multer.File;
    }): Promise<Image> {
        try {
            const { userID, location, description, file } = data;

            const uploadStream = this.gridFSBucket.openUploadStream(file.originalname, {
                metadata: {
                    userID,
                    location,
                    description,
                },
            });

            uploadStream.write(file.buffer);
            uploadStream.end();

            const createdImage = await this.imageModel.create({
                userID,
                location,
                description,
                fileID: uploadStream.id,  // as ObjectId
            });

            return createdImage.toObject();
        } catch (error) {
            // Handle errors appropriately
            console.error('Error creating image:', error);
            throw error;
        }
    }

}
