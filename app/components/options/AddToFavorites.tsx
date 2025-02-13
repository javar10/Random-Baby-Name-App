import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { loadFavorites, addFavorite, FavoriteItem } from '../../storage/favoritesStorage'
import styles from './OptionsMenuStyles';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import {faHeart as faHeartOutline} from '@fortawesome/free-regular-svg-icons';



interface Props {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
}

const AddToFavorites: React.FC<Props> = ({ firstName, middleName, lastName, gender }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const [ isFav, setIsFav ] = useState<boolean>(false);

  const itemToAdd: FavoriteItem = {
    id: Date.now(),
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    gender: gender,
    // favorite: true **Consider adding this as a control
  };

  useEffect(() => {
    loadFavorites().then(setFavorites);
  }, []);

  const handleAddFavorite = async () => {
    const exists = favorites.some((fav) =>
      fav.firstName === itemToAdd.firstName &&
      fav.middleName === itemToAdd.middleName &&
      fav.lastName === itemToAdd.lastName &&
      fav.gender === itemToAdd.gender
    );
    setIsFav(!isFav);
    if (exists) return;

    const updatedFavorites = await addFavorite(itemToAdd);
    setFavorites(updatedFavorites);
  };

  // TODO: change heart from outline to solid after added
  // TODO: tap heart again to remove name from favorites
  // TODO: don't add names that already exists and show the heart as filled
  // TODO: reset heart status when name changes

  return (
    <TouchableOpacity style={styles.optionsMenuButton} onPress={handleAddFavorite} >
      <FontAwesomeIcon style={styles.optionsMenuIcon} icon={!isFav ? faHeartOutline : faHeart} />
    </TouchableOpacity>
  );
};

export default AddToFavorites;
