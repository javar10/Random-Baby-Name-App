import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { loadFavorites, FavoriteItem, saveFavorites } from '../../storage/favoritesStorage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faReply, faTrashCan } from '@fortawesome/free-solid-svg-icons';
import styles from '../name/ModalStyles';
import SwipeableRow from './SwipeableRow';

interface Props {
    setViewFavorites: Dispatch<SetStateAction<boolean>>;
}

const ViewFavorites: React.FC<Props> = ({ setViewFavorites }) => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    useEffect(() => {
        loadFavorites().then(setFavorites);
    }, []);

    const removeFavorite = async (id: string) => {
        // Load current favorites
        const currentFavorites = await loadFavorites();

        // Filter out the item with the specified ID
        const updatedFavorites = currentFavorites.filter(item => item.id.toString() !== id);

        // Save the updated favorites list back to storage
        await saveFavorites(updatedFavorites);

        // Update state and count
        setFavorites(updatedFavorites);
        console.log('deleted')
    }

    return (
        <View style={styles.favoritesContainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Favorites</Text>
            </View>

            <View style={styles.favoritesContent}>
                <FlatList
                    data={favorites}
                    showsVerticalScrollIndicator={false}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) =>
                        <SwipeableRow
                            item={item} 
                            onDelete={() => removeFavorite(item.id.toString())}
                            hasBottomBorder={index === favorites.length - 1 ? false : true}
                        />
                    }
                    style={styles.favoritesList}
                    contentContainerStyle={styles.favoritesListContent}
                />
            </View>

            <View style={styles.footer}>
                <TouchableOpacity style={styles.footerButton} onPress={() => setViewFavorites(false)} >
                    <FontAwesomeIcon style={[styles.footerIcon, { transform: [{ scaleY: -1 }] }]} icon={faReply} />
                </TouchableOpacity>
            </View>

        </View>
    );
};

export default ViewFavorites;