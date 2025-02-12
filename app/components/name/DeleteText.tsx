import React, { Dispatch, SetStateAction } from 'react'
import styles from './ModalStyles';
import { View, TouchableOpacity } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faEraser } from '@fortawesome/free-solid-svg-icons';

interface Props {
    name: string,
    setName: Dispatch<SetStateAction<string>>
}

const DeleteText: React.FC<Props> = ({ name, setName }) => {

    const deleteText = () => {
        setName('');
    }

    return (
        <View style={styles.footer}>
            <TouchableOpacity style={styles.footerButton} onPress={deleteText}>
                <FontAwesomeIcon style={styles.footerIcon} icon={faEraser} />
            </TouchableOpacity>
        </View>
    )
}

export default DeleteText
