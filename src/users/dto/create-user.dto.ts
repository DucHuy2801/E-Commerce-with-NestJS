import { IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";
import { userTypes } from "src/shared/schema/users";

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    name: string;

    @IsNotEmpty()
    @IsString()
    email: string;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @IsIn([userTypes.ADMIN, userTypes.USER])
    type: string;

    @IsNotEmpty()
    @IsOptional()
    secretToken: string;
}