import { useState } from 'react';
import { Outlet, NavLink, useNavigate, useSearchParams } from 'react-router-dom';
import {
  AppBar, Toolbar, Typography, IconButton, Drawer, List, ListItemButton, ListItemIcon,
  ListItemText, Box, TextField, InputAdornment, Link, Badge,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import HomeIcon from '@mui/icons-material/Home';
import MovieIcon from '@mui/icons-material/Movie';
import TvIcon from '@mui/icons-material/Tv';
import BookmarkIcon from '@mui/icons-material/Bookmark';
import { useWatchlist } from '../context/WatchlistContext';

const WIDTH = 220;
const links = [
  { to: '/', label: 'Home', icon: <HomeIcon /> },
  { to: '/movies', label: 'Movies', icon: <MovieIcon /> },
  { to: '/tv', label: 'TV Shows', icon: <TvIcon /> },
  { to: '/watchlist', label: 'My Watchlist', icon: <BookmarkIcon /> },
];

export default function Layout() {
  const [open, setOpen] = useState(false);
  const [params] = useSearchParams();
  const [query, setQuery] = useState(params.get('q') || '');
  const navigate = useNavigate();
  const { items } = useWatchlist();

  const submit = (e) => {
    e.preventDefault();
    if (query.trim()) navigate(`/search?q=${encodeURIComponent(query.trim())}`);
  };

  const nav = (
    <Box sx={{ pt: 1 }}>
      <Toolbar />
      <List>
        {links.map((l) => (
          <ListItemButton
            key={l.to}
            component={NavLink}
            to={l.to}
            end={l.to === '/'}
            onClick={() => setOpen(false)}
            sx={{ mx: 1, borderRadius: 2, '&.active': { bgcolor: 'rgba(255,183,3,.15)', color: 'primary.main' }, '&.active .MuiListItemIcon-root': { color: 'primary.main' } }}
          >
            <ListItemIcon sx={{ minWidth: 40 }}>
              {l.to === '/watchlist' ? <Badge color="primary" badgeContent={items.length} max={99}>{l.icon}</Badge> : l.icon}
            </ListItemIcon>
            <ListItemText primary={l.label} />
          </ListItemButton>
        ))}
      </List>
    </Box>
  );

  return (
    <Box sx={{ display: 'flex', minHeight: '100vh' }}>
      <AppBar position="fixed" color="default" elevation={0} sx={{ zIndex: (t) => t.zIndex.drawer + 1, bgcolor: 'background.paper', backgroundImage: 'none' }}>
        <Toolbar sx={{ gap: 1.5 }}>
          <IconButton edge="start" aria-label="Open menu" onClick={() => setOpen(true)} sx={{ display: { md: 'none' } }}>
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" component={NavLink} to="/" sx={{ color: 'primary.main', textDecoration: 'none', fontWeight: 800, letterSpacing: -0.5, mr: 1 }}>
            Reelhouse
          </Typography>
          <Box component="form" onSubmit={submit} sx={{ flexGrow: 1, maxWidth: 480, ml: { md: 'auto' }, mr: { md: 'auto' } }}>
            <TextField
              fullWidth size="small" placeholder="Search movies and TV shows"
              value={query} onChange={(e) => setQuery(e.target.value)}
              inputProps={{ 'aria-label': 'Search' }}
              InputProps={{ startAdornment: <InputAdornment position="start"><SearchIcon fontSize="small" /></InputAdornment> }}
            />
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer variant="temporary" open={open} onClose={() => setOpen(false)} ModalProps={{ keepMounted: true }}
        sx={{ display: { xs: 'block', md: 'none' }, '& .MuiDrawer-paper': { width: WIDTH } }}>
        {nav}
      </Drawer>
      <Drawer variant="permanent" open
        sx={{ display: { xs: 'none', md: 'block' }, width: WIDTH, flexShrink: 0, '& .MuiDrawer-paper': { width: WIDTH, boxSizing: 'border-box' } }}>
        {nav}
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, minWidth: 0, display: 'flex', flexDirection: 'column' }}>
        <Toolbar />
        <Box sx={{ flexGrow: 1, p: { xs: 2, md: 3 } }}>
          <Outlet />
        </Box>
        <Box component="footer" sx={{ p: 2, textAlign: 'center', color: 'text.secondary', fontSize: 13 }}>
          Data and images from{' '}
          <Link href="https://www.themoviedb.org" target="_blank" rel="noopener" color="inherit">TMDB</Link>.
          This product uses the TMDB API but is not endorsed or certified by TMDB.
        </Box>
      </Box>
    </Box>
  );
}
