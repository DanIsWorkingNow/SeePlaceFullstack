// src/components/FavoritesList/FavoritesList.js
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchFavoritesRequest, removeFavoriteRequest } from '../../store/slices/favoritesSlice';

const FavoritesList = ({ onPlaceSelect }) => {
  const dispatch = useDispatch();
  const { favorites, loading, error } = useSelector(state => state.favorites);

  useEffect(() => {
    // Fetch favorites when component mounts
    dispatch(fetchFavoritesRequest());
  }, [dispatch]);

  const handleRemoveFavorite = (placeId) => {
    if (window.confirm('Are you sure you want to remove this favorite?')) {
      dispatch(removeFavoriteRequest({ placeId }));
    }
  };

  const handlePlaceClick = (favorite) => {
    if (onPlaceSelect) {
      // Convert favorite data to place format for map display
      const place = {
        place_id: favorite.placeId,
        name: favorite.placeName,
        formatted_address: favorite.placeAddress,
        geometry: {
          location: {
            lat: () => parseFloat(favorite.latitude),
            lng: () => parseFloat(favorite.longitude)
          }
        },
        rating: favorite.rating,
        types: favorite.placeTypes ? JSON.parse(favorite.placeTypes) : []
      };
      onPlaceSelect(place);
    }
  };

  const getPlaceIcon = (placeTypes) => {
    if (!placeTypes) return '📍';
    
    const types = typeof placeTypes === 'string' ? JSON.parse(placeTypes) : placeTypes;
    
    if (types.includes('restaurant') || types.includes('food')) return '🍽️';
    if (types.includes('tourist_attraction')) return '🎯';
    if (types.includes('shopping_mall') || types.includes('store')) return '🛍️';
    if (types.includes('hospital')) return '🏥';
    if (types.includes('school') || types.includes('university')) return '🎓';
    if (types.includes('bank')) return '🏦';
    if (types.includes('gas_station')) return '⛽';
    if (types.includes('place_of_worship')) return '🕌';
    return '📍';
  };

  if (loading) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">My Favorites</h3>
        <div className="flex items-center justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-2 text-gray-600">Loading favorites...</span>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">My Favorites</h3>
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <p className="text-red-600 text-sm">Error loading favorites: {error}</p>
          <button 
            onClick={() => dispatch(fetchFavoritesRequest())}
            className="mt-2 text-red-600 hover:text-red-800 text-sm underline"
          >
            Try again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="text-lg font-semibold text-gray-800">My Favorites</h3>
        <span className="bg-blue-100 text-blue-800 text-xs font-medium px-2.5 py-0.5 rounded-full">
          {favorites.length}
        </span>
      </div>

      {favorites.length === 0 ? (
        <div className="text-center py-8">
          <div className="text-4xl mb-2">⭐</div>
          <p className="text-gray-500">No favorites yet</p>
          <p className="text-sm text-gray-400">Start exploring and save your favorite places!</p>
        </div>
      ) : (
        <div className="space-y-2 max-h-96 overflow-y-auto">
          {favorites.map((favorite) => (
            <div
              key={favorite.id}
              className="bg-gray-50 rounded-lg p-3 hover:bg-gray-100 transition-colors cursor-pointer group"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1" onClick={() => handlePlaceClick(favorite)}>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-lg">{getPlaceIcon(favorite.placeTypes)}</span>
                    <span className="font-medium text-gray-900 text-sm">
                      {favorite.placeName}
                    </span>
                    {favorite.rating && (
                      <div className="flex items-center text-xs text-yellow-600">
                        <span>⭐</span>
                        <span className="ml-1">{favorite.rating}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-xs text-gray-600 truncate">
                    {favorite.placeAddress}
                  </p>
                  {favorite.notes && (
                    <p className="text-xs text-blue-600 mt-1 italic">
                      "{favorite.notes}"
                    </p>
                  )}
                  <p className="text-xs text-gray-400 mt-1">
                    Added {new Date(favorite.createdAt).toLocaleDateString()}
                  </p>
                </div>
                
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    handleRemoveFavorite(favorite.placeId);
                  }}
                  className="opacity-0 group-hover:opacity-100 transition-opacity text-red-500 hover:text-red-700 p-1"
                  title="Remove from favorites"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      
      <div className="text-xs text-gray-500 text-center pt-2 border-t">
        Click on a favorite to view it on the map
      </div>
    </div>
  );
};

export default FavoritesList;