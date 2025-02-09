import * as FileSystem from 'expo-file-system';

export interface FavoriteItem {
    id: number;
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
  }

const favoritesFilePath = FileSystem.documentDirectory + 'favorites.json';

// Save favorites to file
export const saveFavorites = async (favorites: FavoriteItem[]): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(favorites);
    await FileSystem.writeAsStringAsync(favoritesFilePath, jsonValue);
    console.log('Favorites saved!');
  } catch (error) {
    console.error('Error saving favorites:', error);
  }
};

// Load favorites from file
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

// Add favorite
export const addFavorite = async (item: FavoriteItem): Promise<FavoriteItem[]> => {
  try {
    let favorites = await loadFavorites();

    if (!favorites.some((fav) => fav.id === item.id)) {
      favorites = [...favorites, item]; // Ensure immutability
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



// Get the count of favorite items
export const getFavoritesCount = async (): Promise<number> => {
  try {
    const favorites = await loadFavorites();
    return favorites.length;
  } catch (error) {
    console.error('Error getting favorites count:', error);
    return 0;
  }
};




















// import RNFS from 'react-native-fs';

// // Define TypeScript type for favorite items
// export interface FavoriteItem {
//   id: number;
//   firstName: string;
//   middleName: string;
//   lastName: string;
//   gender: string;
// }

// // Define file path for storing favorites
// const favoritesFilePath = RNFS.DocumentDirectoryPath + '/favorites.json';

// // Save favorites to file
// export const saveFavorites = async (favorites: FavoriteItem[]): Promise<void> => {
//   try {
//     await RNFS.writeFile(favoritesFilePath, JSON.stringify(favorites), 'utf8');
//     console.log('Favorites saved!');
//   } catch (error) {
//     console.error('Error saving favorites:', error);
//   }
// };

// // Load favorites from file
// export const loadFavorites = async (): Promise<FavoriteItem[]> => {
//   try {
//     const exists = await RNFS.exists(favoritesFilePath);
//     if (!exists) {
//       return []; // Return empty array if file does not exist
//     }
//     const fileContent = await RNFS.readFile(favoritesFilePath, 'utf8');
//     return JSON.parse(fileContent) as FavoriteItem[];
//   } catch (error) {
//     console.error('Error loading favorites:', error);
//     return [];
//   }
// };

// // Toggle favorite (Add or Remove)
// export const toggleFavorite = async (item: FavoriteItem): Promise<FavoriteItem[]> => {
//   let favorites = await loadFavorites();

//   if (favorites.some(fav => fav.id === item.id)) {
//     favorites = favorites.filter(fav => fav.id !== item.id);
//   } else {
//     favorites.push(item);
//   }

//   await saveFavorites(favorites);
//   return favorites;
// };
