import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ImageSchema } from './image.schema';
import { ImageController } from './image.controller';
import { ImageService } from './image.service';
import { ConfigModule } from '@nestjs/config';
import { MongoClient, GridFSBucket } from 'mongodb';

@Module({
    imports: [
        MongooseModule.forFeature([{ name: 'Image', schema: ImageSchema }]),
        ConfigModule,
    ],
    controllers: [ImageController],
    providers: [
        ImageService,
        {
            provide: 'GRID_FS_BUCKET',
            useFactory: async () => {
                const mongoClient = new MongoClient('mongodb+srv://idonice3:4HethOQgS8aUP1iL@cluster0.mvdxyqz.mongodb.net/');
                console.log('Connecting to MongoDB...');
                await mongoClient.connect();
                console.log('Connected to MongoDB successfully!');
                const db = mongoClient.db();
                // Check if the collection exists
                const collectionExists = await db.listCollections({ name: 'images' }).hasNext();
                if (!collectionExists) {
                    console.error('The "images" collection does not exist in the database.');
                }

                return new GridFSBucket(db, {
                    bucketName: 'images',
                });
            },
        },
    ],
    exports: [ImageService],
})
export class ImageModule { }
