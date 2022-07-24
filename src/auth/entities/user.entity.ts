import { ApiProperty } from "@nestjs/swagger";

export class User {
    //represent database table
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    username: string;

}