import { useEffect, useState } from 'react';
import { Box, Chip, Pagination, Typography } from '@mui/material';
import useFetch from '../hooks/useFetch';
import { normalize } from '../api/tmdb';
import MovieGrid from '../components/MovieGrid';
import { Loading, ErrorMessage, Empty } from '../components/Status';

// Used for both the Movies page and the TV Shows page.
export default function Browse({ type }) {
  const [genre, setGenre] = useState('');
  const [page, setPage] = useState(1);
  const label = type === 'movie' ? 'Movies' : 'TV Shows';

  useEffect(() => { setGenre(''); setPage(1); }, [type]);

  const genres = useFetch(`/genre/${type}/list`);
  const { data, loading, error } = useFetch(`/discover/${type}`, {
    sort_by: 'popularity.desc', page, ...(genre && { with_genres: genre }),
  });
  const items = (data?.results || []).map((r) => normalize(r, type));

  return (
    <>
      <Typography variant="h4" sx={{ mb: 2 }}>{label}</Typography>
      <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 3 }}>
        <Chip label="All genres" color={genre === '' ? 'primary' : 'default'} onClick={() => { setGenre(''); setPage(1); }} />
        {(genres.data?.genres || []).map((g) => (
          <Chip key={g.id} label={g.name} color={genre === g.id ? 'primary' : 'default'} onClick={() => { setGenre(g.id); setPage(1); }} />
        ))}
      </Box>
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {!loading && !error && items.length === 0 && <Empty>No titles in this genre. Try another one.</Empty>}
      {!loading && !error && <MovieGrid items={items} />}
      {data?.total_pages > 1 && (
        <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
          <Pagination count={Math.min(data.total_pages, 500)} page={page} siblingCount={0}
            onChange={(_, p) => { setPage(p); window.scrollTo({ top: 0 }); }} />
        </Box>
      )}
    </>
  );
}
