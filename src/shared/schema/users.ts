import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export enum userTypes {
    ADMIN = 'admin',
    USER = 'user'
}

@Schema({
    timestamps: true,
})

export class Users extends Document {
    @Prop({required: true})
    name: string;

    @Prop({required: true})
    email: string;

    @Prop({required: true})
    password: string;

    @Prop({ required: true, enum: [userTypes.ADMIN, userTypes.USER] })
    type: string;

    @Prop({default: null})
    otp: string;

    @Prop({default: null})
    otpExpiryTime: Date;

}

export const UserSchema = SchemaFactory.createForClass(Users);