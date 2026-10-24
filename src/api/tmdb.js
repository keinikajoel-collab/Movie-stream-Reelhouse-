// Thin wrapper around the TMDB v3 REST API.
const BASE = 'https://api.themoviedb.org/3';
const KEY = import.meta.env.VITE_TMDB_API_KEY;

export const imageUrl = (path, size = 'w342') =>
  path ? `https://image.tmdb.org/t/p/${size}${path}` : null;

export async function tmdb(path, params = {}, signal) {
  if (!KEY) throw new Error('Missing API key. Add VITE_TMDB_API_KEY to your .env file (see README).');
  const qs = new URLSearchParams({ api_key: KEY, language: 'en-US', ...params });
  const res = await fetch(`${BASE}${path}?${qs}`, { signal });
  if (!res.ok) throw new Error(`The movie service returned an error (${res.status}). Try again shortly.`);
  return res.json();
}

// Normalise movie/TV objects so components don't care about field differences.
export const normalize = (i, fallbackType) => ({
  id: i.id,
  type: i.media_type || fallbackType || (i.title ? 'movie' : 'tv'),
  title: i.title || i.name || 'Untitled',
  poster: i.poster_path || null,
  rating: i.vote_average || 0,
  date: i.release_date || i.first_air_date || '',
});
