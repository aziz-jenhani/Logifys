// log.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LogDto {

  @ApiProperty({
    description: 'name',
   
  })
  @IsNotEmpty({ message: 'The app should have a title' })
  @Length(3, 255)
  readonly  application_name: string;

  @ApiProperty({
    description: 'A small description for the logs'
})
  @IsNotEmpty()
  @Length(3)
   readonly information_log: string;

 readonly createdAt: Date;
   app_id : number;

   

}
