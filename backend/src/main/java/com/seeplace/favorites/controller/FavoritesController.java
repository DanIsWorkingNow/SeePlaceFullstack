package com.seeplace.favorites.controller;

import com.seeplace.favorites.dto.FavoriteRequest;
import com.seeplace.favorites.dto.FavoriteResponse;
import com.seeplace.favorites.service.FavoritesService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/favorites")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class FavoritesController {

    private final FavoritesService favoritesService;

    @GetMapping
    public ResponseEntity<List<FavoriteResponse>> getAllFavorites() {
        List<FavoriteResponse> favorites = favoritesService.getAllFavorites();
        return ResponseEntity.ok(favorites);
    }

    @PostMapping
    public ResponseEntity<Map<String, Object>> addFavorite(@Valid @RequestBody FavoriteRequest request) {
        try {
            FavoriteResponse favorite = favoritesService.addFavorite(request);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Place added to favorites");
            response.put("data", favorite);
            return ResponseEntity.status(HttpStatus.CREATED).body(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{placeId}")
    public ResponseEntity<Map<String, Object>> getFavorite(@PathVariable String placeId) {
        FavoriteResponse favorite = favoritesService.getFavoriteByPlaceId(placeId);
        Map<String, Object> response = new HashMap<>();
        
        if (favorite != null) {
            response.put("success", true);
            response.put("isFavorite", true);
            response.put("data", favorite);
        } else {
            response.put("success", true);
            response.put("isFavorite", false);
            response.put("data", null);
        }
        
        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/{placeId}")
    public ResponseEntity<Map<String, Object>> removeFavorite(@PathVariable String placeId) {
        try {
            favoritesService.removeFavorite(placeId);
            Map<String, Object> response = new HashMap<>();
            response.put("success", true);
            response.put("message", "Favorite removed successfully");
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            Map<String, Object> response = new HashMap<>();
            response.put("success", false);
            response.put("message", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @GetMapping("/{placeId}/check")
    public ResponseEntity<Map<String, Object>> checkFavorite(@PathVariable String placeId) {
        boolean isFavorite = favoritesService.isFavorite(placeId);
        Map<String, Object> response = new HashMap<>();
        response.put("success", true);
        response.put("isFavorite", isFavorite);
        return ResponseEntity.ok(response);
    }
}