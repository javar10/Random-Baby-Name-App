import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { loadFavorites, toggleFavorite, FavoriteItem } from '../../storage/favoritesStorage'

interface Props {
    firstName: string;
    middleName: string;
    lastName: string;
    gender: string;
}

const AddToFavorites: React.FC<Props> = ({ firstName, middleName, lastName, gender }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const itemToAdd: FavoriteItem = { id: favorites.length + 1, firstName: firstName, middleName: middleName, lastName: lastName, gender: gender };

  // Load favorites when the component mounts
  useEffect(() => {
    loadFavorites().then(setFavorites);
  }, []);

  // Function to add or remove an item from favorites
  const handleToggleFavorite = async () => {
    const updatedFavorites = await toggleFavorite(itemToAdd);
    setFavorites(updatedFavorites);
  };

  return (
    <View>
      <Button title="Toggle Favorite" onPress={handleToggleFavorite} />
      <Text>Favorites:</Text>
      {favorites.map((fav) => (
        <Text key={fav.id}>• {fav.firstName} {fav.middleName}{fav.middleName ? ' ' : ''}{fav.lastName}</Text>
      ))}
    </View>
  );
};

export default AddToFavorites;
