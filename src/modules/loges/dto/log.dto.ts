// log.dto.ts

import { ApiProperty } from '@nestjs/swagger';

export class LogDto {
  readonly id: number;



  @ApiProperty({
    description: 'information_log',
   
  })  readonly information_log: string;

  readonly createdAt: Date;
}
