import { TouchableOpacity, Alert, Share } from "react-native";
import React, { Dispatch, SetStateAction } from 'react';
import styles from "./OptionsMenuStyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

interface Props {
    // buttonType: string;
    firstName: string;
    middleName: string;
    lastName: string;
}

const ShareName: React.FC<Props> = ({
    // buttonType,
    firstName,
    middleName,
    lastName
}) => {
    const onShare = async () => {
        try {
            const result = await Share.share({
                message: `How about ${firstName} ${middleName} ${lastName}?\nSuggested by Name My Baby!`,
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
        <TouchableOpacity style={styles.optionsMenuButton} onPress={onShare} >
            <FontAwesomeIcon style={styles.optionsMenuIcon} icon={faArrowUpFromBracket} />
        </TouchableOpacity>
    );
}

export default ShareName