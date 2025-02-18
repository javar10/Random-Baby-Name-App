import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import uuid from 'react-native-uuid';
import { loadFavorites, addFavorite, FavoriteItem, removeFavorite } from '../../storage/favoritesStorage'
import styles from './OptionsMenuStyles';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { faHeart as faHeartOutline } from '@fortawesome/free-regular-svg-icons';

interface Props {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
}

const AddToFavorites: React.FC<Props> = ({ firstName, middleName, lastName, gender }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [isFav, setIsFav] = useState<boolean>(false);

  const itemToAdd: FavoriteItem = {
    id: uuid.v4() as string,
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    gender: gender,
  };

  useEffect(() => {
    const fetchFavorites = async () => {
      const loadedFavorites = await loadFavorites();
      setFavorites(loadedFavorites);
      const exists = loadedFavorites.some((fav) =>
        fav.firstName === firstName &&
        fav.middleName === middleName &&
        fav.lastName === lastName &&
        fav.gender === gender
      );
      setIsFav(exists);
    };

    fetchFavorites();
  }, [firstName, middleName, lastName, gender]);

  const handleToggleFavorite = async () => {
    const exists = favorites.some((fav) =>
      fav.firstName === firstName &&
      fav.middleName === middleName &&
      fav.lastName === lastName &&
      fav.gender === gender
    );

    if (exists) {
      // Remove favorite
      const updatedFavorites = await removeFavorite(itemToAdd);
      setFavorites(updatedFavorites);
      setIsFav(false);
    } else {
      // Add favorite
      const updatedFavorites = await addFavorite(itemToAdd);
      setFavorites(updatedFavorites);
      setIsFav(true);
    }
  };

  return (
    <TouchableOpacity style={styles.optionsMenuButton} onPress={handleToggleFavorite} >
      <FontAwesomeIcon style={styles.optionsMenuIcon} icon={!isFav ? faHeartOutline : faHeart} />
    </TouchableOpacity>
  );
};

export default AddToFavorites;
