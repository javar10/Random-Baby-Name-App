import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { loadFavorites, FavoriteItem } from '../storage/favoritesStorage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';
import styles from './name/ModalStyles';

interface Props {
    setViewFavorites: Dispatch<SetStateAction<boolean>>;
}

const ViewFavorites: React.FC<Props> = ({ setViewFavorites }) => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    useEffect(() => {
        loadFavorites().then(setFavorites);
    }, []);

    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerText}>Favorites</Text>
            </View>

            <View style={styles.content}>
                {favorites.map((fav) => (
                    <Text
                        // style={styles.contentText}
                        key={fav.id}
                    >
                        • {fav.firstName} {fav.middleName}{fav.middleName ? ' ' : ''}{fav.lastName}
                    </Text>
                ))}
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