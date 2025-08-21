package com.seeplace.favorites.service.impl;

import com.seeplace.favorites.dto.FavoriteRequest;
import com.seeplace.favorites.dto.FavoriteResponse;
import com.seeplace.favorites.entity.Favorite;
import com.seeplace.favorites.repository.FavoritesRepository;
import com.seeplace.favorites.service.FavoritesService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Transactional
public class FavoritesServiceImpl implements FavoritesService {

    private final FavoritesRepository favoritesRepository;

    @Override
    public FavoriteResponse addFavorite(FavoriteRequest request) {
        // Check if already exists
        if (favoritesRepository.existsByPlaceIdAndActive(request.getPlaceId())) {
            throw new RuntimeException("Place already favorited");
        }

        Favorite favorite = Favorite.builder()
                .placeId(request.getPlaceId())
                .placeName(request.getPlaceName())
                .placeAddress(request.getPlaceAddress())
                .latitude(request.getLatitude())
                .longitude(request.getLongitude())
                .placeTypes(request.getPlaceTypes())
                .rating(request.getRating())
                .photoReference(request.getPhotoReference())
                .notes(request.getNotes())
                .isActive(true)
                .build();

        Favorite saved = favoritesRepository.save(favorite);
        return mapToResponse(saved);
    }

    @Override
    @Transactional(readOnly = true)
    public List<FavoriteResponse> getAllFavorites() {
        return favoritesRepository.findAllActive()
                .stream()
                .map(this::mapToResponse)
                .collect(Collectors.toList());
    }

    @Override
    @Transactional(readOnly = true)
    public FavoriteResponse getFavoriteByPlaceId(String placeId) {
        return favoritesRepository.findByPlaceIdAndActive(placeId)
                .map(this::mapToResponse)
                .orElse(null);
    }

    @Override
    public void removeFavorite(String placeId) {
        int updated = favoritesRepository.softDeleteByPlaceId(placeId);
        if (updated == 0) {
            throw new RuntimeException("Favorite not found");
        }
    }

    @Override
    @Transactional(readOnly = true)
    public boolean isFavorite(String placeId) {
        return favoritesRepository.existsByPlaceIdAndActive(placeId);
    }

    private FavoriteResponse mapToResponse(Favorite favorite) {
        return FavoriteResponse.builder()
                .id(favorite.getId())
                .placeId(favorite.getPlaceId())
                .placeName(favorite.getPlaceName())
                .placeAddress(favorite.getPlaceAddress())
                .latitude(favorite.getLatitude())
                .longitude(favorite.getLongitude())
                .placeTypes(favorite.getPlaceTypes())
                .rating(favorite.getRating())
                .photoReference(favorite.getPhotoReference())
                .notes(favorite.getNotes())
                .isActive(favorite.getIsActive())
                .createdAt(favorite.getCreatedAt())
                .updatedAt(favorite.getUpdatedAt())
                .build();
    }
}