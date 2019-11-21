import { ApiModelProperty } from '@nestjs/swagger';

export class CreateMovieDto {
  @ApiModelProperty()
  name: string;

  @ApiModelProperty()
  description: string;

  @ApiModelProperty({
    type: 'string',
    format: 'date',
  })
  releaseDate: Date;

  @ApiModelProperty({
    isArray: true,
    type: 'number',
  })
  genres: number[];

  @ApiModelProperty()
  durationInMins: number;

  @ApiModelProperty()
  rating: number;
}
