import { TouchableOpacity, Alert, Share } from "react-native";
import { FavoriteItem } from '../../storage/favoritesStorage'
import { default as modalStyles } from '../name/ModalStyles'
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faArrowUpFromBracket } from "@fortawesome/free-solid-svg-icons";

interface FilteredItem {
    name: string,
    place: string,
    gender: string,
}

type ListItem = FavoriteItem | FilteredItem

interface Props {
    nameList: ListItem[]
}

const ShareFavsList: React.FC<Props> = ({ nameList }) => {
   
    const onShare = async () => {
        const formattedList = nameList
            .map(item => {
                if ('firstName' in item) {
                    return `• ${item.firstName} ${item.middleName || ''} ${item.lastName || ''}`;
                } else if ('name' in item) {
                    return `• ${item.name}`;
                }
                return '';
            })
            .join('\n');

        try {
            const result = await Share.share({
                message: `Here are my favorite names from Baby Mix!\nWhat do you think?\n\n${formattedList}`,
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
        <TouchableOpacity style={modalStyles.footerButton} onPress={onShare}>
            <FontAwesomeIcon style={modalStyles.footerIcon} icon={faArrowUpFromBracket} />
        </TouchableOpacity>
    );
}

export default ShareFavsList