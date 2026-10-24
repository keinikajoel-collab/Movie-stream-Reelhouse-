import { useParams, useNavigate } from 'react-router-dom';
import { Box, Button, Chip, Typography } from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import StarIcon from '@mui/icons-material/Star';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import useFetch from '../hooks/useFetch';
import { imageUrl, normalize } from '../api/tmdb';
import { useWatchlist } from '../context/WatchlistContext';
import { Loading, ErrorMessage } from '../components/Status';

export default function Details() {
  const { type, id } = useParams();
  const navigate = useNavigate();
  const valid = type === 'movie' || type === 'tv';
  const { data, loading, error } = useFetch(valid ? `/${type}/${id}` : null, { append_to_response: 'videos' });
  const { has, toggle } = useWatchlist();

  if (!valid) return <ErrorMessage message="That page doesn't exist." />;
  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;
  if (!data) return null;

  const item = normalize(data, type);
  const poster = imageUrl(data.poster_path, 'w500');
  const backdrop = imageUrl(data.backdrop_path, 'w1280');
  const trailer = data.videos?.results?.find((v) => v.site === 'YouTube' && v.type === 'Trailer');
  const saved = has(item);
  const runtime = data.runtime ? `${data.runtime} min` : data.number_of_seasons ? `${data.number_of_seasons} season(s)` : null;

  return (
    <Box>
      <Button startIcon={<ArrowBackIcon />} onClick={() => navigate(-1)} sx={{ mb: 2 }}>Back</Button>
      <Box sx={{ position: 'relative', borderRadius: 3, overflow: 'hidden', p: { xs: 2, md: 4 }, backgroundColor: 'background.paper',
        backgroundImage: backdrop ? `linear-gradient(rgba(20,16,28,.88), rgba(20,16,28,.88)), url(${backdrop})` : 'none', backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <Box sx={{ display: 'flex', gap: 4, flexDirection: { xs: 'column', md: 'row' }, alignItems: { xs: 'center', md: 'flex-start' } }}>
          {poster ? (
            <Box component="img" src={poster} alt={`${item.title} poster`} sx={{ width: { xs: 220, md: 300 }, borderRadius: 2, boxShadow: 8 }} />
          ) : (
            <Box sx={{ width: { xs: 220, md: 300 }, aspectRatio: '2 / 3', display: 'grid', placeItems: 'center', bgcolor: 'action.hover', borderRadius: 2 }}>No poster available</Box>
          )}
          <Box sx={{ minWidth: 0 }}>
            <Typography variant="h4">{item.title}</Typography>
            {data.tagline && <Typography color="text.secondary" sx={{ fontStyle: 'italic', mt: 0.5 }}>{data.tagline}</Typography>}
            <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap', alignItems: 'center', my: 2, color: 'text.secondary' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', color: 'primary.main', fontWeight: 600 }}>
                <StarIcon sx={{ mr: 0.5 }} />{item.rating ? `${item.rating.toFixed(1)} / 10` : 'Not rated'}
              </Box>
              <span>{item.date || 'Release date unknown'}</span>
              {runtime && <span>{runtime}</span>}
            </Box>
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              {data.genres?.length ? data.genres.map((g) => <Chip key={g.id} label={g.name} size="small" />) : <Chip label="Genre unavailable" size="small" />}
            </Box>
            <Typography sx={{ maxWidth: 680, lineHeight: 1.7 }}>{data.overview || 'No overview is available for this title.'}</Typography>
            <Box sx={{ display: 'flex', gap: 1.5, flexWrap: 'wrap', mt: 3 }}>
              <Button variant={saved ? 'outlined' : 'contained'} startIcon={saved ? <BookmarkIcon /> : <BookmarkAddOutlinedIcon />} onClick={() => toggle(item)}>
                {saved ? 'Remove from watchlist' : 'Add to watchlist'}
              </Button>
              {trailer && (
                <Button variant="outlined" href={`https://www.youtube.com/watch?v=${trailer.key}`} target="_blank" rel="noopener">Watch trailer</Button>
              )}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
