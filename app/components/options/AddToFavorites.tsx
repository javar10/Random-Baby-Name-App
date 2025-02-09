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

  // Load favorites when the component mounts
  useEffect(() => {
    loadFavorites().then(setFavorites);
  }, []);

  const showAlert = () => {
    Alert.alert(
      'Added to Favorites', // Alert Title
      `${firstName} ${middleName}${middleName ? ' ' : ''}${lastName}`, // Alert message
      [
        {
          text: "OK", // Button text
          onPress: () => console.log("OK Pressed"), // Button action
        },
      ],
      { cancelable: true } // If the alert can be dismissed by tapping outside
    );
  };

  // Function to add or remove an item from favorites
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
