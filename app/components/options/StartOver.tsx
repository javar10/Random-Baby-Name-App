import { TouchableOpacity } from "react-native";
import { Dispatch, SetStateAction } from 'react';
import styles from "./OptionsMenuStyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHome } from "@fortawesome/free-solid-svg-icons";

interface Props {
    setFirstName: Dispatch<SetStateAction<string>>;
    setMiddleName: Dispatch<SetStateAction<string>>;
    setLastName: Dispatch<SetStateAction<string>>;
    setGender: Dispatch<SetStateAction<string>>;
    setNameFont: Dispatch<SetStateAction<string>>;
}

const StartOver: React.FC<Props> = ({ setFirstName, setMiddleName, setLastName, setGender, setNameFont }) => {

    const startOver = () => {
        setFirstName('First');
        setMiddleName('Middle');
        setLastName('Last');
        setGender('');
        setNameFont('Roboto')
    }

    return (
        <TouchableOpacity style={styles.optionsMenuButton} onPress={startOver} >
            <FontAwesomeIcon style={styles.optionsMenuIcon} icon={faHome}/>
        </TouchableOpacity>
    );
}

export default StartOver