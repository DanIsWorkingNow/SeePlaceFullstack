package com.seeplace.favorites.dto;

import jakarta.validation.constraints.*;
import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.util.List;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteRequest {
    @NotBlank(message = "Place ID is required")
    @Size(max = 500, message = "Place ID must not exceed 500 characters")
    private String placeId;
    
    @NotBlank(message = "Place name is required")
    @Size(max = 500, message = "Place name must not exceed 500 characters")
    private String placeName;
    
    @Size(max = 1000, message = "Place address must not exceed 1000 characters")
    private String placeAddress;
    
    @NotNull(message = "Latitude is required")
    @DecimalMin(value = "-90.0", message = "Latitude must be between -90 and 90")
    @DecimalMax(value = "90.0", message = "Latitude must be between -90 and 90")
    private Double latitude;
    
    @NotNull(message = "Longitude is required")
    @DecimalMin(value = "-180.0", message = "Longitude must be between -180 and 180")
    @DecimalMax(value = "180.0", message = "Longitude must be between -180 and 180")
    private Double longitude;
    
    private List<String> placeTypes;
    
    @DecimalMin(value = "0.0", message = "Rating must be between 0 and 5")
    @DecimalMax(value = "5.0", message = "Rating must be between 0 and 5")
    private Double rating;
    
    @Size(max = 500, message = "Photo reference must not exceed 500 characters")
    private String photoReference;
    
    @Size(max = 2000, message = "Notes must not exceed 2000 characters")
    private String notes;
}