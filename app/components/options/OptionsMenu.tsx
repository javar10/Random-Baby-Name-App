import { View } from "react-native";
import { Dispatch, SetStateAction } from 'react';
import styles from "./OptionsMenuStyles";
import ShareName from "./ShareName";
import StartOver from "./StartOver";
import AddToFavorites from "./AddToFavorites";

interface Props {
    firstName: string;
    setFirstName: Dispatch<SetStateAction<string>>;
    middleName: string;
    setMiddleName: Dispatch<SetStateAction<string>>;
    lastName: string;
    setLastName: Dispatch<SetStateAction<string>>;
    gender: string;
    setGender: Dispatch<SetStateAction<string>>;
}

const OptionsMenu: React.FC<Props> = ({ firstName, setFirstName, middleName, setMiddleName, lastName, setLastName, gender, setGender }) => {

    return (
        <View style={styles.optionsMenu}>
            <AddToFavorites
                firstName={firstName}
                middleName={middleName}
                lastName={lastName}
                gender={gender}
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
            />
        </View>
    );
}

export default OptionsMenu