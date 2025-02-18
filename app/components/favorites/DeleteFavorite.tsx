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
    rowMap: { [key: string]: any };
    rowKey: string;
}

// interface Props {
//     item: FavoriteItem;
//     row: MutableRefObject<any>;
// }

const DeleteFavorite: React.FC<Props> = ({ favorites, setFavorites, item, rowMap, rowKey }) => {
    // const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    // useEffect(() => {
    //     loadFavorites().then(setFavorites);
    // }, []);

    const handleRemoveFavorite = async () => {
        const updatedFavorites = await removeFavorite(item);
        setFavorites(updatedFavorites);
        console.log('Deleted');
    };

    // instead of loading favs, i need to pass it from viewfavs. 

    // const handleRemoveFavorite = async () => {
    //     if (rowMap[rowKey]) {
    //         rowMap[rowKey].closeRow(); // Close the row before deletion
    //     }
    //     const updatedFavorites = await removeFavorite(item); // Remove the item and get updated list
    //     setFavorites(updatedFavorites); // Update the state in the parent component
    //     console.log('Deleted');
    // };
    

    return (
        <TouchableOpacity style={styles.deleteOption} onPress={handleRemoveFavorite}>
            <FontAwesomeIcon style={styles.hiddenIcon} icon={faTrashCan} />
        </TouchableOpacity>
    );
};

export default DeleteFavorite;