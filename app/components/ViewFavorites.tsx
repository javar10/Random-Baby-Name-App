import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { Button, Text, View, TouchableOpacity, StyleSheet } from 'react-native';
import { loadFavorites, toggleFavorite, FavoriteItem } from '../storage/favoritesStorage'
import StartOver from './options/StartOver';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faReply } from '@fortawesome/free-solid-svg-icons';

interface Props {
    setViewFavorites: Dispatch<SetStateAction<boolean>>;
}

const ViewFavorites: React.FC<Props> = ({ setViewFavorites }) => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

    useEffect(() => {
        loadFavorites().then(setFavorites);
    }, []);

    return (
        <View>
            <Text>Favorites:</Text>
            {favorites.map((fav) => (
                <Text key={fav.id}>• {fav.firstName} {fav.middleName}{fav.middleName ? ' ' : ''}{fav.lastName}</Text>
            ))}
            <TouchableOpacity style={styles.button} onPress={() => setViewFavorites(false)} >
                <FontAwesomeIcon style={[styles.icon, { transform: [{ scaleY: -1 }] }]} icon={faReply} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#F0F0F0",
        backgroundColor: "#ffffff",
        width: 60,
        aspectRatio: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    icon: {
        padding: 20,
        color: "#909090",
    }
})


export default ViewFavorites;