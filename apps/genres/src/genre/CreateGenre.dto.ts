import { ApiModelProperty } from '@nestjs/swagger';

export class CreateGenreDto {
  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  description: string;
}
