// src/store/sagas/favoritesSaga.js
import { call, put, takeEvery, all } from 'redux-saga/effects';
import {
  fetchFavoritesRequest,
  fetchFavoritesSuccess,
  fetchFavoritesFailure,
  addFavoriteRequest,
  addFavoriteSuccess,
  addFavoriteFailure,
  removeFavoriteRequest,
  removeFavoriteSuccess,
  removeFavoriteFailure,
} from '../slices/favoritesSlice';
import favoritesAPI from '../../services/favoritesAPI';

// Fetch all favorites
function* fetchFavoritesSaga() {
  try {
    console.log('🌟 Saga: Fetching favorites...');
    const favorites = yield call(favoritesAPI.getAllFavorites);
    yield put(fetchFavoritesSuccess(favorites));
  } catch (error) {
    console.error('❌ Saga: Fetch favorites failed:', error);
    yield put(fetchFavoritesFailure(error.message || 'Failed to fetch favorites'));
  }
}

// Add place to favorites
function* addFavoriteSaga(action) {
  try {
    console.log('🌟 Saga: Adding favorite...', action.payload);
    const response = yield call(favoritesAPI.addFavorite, action.payload);
    yield put(addFavoriteSuccess(response));
    
    // Optionally refetch favorites to stay in sync
    yield put(fetchFavoritesRequest());
  } catch (error) {
    console.error('❌ Saga: Add favorite failed:', error);
    yield put(addFavoriteFailure(error.message || 'Failed to add favorite'));
  }
}

// Remove place from favorites
function* removeFavoriteSaga(action) {
  try {
    console.log('🌟 Saga: Removing favorite...', action.payload);
    const { placeId } = action.payload;
    yield call(favoritesAPI.removeFavorite, placeId);
    yield put(removeFavoriteSuccess(placeId));
  } catch (error) {
    console.error('❌ Saga: Remove favorite failed:', error);
    yield put(removeFavoriteFailure(error.message || 'Failed to remove favorite'));
  }
}

// Watcher sagas
function* watchFavorites() {
  yield all([
    takeEvery(fetchFavoritesRequest.type, fetchFavoritesSaga),
    takeEvery(addFavoriteRequest.type, addFavoriteSaga),
    takeEvery(removeFavoriteRequest.type, removeFavoriteSaga),
  ]);
}

export default watchFavorites;