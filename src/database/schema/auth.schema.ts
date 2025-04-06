import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";
import { Permission } from "src/common/enums/permission.enum";
import { v4 as uuidv4 } from "uuid";

export type AuthDocument = HydratedDocument<Auth>;

@Schema({ timestamps: true, versionKey: false })
export class Auth {
    @Prop({ default: uuidv4 })
    _id: string;

    @Prop({ required: true, unique: true })
    username: string;

    @Prop({ required: true })
    password: string;

    @Prop({
        required: true,
        type: String,
        enum: Permission,
        default: Permission.USER,
    })
    permission: Permission;

    @Prop({ required: true })
    nickname: string;
}

export const AuthSchema = SchemaFactory.createForClass(Auth);

AuthSchema.pre('save', function (next) {
    if (!this.isNew) {
        this._id = uuidv4();
    }
    next();
});