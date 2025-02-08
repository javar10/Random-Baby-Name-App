import { TouchableOpacity, View } from "react-native";
import { Dispatch, SetStateAction } from 'react';
import styles from "./OptionsMenuStyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";
import ShareName from "./ShareName";
import StartOver from "./StartOver";

interface Props {
    firstName: string;
    setFirstName: Dispatch<SetStateAction<string>>;
    middleName: string;
    setMiddleName: Dispatch<SetStateAction<string>>;
    lastName: string;
    setLastName: Dispatch<SetStateAction<string>>;
    setGender: Dispatch<SetStateAction<string>>;
}

const OptionsMenu: React.FC<Props> = ({ firstName, setFirstName, middleName, setMiddleName, lastName, setLastName, setGender }) => {

    return (
        <View style={styles.optionsMenu}>
            <ShareName 
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