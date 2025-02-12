import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { loadFavorites, FavoriteItem, saveFavorites } from '../../storage/favoritesStorage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
import ShareName from '../options/ShareName';
import { default as modalStyles } from '../name/ModalStyles';
import styles from './FavoritesStyles';
import DeleteFavorite from './DeleteFavorite';

interface Props {
    setViewFavorites: Dispatch<SetStateAction<boolean>>;
}

const ViewFavorites: React.FC<Props> = ({ setViewFavorites }) => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [favsIsUpdated, setFavsIsUpdated] = useState<boolean>(false)

    const openRowRef = useRef<any>(null);


    // TODO: alphabetize favorites
    useEffect(() => {
        loadFavorites().then(setFavorites);
    }, [favsIsUpdated]);

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
            <ShareName
                buttonType='fav'
                firstName={item.firstName}
                middleName={item.middleName}
                lastName={item.lastName}
            />
            <DeleteFavorite
                item={item}
                setViewFavorites={setViewFavorites}
                favsIsUpdated={favsIsUpdated}
                setFavsIsUpdated={setFavsIsUpdated}
            />
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
                        // TODO: bug fix - swipe max needs to be set
                    />
                </View>
                <View style={modalStyles.footer}>
                    {/* TODO: filter feature */}

                    <TouchableOpacity style={modalStyles.footerButton} onPress={() => setViewFavorites(false)}>
                        <FontAwesomeIcon style={modalStyles.footerIcon} icon={faHome} />
                    </TouchableOpacity>
                </View>
            </View>
        </TouchableWithoutFeedback>
    );
};

export default ViewFavorites;