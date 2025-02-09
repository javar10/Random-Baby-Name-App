import React, { useEffect, useState } from 'react';
import { Button, Text, View } from 'react-native';
import { loadFavorites, toggleFavorite, FavoriteItem } from '../storage/favoritesStorage'

// interface Props {
//     firstName: string;
//     middleName: string;
//     lastName: string;
//     gender: string;
// }

const ViewFavorites: React.FC = () => {  
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

      useEffect(() => {
        loadFavorites().then(setFavorites);
      }, []);

    return (
    <View>

      <Text>Favorites:</Text>
      {favorites.map((fav) => (
        <Text key={fav.id}>• {fav.firstName} {fav.middleName}{fav.middleName ? ' ' : ''}{fav.lastName}</Text>
      ))}
    </View>
  );
};

export default ViewFavorites;