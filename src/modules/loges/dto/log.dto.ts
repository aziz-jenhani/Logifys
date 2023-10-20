// log.dto.ts

import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, Length } from 'class-validator';

export class LogDto {

  @ApiProperty({
    description: 'name',
   
  })
 
  @ApiProperty({
    description: 'A small description for the logs'
})
  @IsNotEmpty()
  @Length(3)
  readonly description: string;

 readonly createdAt: Date;
   app_id : number;

   

}
