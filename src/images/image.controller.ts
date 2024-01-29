// src/images/image.controller.ts
import { Get, Controller, Post, UseInterceptors, UploadedFile, Body, Param, Res, Query } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ImageService } from './image.service';
import { ObjectId } from 'mongodb';
import { Response } from '@nestjs/common';
@Controller('images')
export class ImageController {
    constructor(private readonly imageService: ImageService) { }
    // @Get('test')
    // getTest(): string {
    //     return 'test';
    // }
    // @Get('byLocation')
    // async getImagesByLocation(@Query('location') location: string): Promise<ObjectId[]> {
    //     return this.imageService.getFileIdsByLocation(location);
    // }

    @Get('')
    async getImagesByLocation(@Query('location') location?: string, @Query('userID') userID?: string): Promise<ObjectId[]> {
        let query = '';
        if (location) {
            query = 'location';
            return this.imageService.getFileIds(query, location);
        }
        else {
            query = 'userID';
            return this.imageService.getFileIds(query, userID);
        }
    }



    @Get(':id')
    async getImage(@Param('id') fileId: string, @Res() res: Response): Promise<void> {
        try {
            console.log('Received fileId:', fileId);  // Add this line for debugging
            const objectId = new ObjectId(fileId); // Convert the string to ObjectId
            const stream = await this.imageService.getImageStream(objectId);
            // Set the appropriate headers for an image response
            (res as any).setHeader('Content-Type', 'image/jpeg'); // Adjust the content type based on your image type

            // Pipe the image stream to the response
            stream.pipe(res as any);
        } catch (error) {
            console.error('Error getting image:', error);
            throw error;
        }
    }

    // @Get('list')
    // async listFiles(): Promise<any[]> {
    //     return this.imageService.listFiles();
    // }



    @Post('upload')
    @UseInterceptors(FileInterceptor('image'))
    async uploadImage(
        @UploadedFile() image: Express.Multer.File,
        @Body('userID') userID: string,
        @Body('location') location?: string,
        @Body('description') description?: string,
    ) {
        const createdImage = await this.imageService.createImage({
            userID,
            location,
            description,
            file: image,
        });

        return createdImage;
    }

}
