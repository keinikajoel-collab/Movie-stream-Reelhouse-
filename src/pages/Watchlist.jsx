import { Button, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { useWatchlist } from '../context/WatchlistContext';
import MovieGrid from '../components/MovieGrid';
import { Empty } from '../components/Status';

export default function Watchlist() {
  const { items } = useWatchlist();
  return (
    <>
      <Typography variant="h4" sx={{ mb: 3 }}>My Watchlist</Typography>
      {items.length === 0 ? (
        <>
          <Empty>Your watchlist is empty. Tap the bookmark on any poster to save it here.</Empty>
          <div style={{ textAlign: 'center' }}><Button component={Link} to="/" variant="contained">Browse titles</Button></div>
        </>
      ) : (
        <MovieGrid items={items} />
      )}
    </>
  );
}
