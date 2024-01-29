// user.model.ts
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Types } from 'mongoose';

@Schema()
export class User extends Document {
    @Prop({ required: true })
    firstName: string;

    @Prop({ required: true })
    lastName: string;

    @Prop({ type: [{ type: Types.ObjectId, ref: 'User' }] })
    following: Types.ObjectId[];

    @Prop({ type: Types.ObjectId, ref: 'File' }) // Assuming you have a File model for images
    profileImg: Types.ObjectId;
}

export const UserSchema = SchemaFactory.createForClass(User);
