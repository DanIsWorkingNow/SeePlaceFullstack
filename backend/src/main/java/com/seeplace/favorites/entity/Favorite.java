package com.seeplace.favorites.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.UpdateTimestamp;


import java.math.BigDecimal;
import java.time.LocalDateTime;

@Entity
@Table(name = "Favorites")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Favorite {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    @Column(name = "place_id", nullable = false, unique = true, length = 500)
    private String placeId;
    
    @Column(name = "place_name", nullable = false, length = 500)
    private String placeName;
    
    @Column(name = "place_address", length = 1000)
    private String placeAddress;
    
    // FIX: Use BigDecimal for precise decimal mapping
    @Column(nullable = false, precision = 10, scale = 8)
    private BigDecimal latitude;
    
    @Column(nullable = false, precision = 11, scale = 8)
    private BigDecimal longitude;
    
    @Column(name = "place_types", length = 1000)
    private String placeTypes;
    
    @Column(precision = 3, scale = 2)
    private BigDecimal rating;
    
    @Column(name = "photo_reference", length = 500)
    private String photoReference;
    
    @Column(length = 2000)
    private String notes;
    
    @Column(name = "is_active")
    @Builder.Default
    private Boolean isActive = true;
    
    @CreationTimestamp
    @Column(name = "created_at", updatable = false)
    private LocalDateTime createdAt;
    
    @UpdateTimestamp
    @Column(name = "updated_at")
    private LocalDateTime updatedAt;
}