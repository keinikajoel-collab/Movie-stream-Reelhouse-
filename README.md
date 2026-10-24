# Reelhouse – Movie Discovery Web Application

A responsive movie and TV discovery app built for the *Web and Mobile Application Development* practical assignment.

## Features
- Dark-themed homepage with Trending, Popular Movies, Action Movies and Popular TV Shows rows
- Live data from the **TMDB API** (nothing hardcoded)
- Search by title (movies and TV) with loading, empty and error states
- Details page: poster, overview, release date, rating, genres, runtime, trailer link
- Movies and TV Shows pages with working **genre filter** and pagination
- **My Watchlist** saved in `localStorage` (survives refresh)
- Responsive: permanent sidebar on desktop, drawer menu on tablet/mobile, 2-column poster grid on phones

## Technologies
React 18 (JSX) · Vite · Material UI · React Router · Fetch API · TMDB REST API

## Run locally
1. Create a free account at https://www.themoviedb.org and request an API key (Settings → API). Use the **API Key (v3 auth)**.
2. Install and configure:
   ```bash
   npm install
   cp .env.example .env      # then paste your key into .env
   npm run dev
   ```
3. Open http://localhost:5173

## Deploy (Vercel / Netlify)
Add `VITE_TMDB_API_KEY` as an environment variable in the host's dashboard, then deploy. `vercel.json` and `public/_redirects` handle client-side routing.
> Note: any key used in a Vite frontend is visible in the built bundle. TMDB's v3 key is intended for this use, but never commit it. `.env` is git-ignored.

## Project structure
```
src/
  api/tmdb.js            fetch wrapper + data normalisation
  hooks/useFetch.js      useState/useEffect data loading hook
  context/WatchlistContext.jsx   watchlist + localStorage
  components/            Layout, MovieCard, MovieGrid, MovieRow, Status
  pages/                 Home, Browse (Movies/TV), Search, Details, Watchlist
```

## Attribution
This product uses the TMDB API but is not endorsed or certified by TMDB. Movie data and images © TMDB.
