// src/store/slices/favoritesSlice.js
import { createSlice } from '@reduxjs/toolkit';

const favoritesSlice = createSlice({
  name: 'favorites',
  initialState: {
    favorites: [],
    loading: false,
    error: null,
    favoriteStatus: {}, // Track which places are favorited
  },
  reducers: {
    // Fetch favorites
    fetchFavoritesRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    fetchFavoritesSuccess: (state, action) => {
      state.loading = false;
      state.favorites = action.payload;
      // Update favorite status for quick lookup
      state.favoriteStatus = {};
      action.payload.forEach(fav => {
        state.favoriteStatus[fav.placeId] = true;
      });
    },
    fetchFavoritesFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Add favorite
    addFavoriteRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    addFavoriteSuccess: (state, action) => {
      state.loading = false;
      state.favorites.unshift(action.payload.data);
      state.favoriteStatus[action.payload.data.placeId] = true;
    },
    addFavoriteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Remove favorite
    removeFavoriteRequest: (state) => {
      state.loading = true;
      state.error = null;
    },
    removeFavoriteSuccess: (state, action) => {
      state.loading = false;
      const placeId = action.payload;
      state.favorites = state.favorites.filter(fav => fav.placeId !== placeId);
      state.favoriteStatus[placeId] = false;
    },
    removeFavoriteFailure: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    
    // Check favorite status
    updateFavoriteStatus: (state, action) => {
      const { placeId, isFavorite } = action.payload;
      state.favoriteStatus[placeId] = isFavorite;
    },
    
    clearError: (state) => {
      state.error = null;
    }
  }
});

export const {
  fetchFavoritesRequest,
  fetchFavoritesSuccess,
  fetchFavoritesFailure,
  addFavoriteRequest,
  addFavoriteSuccess,
  addFavoriteFailure,
  removeFavoriteRequest,
  removeFavoriteSuccess,
  removeFavoriteFailure,
  updateFavoriteStatus,
  clearError
} = favoritesSlice.actions;

export default favoritesSlice.reducer;