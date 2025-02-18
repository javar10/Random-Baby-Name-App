import React, { Dispatch, MutableRefObject, SetStateAction, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { loadFavorites, FavoriteItem, saveFavorites, removeFavorite } from '../../storage/favoritesStorage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './FavoritesStyles';



interface Props {
    favorites: FavoriteItem[];
    setFavorites: Dispatch<SetStateAction<FavoriteItem[]>>;
    item: FavoriteItem;
}

const DeleteFavorite: React.FC<Props> = ({ favorites, setFavorites, item, }) => {

    const handleRemoveFavorite = async () => {
        const updatedFavorites = await removeFavorite(item);
        setFavorites(updatedFavorites);
        console.log('Deleted');
    };

    return (
        <TouchableOpacity style={styles.deleteOption} onPress={handleRemoveFavorite}>
            <FontAwesomeIcon style={styles.hiddenIcon} icon={faTrashCan} />
        </TouchableOpacity>
    );
};

export default DeleteFavorite;