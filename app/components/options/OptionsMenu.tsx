import { View } from "react-native";
import { Dispatch, SetStateAction } from 'react';
import styles from "./OptionsMenuStyles";
import ShareName from "./ShareName";
import StartOver from "./StartOver";
import AddToFavorites from "./AddToFavorites";
import ChooseFont from "./ChooseFont";

interface Props {
    firstName: string;
    setFirstName: Dispatch<SetStateAction<string>>;
    middleName: string;
    setMiddleName: Dispatch<SetStateAction<string>>;
    lastName: string;
    setLastName: Dispatch<SetStateAction<string>>;
    gender: string;
    setGender: Dispatch<SetStateAction<string>>;
    nameFont: string;
    setNameFont: Dispatch<SetStateAction<string>>;
}

const OptionsMenu: React.FC<Props> = ({
    firstName,
    setFirstName,
    middleName,
    setMiddleName,
    lastName,
    setLastName,
    gender,
    setGender,
    nameFont,
    setNameFont
}) => {

    return (
        <View style={styles.optionsMenu}>
            <AddToFavorites
                firstName={firstName}
                middleName={middleName}
                lastName={lastName}
                gender={gender}
            />
            <ChooseFont
                nameFont={nameFont}
                setNameFont={setNameFont}
            />
            <ShareName
                buttonType='share'
                firstName={firstName}
                middleName={middleName}
                lastName={lastName}
            />
            <StartOver
                setFirstName={setFirstName}
                setMiddleName={setMiddleName}
                setLastName={setLastName}
                setGender={setGender}
                setNameFont={setNameFont}
            />
        </View>
    );
}

export default OptionsMenu