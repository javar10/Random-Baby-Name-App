import { TouchableOpacity } from "react-native";
import { Dispatch, SetStateAction } from 'react';
import styles from "./OptionsMenuStyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFont } from "@fortawesome/free-solid-svg-icons";

interface Props {
    setFirstName: Dispatch<SetStateAction<string>>;
    setMiddleName: Dispatch<SetStateAction<string>>;
    setLastName: Dispatch<SetStateAction<string>>;
    setGender: Dispatch<SetStateAction<string>>;
}

const ChooseFont: React.FC<Props> = ({ setFirstName, setMiddleName, setLastName, setGender }) => {

    const chooseFont = () => {
       console.log('choose font')
    }

    return (
        <TouchableOpacity style={styles.optionsMenuButton} onPress={chooseFont} >
            <FontAwesomeIcon style={styles.optionsMenuIcon} icon={faFont}/>
        </TouchableOpacity>
    );
}

export default ChooseFont