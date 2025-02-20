import React, { Dispatch, SetStateAction } from 'react';
import { TouchableOpacity } from 'react-native';
import { FavoriteItem, removeFavorite } from '../../storage/favoritesStorage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from './FavoritesStyles';

interface Props {
    setFavorites: Dispatch<SetStateAction<FavoriteItem[]>>;
    item: FavoriteItem;
}

const DeleteFavorite: React.FC<Props> = ({ setFavorites, item, }) => {

    const handleRemoveFavorite = async () => {
        const updatedFavorites = await removeFavorite(item);
        const sortedFavorites = updatedFavorites.sort((a, b) => {
            return (
                a.firstName.localeCompare(b.firstName) ||
                (a.middleName && b.middleName
                    ? a.middleName.localeCompare(b.middleName)
                    : a.lastName.localeCompare(b.lastName)) ||
                a.lastName.localeCompare(b.lastName)
            );
        })
        setFavorites(sortedFavorites);
        console.log('Deleted');
    };

    return (
        <TouchableOpacity style={styles.deleteOption} onPress={handleRemoveFavorite}>
            <FontAwesomeIcon style={styles.hiddenIcon} icon={faTrashCan} />
        </TouchableOpacity>
    );
};

export default DeleteFavorite;