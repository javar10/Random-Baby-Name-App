import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { loadFavorites, FavoriteItem } from '../../storage/favoritesStorage'
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

    const openRowRef = useRef<any>(null);

    useEffect(() => {
        loadFavorites().then((data) => {
            const sortedFavorites = data.sort((a, b) => {
                return (
                    a.firstName.localeCompare(b.firstName) ||
                    (a.middleName && b.middleName
                        ? a.middleName.localeCompare(b.middleName)
                        : a.lastName.localeCompare(b.lastName)) ||
                    a.lastName.localeCompare(b.lastName)
                );
            });
            setFavorites(sortedFavorites);
        });
    }, [favorites]);    

    const handleOutsidePress = () => {
        if (openRowRef.current) {
            openRowRef.current.closeRow();
            openRowRef.current = null;
        }
    };

    const renderItem = ({ item }: { item: FavoriteItem }) => (
        <View>
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
                        rightOpenValue={-60}
                        leftOpenValue={60}
                        stopRightSwipe={-90}
                        stopLeftSwipe={90}
                        friction={10}
                        tension={50}
                        closeOnScroll
                        // TODO: Consider tapping name leads to edit name
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