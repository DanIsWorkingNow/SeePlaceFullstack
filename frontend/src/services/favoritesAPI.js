// src/services/favoritesAPI.js
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || 'http://localhost:8080/api';

class FavoritesAPI {
  constructor() {
    this.baseURL = `${API_BASE_URL}/favorites`;
  }

  async getAllFavorites() {
    try {
      console.log('🌟 API: Fetching all favorites...');
      const response = await fetch(`${this.baseURL}`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(`✅ API: Fetched ${data.length} favorites`);
      return data;
    } catch (error) {
      console.error('❌ API: Fetch favorites failed:', error);
      throw error;
    }
  }

  async addFavorite(favoriteData) {
    try {
      console.log('🌟 API: Adding favorite...', favoriteData);
      const response = await fetch(`${this.baseURL}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(favoriteData),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API: Favorite added successfully');
      return data;
    } catch (error) {
      console.error('❌ API: Add favorite failed:', error);
      throw error;
    }
  }

  async removeFavorite(placeId) {
    try {
      console.log('🌟 API: Removing favorite...', placeId);
      const response = await fetch(`${this.baseURL}/${encodeURIComponent(placeId)}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log('✅ API: Favorite removed successfully');
      return data;
    } catch (error) {
      console.error('❌ API: Remove favorite failed:', error);
      throw error;
    }
  }

  async checkIsFavorite(placeId) {
    try {
      const response = await fetch(`${this.baseURL}/${encodeURIComponent(placeId)}/check`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.error('❌ API: Check favorite failed:', error);
      throw error;
    }
  }
}

const favoritesAPI = new FavoritesAPI();
export default favoritesAPI;