package com.seeplace.favorites.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class FavoriteResponse {
    
    private Long id;
    private String placeId;
    private String placeName;
    private String placeAddress;
    private Double latitude;
    private Double longitude;
    private String placeTypes;
    private Double rating;
    private String photoReference;
    private String notes;
    private Boolean isActive;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}