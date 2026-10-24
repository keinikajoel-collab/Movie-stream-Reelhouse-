import { Box, Typography } from '@mui/material';
import useFetch from '../hooks/useFetch';
import { normalize } from '../api/tmdb';
import MovieCard from './MovieCard';
import { Loading, ErrorMessage, Empty } from './Status';

// A titled, horizontally scrolling row of posters fed by one API endpoint.
export default function MovieRow({ title, path, params, type }) {
  const { data, loading, error } = useFetch(path, params);
  const items = (data?.results || []).map((r) => normalize(r, type)).filter((i) => i.type !== 'person');

  return (
    <Box component="section" sx={{ mb: 4 }}>
      <Typography variant="h6" sx={{ mb: 1.5 }}>{title}</Typography>
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && items.length === 0 && <Empty>Nothing to show here yet.</Empty>}
      <Box sx={{ display: 'flex', gap: 2, overflowX: 'auto', pb: 1.5, scrollSnapType: 'x proximity' }}>
        {items.map((i) => (
          <Box key={`${i.type}-${i.id}`} sx={{ flex: '0 0 auto', width: { xs: 130, sm: 160 }, scrollSnapAlign: 'start' }}>
            <MovieCard item={i} />
          </Box>
        ))}
      </Box>
    </Box>
  );
}
