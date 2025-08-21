package com.seeplace.favorites.service;

import com.seeplace.favorites.dto.FavoriteRequest;
import com.seeplace.favorites.dto.FavoriteResponse;

import java.util.List;

public interface FavoritesService {
    FavoriteResponse addFavorite(FavoriteRequest request);
    List<FavoriteResponse> getAllFavorites();
    FavoriteResponse getFavoriteByPlaceId(String placeId);
    void removeFavorite(String placeId);
    boolean isFavorite(String placeId);
}