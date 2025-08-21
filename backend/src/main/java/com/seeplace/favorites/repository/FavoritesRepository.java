package com.seeplace.favorites.repository;

import com.seeplace.favorites.entity.Favorite;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FavoritesRepository extends JpaRepository<Favorite, Long> {
    
    @Query("SELECT f FROM Favorite f WHERE f.isActive = true ORDER BY f.createdAt DESC")
    List<Favorite> findAllActive();
    
    @Query("SELECT f FROM Favorite f WHERE f.placeId = :placeId AND f.isActive = true")
    Optional<Favorite> findByPlaceIdAndActive(@Param("placeId") String placeId);
    
    @Query("SELECT CASE WHEN COUNT(f) > 0 THEN true ELSE false END FROM Favorite f WHERE f.placeId = :placeId AND f.isActive = true")
    boolean existsByPlaceIdAndActive(@Param("placeId") String placeId);
    
    @Modifying
    @Query("UPDATE Favorite f SET f.isActive = false WHERE f.placeId = :placeId")
    int softDeleteByPlaceId(@Param("placeId") String placeId);
}