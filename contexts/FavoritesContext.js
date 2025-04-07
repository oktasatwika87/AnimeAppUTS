import React, { createContext, useContext, useState } from 'react';

const FavoritesContext = createContext();

export const FavoritesProvider = ({ children }) => {
  const [favorites, setFavorites] = useState([]);

  const addFavorite = (anime) => {
    if (!favorites.some((fav) => fav.mal_id === anime.mal_id)) {
      setFavorites([...favorites, anime]);
    }
  };

  const removeFavorite = (animeId) => {
    setFavorites(favorites.filter((fav) => fav.mal_id !== animeId));
  };

  const isFavorite = (animeId) => {
    return favorites.some((fav) => fav.mal_id === animeId);
  };

  return (
    <FavoritesContext.Provider
      value={{ favorites, addFavorite, removeFavorite, isFavorite }}
    >
      {children}
    </FavoritesContext.Provider>
  );
};

export const useFavorites = () => useContext(FavoritesContext);
