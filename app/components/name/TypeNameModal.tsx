import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
import Modal from "react-native-modal";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faCheck, faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './ModalStyles';
import DeleteText from './DeleteText';

interface Props {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    onClose: () => void;
}

const LastNameModal: React.FC<Props> = ({ name, setName, onClose }) => {
    const [originalName, setOriginalName] = useState<string>('');
    const [tempName, setTempName] = useState<string>('');

    useEffect(() => {
        setOriginalName(name);
        setTempName(name);
    }, [])

    const onSubmitName = () => {
        setName(tempName.trim());
        onClose();
    }

    const onCancel = () => {
        setName(originalName);
        onClose();
    }

    const handleChange = (newName: string) => {
        setTempName(newName);
    };

    return (
        <View>
            <Modal
                isVisible={true}
                avoidKeyboard={true}
                onBackdropPress={onCancel}
            >

                <View style={styles.modalOverlay}>
                    <View style={styles.container}>

                        <View style={styles.header}>
                            <Text style={styles.headerText}>Enter a name</Text>
                        </View>

                        <View style={styles.content}>
                            <TextInput
                                style={styles.contentText}
                                value={tempName}
                                onChangeText={handleChange}
                                onSubmitEditing={onSubmitName}
                                autoFocus={true}
                            />
                        </View>
                        <View style={styles.footer}>
                            <DeleteText
                                setName={setTempName}
                            />
                            <TouchableOpacity style={styles.footerButton} onPress={onSubmitName}>
                                <FontAwesomeIcon style={styles.footerIcon} icon={faCheck} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.footerButton} onPress={onCancel}>
                                <FontAwesomeIcon style={styles.footerIcon} icon={faXmark} />
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal >
        </View >
    );
};

export default LastNameModal;
