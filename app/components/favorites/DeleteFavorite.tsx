import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { loadFavorites, FavoriteItem, saveFavorites } from '../../storage/favoritesStorage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './FavoritesStyles';

interface Props {
    setViewFavorites: Dispatch<SetStateAction<boolean>>;
    item: FavoriteItem;
}

const DeleteFavorite: React.FC<Props> = ({ item, setViewFavorites }) => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    useEffect(() => {
        loadFavorites().then(setFavorites);
    }, []);

    const removeFavorite = async (id: string) => {
        const currentFavorites = await loadFavorites();
        const updatedFavorites = currentFavorites.filter(item => item.id.toString() !== id);
        await saveFavorites(updatedFavorites);
        setFavorites(updatedFavorites);
        console.log('Deleted');
    };

    return (
        <TouchableOpacity style={styles.deleteOption} onPress={() => removeFavorite(item.id.toString())}>
            <FontAwesomeIcon style={styles.hiddenIcon} icon={faTrashCan} />
        </TouchableOpacity>
    );
};

export default DeleteFavorite;