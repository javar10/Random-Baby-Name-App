import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet, FlatList, TouchableWithoutFeedback } from 'react-native';
import { loadFavorites, FavoriteItem, saveFavorites } from '../../storage/favoritesStorage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import styles from '../name/ModalStyles';
import SwipeableRow from './SwipeableRow';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { SwipeListView, SwipeRow } from 'react-native-swipe-list-view';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';

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

    const renderItem = ({ item }: { item: FavoriteItem }) => (
        <Text style={styles.itemText}>
            {item.firstName} {item.middleName}{item.middleName ? ' ' : ''}{item.lastName}
        </Text>
    );

    const renderHiddenItem = ({ item }: { item: FavoriteItem }) => (
        // <View style={[styles.hiddenOptions, styles.deleteOption]}>
            <TouchableOpacity
                style={[styles.hiddenOptions, styles.deleteOption]}
                onPress={() => removeFavorite(item.id.toString())}
            >
                <View>
                    <FontAwesomeIcon style={styles.contentIcon} icon={faTrashCan} />
                </View>

            </TouchableOpacity>
        // </View>
    );

    return (
        <View style={styles.favoritesContainer}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Favorites</Text>
            </View>
            <View style={styles.favoritesContent}>


                <SwipeListView
                    data={favorites}
                    renderItem={renderItem}
                    renderHiddenItem={renderHiddenItem}
                    rightOpenValue={-75}
                    // leftOpenValue={75}
                    closeOnScroll
                />









                {/* <FlatList
                    data={favorites}
                    keyExtractor={item => item.id.toString()}
                    renderItem={({ item, index }) =>
                        // <TouchableWithoutFeedback>
                            <SwipeableRow
                                item={item}
                                onDelete={() => removeFavorite(item.id.toString())}
                                hasBottomBorder={index === favorites.length - 1 ? false : true}
                            />
                        // </TouchableWithoutFeedback>


                    }
                    style={styles.favoritesList}
                    contentContainerStyle={styles.favoritesListContent}
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                    scrollEnabled={true}
                /> */}



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