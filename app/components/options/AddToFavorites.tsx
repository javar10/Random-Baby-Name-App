import React, { useEffect, useState } from 'react';
import { Alert, TouchableOpacity } from 'react-native';
import { loadFavorites, addFavorite, FavoriteItem } from '../../storage/favoritesStorage'
import styles from './OptionsMenuStyles';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart } from '@fortawesome/free-solid-svg-icons';


interface Props {
  firstName: string;
  middleName: string;
  lastName: string;
  gender: string;
}

const AddToFavorites: React.FC<Props> = ({ firstName, middleName, lastName, gender }) => {
  const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
  const itemToAdd: FavoriteItem = {
    id: Date.now(),
    firstName: firstName,
    middleName: middleName,
    lastName: lastName,
    gender: gender
  };

  useEffect(() => {
    loadFavorites().then(setFavorites);
  }, []);

  const showAlert = () => {
    Alert.alert(
      'Added to Favorites', 
      `${firstName} ${middleName}${middleName ? ' ' : ''}${lastName}`, 
      [
        {
          text: "OK", 
          onPress: () => console.log("OK Pressed"), 
        },
      ],
      { cancelable: true } 
    );
  };

  const handleAddFavorite = async () => {
    const updatedFavorites = await addFavorite(itemToAdd);
    setFavorites(updatedFavorites);
    showAlert();
  };

  return (
    <TouchableOpacity style={styles.optionsMenuButton} onPress={handleAddFavorite} >
      <FontAwesomeIcon style={styles.optionsMenuIcon} icon={faHeart} />
    </TouchableOpacity>
  );
};

export default AddToFavorites;
