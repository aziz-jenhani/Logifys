import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class CreateAppliDto {
  @ApiProperty({
    description: 'The name of the app',
    example: 'serve-u',
  })
  @IsNotEmpty({ message: 'The app should have a title' })
  @Length(3, 255)
  name: string;

  @ApiProperty({
    description: 'A small description for the app',
    example:
      'This app about restaurent managment and mobile orders',
  })
  @IsNotEmpty()
  @Length(3)
  description: string;

  
  readonly secretKey: string;


    readonly createdAt: Date;

      readonly updatedAt: Date;




}
