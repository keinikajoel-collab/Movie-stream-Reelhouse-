import { Typography } from '@mui/material';
import MovieRow from '../components/MovieRow';

export default function Home() {
  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>What to watch tonight</Typography>
      <MovieRow title="Trending this week" path="/trending/all/week" />
      <MovieRow title="Popular movies" path="/movie/popular" type="movie" />
      <MovieRow title="Action movies" path="/discover/movie" params={{ with_genres: 28, sort_by: 'popularity.desc' }} type="movie" />
      <MovieRow title="Popular TV shows" path="/tv/popular" type="tv" />
    </>
  );
}
