import { useSearchParams } from 'react-router-dom';
import { Typography } from '@mui/material';
import useFetch from '../hooks/useFetch';
import { normalize } from '../api/tmdb';
import MovieGrid from '../components/MovieGrid';
import { Loading, ErrorMessage, Empty } from '../components/Status';

export default function Search() {
  const [params] = useSearchParams();
  const q = (params.get('q') || '').trim();
  const { data, loading, error } = useFetch(q ? '/search/multi' : null, { query: q });
  const items = (data?.results || [])
    .filter((r) => r.media_type === 'movie' || r.media_type === 'tv')
    .map((r) => normalize(r));

  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>{q ? `Results for “${q}”` : 'Search'}</Typography>
      {!q && <Empty>Type a title in the search bar above to get started.</Empty>}
      {loading && <Loading />}
      {error && <ErrorMessage message={error} />}
      {q && !loading && !error && items.length === 0 && <Empty>No matches for “{q}”. Check the spelling or try a different title.</Empty>}
      {items.length > 0 && <MovieGrid items={items} />}
    </>
  );
}
