// Import necessary modules from Mongoose
import { Schema, model, Document } from 'mongoose';
import { ObjectId } from 'bson';

// Define your Image interface and schema
export interface Image {
    userID: string;
    location?: string;
    description?: string;
    fileID: Schema.Types.ObjectId;
}

export type ImageDocument = Image & Document;

export const ImageSchema = new Schema<ImageDocument>({
    userID: { type: String, required: true },
    location: { type: String },
    description: { type: String },
    fileID: { type: ObjectId, required: true }
});

// Create the Mongoose model for 'Image'
const ImageModel = model<ImageDocument>('Image', ImageSchema);

// Export the model to be used in other parts of your application
export { ImageModel };
