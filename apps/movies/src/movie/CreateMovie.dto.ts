export class CreateMovieDto {
  name: string;
  description: string;
  releaseDate: Date;
  genres: number[];
  durationInMins: number;
  rating: number;
}
