'use client';

import { useEffect, useState, useCallback } from 'react';

const KEY = 'alma-carita-favorites';

function readFavorites(): string[] {
  if (typeof window === 'undefined') return [];
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function writeFavorites(ids: string[]) {
  if (typeof window === 'undefined') return;
  localStorage.setItem(KEY, JSON.stringify(ids));
  window.dispatchEvent(new CustomEvent('favorites:changed'));
}

export function useFavorites() {
  const [favorites, setFavorites] = useState<string[]>([]);

  useEffect(() => {
    setFavorites(readFavorites());
    const handler = () => setFavorites(readFavorites());
    window.addEventListener('favorites:changed', handler);
    return () => window.removeEventListener('favorites:changed', handler);
  }, []);

  const toggle = useCallback((id: string) => {
    const current = readFavorites();
    const next = current.includes(id) ? current.filter((x) => x !== id) : [...current, id];
    writeFavorites(next);
  }, []);

  const isFavorite = useCallback((id: string) => favorites.includes(id), [favorites]);

  return { favorites, toggle, isFavorite };
}

export function useFavoritesCount() {
  const { favorites } = useFavorites();
  return favorites.length;
}
