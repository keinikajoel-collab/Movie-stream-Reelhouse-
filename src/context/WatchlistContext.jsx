import { createContext, useContext, useEffect, useState } from 'react';

const STORAGE_KEY = 'reelhouse-watchlist';
const WatchlistContext = createContext(null);

const load = () => {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
};

export function WatchlistProvider({ children }) {
  const [items, setItems] = useState(load);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch { /* storage unavailable */ }
  }, [items]);

  const has = (item) => items.some((i) => i.id === item.id && i.type === item.type);
  const toggle = (item) =>
    setItems((prev) =>
      prev.some((i) => i.id === item.id && i.type === item.type)
        ? prev.filter((i) => !(i.id === item.id && i.type === item.type))
        : [...prev, item]
    );

  return <WatchlistContext.Provider value={{ items, has, toggle }}>{children}</WatchlistContext.Provider>;
}

export const useWatchlist = () => useContext(WatchlistContext);
