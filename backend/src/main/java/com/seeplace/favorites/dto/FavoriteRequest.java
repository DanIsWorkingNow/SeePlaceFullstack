package com.seeplace.favorites.dto;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteRequest {
    
    @NotBlank(message = "Place ID is required")
    private String placeId;
    
    @NotBlank(message = "Place name is required")
    private String placeName;
    
    private String placeAddress;
    
    @NotNull(message = "Latitude is required")
    private Double latitude;
    
    @NotNull(message = "Longitude is required")
    private Double longitude;
    
    private String placeTypes;
    private Double rating;
    private String photoReference;
    private String notes;
}