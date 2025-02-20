import { TouchableOpacity, Alert, Share } from "react-native";
import React from 'react';
import styles from "./OptionsMenuStyles";
import { default as favStyles } from '../favorites/FavoritesStyles'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

interface Props {
    buttonType: string;
    name: string;
}

// TODO: Consider sending a screenshot or the font somehow

const ShareName: React.FC<Props> = ({
    buttonType,
    name
}) => {
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `${name}\n\nSuggested by Name My Baby!\nWhat do you think?`,
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
            style={buttonType === 'fav' ? favStyles.shareOption : styles.optionsMenuButton}
            onPress={onShare}
        >
            <FontAwesomeIcon
                style={buttonType === 'fav' ? favStyles.hiddenIcon : styles.optionsMenuIcon}
                icon={faArrowUpFromBracket}
            />
        </TouchableOpacity>
    );
}

export default ShareName