import * as FileSystem from 'expo-file-system';

export interface FavoriteItem {
  id: string;
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
}

const favoritesFilePath = FileSystem.documentDirectory + 'favorites.json';

export const saveFavorites = async (favorites: FavoriteItem[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(favorites);
    await FileSystem.writeAsStringAsync(favoritesFilePath, jsonValue);
    console.log('Favorites saved!');
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

export const loadFavorites = async (): Promise<FavoriteItem[]> => {
  try {
    const fileInfo = await FileSystem.getInfoAsync(favoritesFilePath);
    if (!fileInfo.exists) {
      return [];
    }
    const fileContent = await FileSystem.readAsStringAsync(favoritesFilePath);
    return JSON.parse(fileContent);
  } catch (error) {
    console.error('Error loading favorites:', error);
    return [];
  }
};

export const addFavorite = async (item: FavoriteItem): Promise<FavoriteItem[]> => {
  try {
    let favorites = await loadFavorites();

    if (!favorites.some((fav) => fav.id === item.id)) {
      favorites = [...favorites, item];
      await saveFavorites(favorites);
      console.log('Added:', item);
    } else {
      console.log('Already in favorites:', item);
    }

    return favorites;
  } catch (error) {
    console.error('Error adding favorite:', error);
    return [];
  }
};

export const removeFavorite = async (item: FavoriteItem): Promise<FavoriteItem[]> => {
  try {
    let favorites = await loadFavorites();
    favorites = favorites.filter((fav) =>
      !(fav.firstName === item.firstName &&
        fav.middleName === item.middleName &&
        fav.lastName === item.lastName &&
        fav.gender === item.gender)
    );
    await saveFavorites(favorites);
    console.log('Removed:', item);
    return favorites;
  } catch (error) {
    console.error('Error removing favorite:', error);
    return [];
  }
};
