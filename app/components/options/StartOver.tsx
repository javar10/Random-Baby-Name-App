import { TouchableOpacity } from "react-native";
import { Dispatch, SetStateAction } from 'react';
import styles from "./OptionsMenuStyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faReply } from "@fortawesome/free-solid-svg-icons";

interface Props {
    setFirstName: Dispatch<SetStateAction<string>>;
    setMiddleName: Dispatch<SetStateAction<string>>;
    setLastName: Dispatch<SetStateAction<string>>;
    setGender: Dispatch<SetStateAction<string>>;
}

const StartOver: React.FC<Props> = ({ setFirstName, setMiddleName, setLastName, setGender }) => {

    const startOver = () => {
        setFirstName('First');
        setMiddleName('Middle');
        setLastName('Last');
        setGender('');
    }

    return (
        <TouchableOpacity style={styles.optionsMenuButton} onPress={startOver} >
            <FontAwesomeIcon style={[styles.optionsMenuIcon, {transform: [{scaleY: -1}]}]} icon={faReply}/>
        </TouchableOpacity>
    );
}

export default StartOver