import { Box } from '@mui/material';
import MovieCard from './MovieCard';

export default function MovieGrid({ items }) {
  return (
    <Box sx={{ display: 'grid', gap: 2, gridTemplateColumns: { xs: 'repeat(2, 1fr)', sm: 'repeat(auto-fill, minmax(160px, 1fr))' } }}>
      {items.map((i) => <MovieCard key={`${i.type}-${i.id}`} item={i} />)}
    </Box>
  );
}
