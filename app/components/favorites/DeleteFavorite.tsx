import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { loadFavorites, FavoriteItem, saveFavorites } from '../../storage/favoritesStorage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './FavoritesStyles';

interface Props {
    item: FavoriteItem;
    setViewFavorites: Dispatch<SetStateAction<boolean>>;
    favsIsUpdated: boolean;
    setFavsIsUpdated: Dispatch<SetStateAction<boolean>>;
}

const DeleteFavorite: React.FC<Props> = ({ item, setViewFavorites, favsIsUpdated, setFavsIsUpdated }) => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    useEffect(() => {
        loadFavorites().then(setFavorites);
    }, []);

    const removeFavorite = async (id: string) => {
        const currentFavorites = await loadFavorites();
        const updatedFavorites = currentFavorites.filter(item => item.id.toString() !== id);
        await saveFavorites(updatedFavorites);
        setFavorites(updatedFavorites);
        setFavsIsUpdated(true);
        console.log('Deleted');

        // TODO: Bug Fix - can only delete one name. The button works, but it's not re-rendering the list.
    };

    return (
        <TouchableOpacity style={styles.deleteOption} onPress={() => removeFavorite(item.id.toString())}>
            <FontAwesomeIcon style={styles.hiddenIcon} icon={faTrashCan} />
        </TouchableOpacity>
    );
};

export default DeleteFavorite;