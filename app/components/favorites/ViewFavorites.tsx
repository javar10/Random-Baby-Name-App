import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, StyleSheet } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { loadFavorites, FavoriteItem, saveFavorites } from '../../storage/favoritesStorage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import ShareName from '../options/ShareName';
import { default as modalStyles } from '../name/ModalStyles';

interface Props {
    setViewFavorites: Dispatch<SetStateAction<boolean>>;
}
const ViewFavorites: React.FC<Props> = ({ setViewFavorites }) => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    // Track the currently open row
    const openRowRef = useRef<any>(null);

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

    // Close row when tapping outside
    const handleOutsidePress = () => {
        if (openRowRef.current) {
            openRowRef.current.closeRow();
            openRowRef.current = null;
        }
    };

    const renderItem = ({ item }: { item: FavoriteItem }) => (
        <View 
        >
            <Text style={styles.itemText}>
                {item.firstName} {item.middleName ? `${item.middleName} ` : ''}{item.lastName}
            </Text>
        </View>
    );

    const renderHiddenItem = ({ item }: { item: FavoriteItem }) => (
        <View style={styles.hiddenOptions}>
            <ShareName firstName={item.firstName} middleName={item.middleName} lastName={item.lastName} />
            <TouchableOpacity style={styles.deleteOption} onPress={() => removeFavorite(item.id.toString())}>
                <FontAwesomeIcon style={modalStyles.contentIcon} icon={faTrashCan} />
            </TouchableOpacity>
        </View>
    );

    return (
        <TouchableWithoutFeedback onPress={handleOutsidePress}>
            <View style={styles.favoritesContainer}>
                <View style={modalStyles.header}>
                    <Text style={modalStyles.headerText}>Favorites</Text>
                </View>
                <View style={styles.favoritesContent}>
                    <SwipeListView
                        data={favorites}
                        keyExtractor={(item) => item.id.toString()}
                        renderItem={renderItem}
                        renderHiddenItem={renderHiddenItem}
                        rightOpenValue={-75}
                        leftOpenValue={75}
                        closeOnScroll
                    />
                </View>
                <View style={modalStyles.footer}>
                    <TouchableOpacity style={modalStyles.footerButton} onPress={() => setViewFavorites(false)}>
                        <FontAwesomeIcon style={[modalStyles.footerIcon, { transform: [{ scaleY: -1 }] }]} icon={faReply} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};



const styles = StyleSheet.create({
    favoritesContainer: {
        width: 300,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        maxHeight: '90%', // Limits the total height
    },
    favoritesContent: {
        flexShrink: 1, // Ensures it takes up available space
        maxHeight: '80%', // Keeps FlatList contained
        borderTopWidth: 2,
        borderBottomWidth: 2,
    },
    favoritesItem: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 5,
    },
    favoritesList: {
        flexGrow: 1,
    },
    favoritesListContent: {
        paddingBottom: 10,
    },

    itemText: {
        fontSize: 28,
        paddingVertical: 10,
        width: '100%',
        backgroundColor: 'white',
        borderBottomWidth: 1,
      },
      hiddenOptions: {
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: '100%',
      },
      deleteOption: {
        marginRight: '5%',
      },
});

export default ViewFavorites;