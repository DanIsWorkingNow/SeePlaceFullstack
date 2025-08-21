package com.seeplace.favorites.dto;

import lombok.Data;
import lombok.Builder;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import java.time.LocalDateTime;
import java.util.List;

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
    private List<String> placeTypes;
    private Double rating;
    private String photoReference;
    private String notes;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
}