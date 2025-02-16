import { TouchableOpacity, Alert, Share } from "react-native";
import React, { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { loadFavorites, FavoriteItem } from '../../storage/favoritesStorage'
import { default as modalStyles } from '../name/ModalStyles'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

// interface Props {
//     firstName: string;
//     middleName: string;
//     lastName: string;
// }

const ShareFavsList: React.FC = ({ }) => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);

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


    const onShare = async () => {
        const formattedList = favorites
        .map(item => `• ${item.firstName} ${item.middleName} ${item.lastName}`)
        .join('\n');

        try {
            const result = await Share.share({
                message: `Here are my favorite names from Name My Baby!\nWhat do you think?\n\n${formattedList}`,
            });
            if (result.action === Share.sharedAction) {
                if (result.activityType) {
                    // shared with activity type of result.activityType
                } else {
                    // shared
                }
            } else if (result.action === Share.dismissedAction) {
                // dismissed
            }
        } catch (error: any) {
            Alert.alert(error.message);
        }
    };

    return (
        <TouchableOpacity
            style={modalStyles.footerButton}
            onPress={onShare}
        >
            <FontAwesomeIcon
                style={modalStyles.footerIcon}
                icon={faArrowUpFromBracket}
            />
        </TouchableOpacity>
    );
}

export default ShareFavsList