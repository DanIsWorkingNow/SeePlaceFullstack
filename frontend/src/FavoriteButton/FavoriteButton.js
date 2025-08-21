// src/components/FavoriteButton/FavoriteButton.js
import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addFavoriteRequest, removeFavoriteRequest, updateFavoriteStatus } from '../../store/slices/favoritesSlice';
import favoritesAPI from '../../services/favoritesAPI';

const FavoriteButton = ({ place, className = "" }) => {
  const dispatch = useDispatch();
  const { favoriteStatus, loading } = useSelector(state => state.favorites);
  const [isProcessing, setIsProcessing] = useState(false);

  const placeId = place.place_id || place.placeId;
  const isFavorite = favoriteStatus[placeId] || false;

  useEffect(() => {
    // Check favorite status when component mounts
    const checkStatus = async () => {
      try {
        const response = await favoritesAPI.checkIsFavorite(placeId);
        dispatch(updateFavoriteStatus({
          placeId,
          isFavorite: response.isFavorite
        }));
      } catch (error) {
        console.error('Error checking favorite status:', error);
      }
    };

    if (placeId && favoriteStatus[placeId] === undefined) {
      checkStatus();
    }
  }, [placeId, favoriteStatus, dispatch]);

  const handleToggleFavorite = async (e) => {
    e.stopPropagation(); // Prevent event bubbling
    
    if (isProcessing || loading) return;
    
    setIsProcessing(true);

    try {
      if (isFavorite) {
        // Remove from favorites
        dispatch(removeFavoriteRequest({ placeId }));
      } else {
        // Add to favorites
        const favoriteData = {
          placeId: placeId,
          placeName: place.name || place.placeName || place.description,
          placeAddress: place.formatted_address || place.placeAddress || place.vicinity || '',
          latitude: typeof place.geometry?.location?.lat === 'function' 
            ? place.geometry.location.lat() 
            : place.geometry?.location?.lat || place.latitude || 0,
          longitude: typeof place.geometry?.location?.lng === 'function' 
            ? place.geometry.location.lng() 
            : place.geometry?.location?.lng || place.longitude || 0,
          placeTypes: JSON.stringify(place.types || []),
          rating: place.rating || null,
          photoReference: place.photos?.[0]?.photo_reference || null,
          notes: ''
        };

        dispatch(addFavoriteRequest(favoriteData));
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
    } finally {
      setIsProcessing(false);
    }
  };

  const buttonClasses = `
    inline-flex items-center justify-center
    w-8 h-8 rounded-full
    transition-all duration-200
    focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500
    ${isFavorite 
      ? 'bg-red-100 text-red-600 hover:bg-red-200' 
      : 'bg-gray-100 text-gray-400 hover:bg-gray-200 hover:text-gray-600'
    }
    ${isProcessing || loading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
    ${className}
  `;

  return (
    <button
      onClick={handleToggleFavorite}
      disabled={isProcessing || loading}
      className={buttonClasses}
      title={isFavorite ? 'Remove from favorites' : 'Add to favorites'}
    >
      {isProcessing ? (
        <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-current"></div>
      ) : (
        <svg
          className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`}
          fill={isFavorite ? 'currentColor' : 'none'}
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
          />
        </svg>
      )}
    </button>
  );
};

export default FavoriteButton;