import { Link as RouterLink } from 'react-router-dom';
import { Card, CardActionArea, CardMedia, CardContent, Typography, Box, IconButton, Tooltip } from '@mui/material';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import StarIcon from '@mui/icons-material/Star';
import { imageUrl } from '../api/tmdb';
import { useWatchlist } from '../context/WatchlistContext';

export default function MovieCard({ item }) {
  const { has, toggle } = useWatchlist();
  const saved = has(item);
  const poster = imageUrl(item.poster);
  const year = item.date ? item.date.slice(0, 4) : 'Unknown year';

  return (
    <Card sx={{ position: 'relative', height: '100%', transition: 'transform .2s, box-shadow .2s', '&:hover': { transform: 'translateY(-4px)', boxShadow: 8 } }}>
      <CardActionArea component={RouterLink} to={`/${item.type}/${item.id}`}>
        {poster ? (
          <CardMedia component="img" image={poster} alt={`${item.title} poster`} loading="lazy" sx={{ aspectRatio: '2 / 3', objectFit: 'cover' }} />
        ) : (
          <Box sx={{ aspectRatio: '2 / 3', display: 'grid', placeItems: 'center', p: 1, textAlign: 'center', bgcolor: 'action.hover', color: 'text.secondary' }}>
            No poster available
          </Box>
        )}
        <CardContent sx={{ p: 1.25, '&:last-child': { pb: 1.25 } }}>
          <Typography variant="body2" fontWeight={600} noWrap title={item.title}>{item.title}</Typography>
          <Box sx={{ display: 'flex', justifyContent: 'space-between', color: 'text.secondary', fontSize: 13 }}>
            <span>{year}</span>
            <Box component="span" sx={{ display: 'flex', alignItems: 'center', color: 'primary.main' }}>
              <StarIcon sx={{ fontSize: 15, mr: 0.3 }} />{item.rating ? item.rating.toFixed(1) : 'N/A'}
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
      <Tooltip title={saved ? 'Remove from watchlist' : 'Add to watchlist'}>
        <IconButton
          size="small" aria-label={saved ? 'Remove from watchlist' : 'Add to watchlist'}
          onClick={() => toggle(item)}
          sx={{ position: 'absolute', top: 6, right: 6, bgcolor: 'rgba(20,16,28,.75)', '&:hover': { bgcolor: 'rgba(20,16,28,.95)' } }}
        >
          {saved ? <BookmarkIcon color="primary" fontSize="small" /> : <BookmarkAddOutlinedIcon fontSize="small" />}
        </IconButton>
      </Tooltip>
    </Card>
  );
}
