import React from 'react';
import { View, Text, TextInput, TouchableOpacity } from 'react-native';
import { Dispatch, SetStateAction, useEffect } from 'react';
import Modal from "react-native-modal";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import styles from './modalStyle';

interface Props {
    visible: boolean;
    // nameSelected: string;
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    onClose: () => void;
}

const LastNameModal: React.FC<Props> = ({ visible, name, setName, onClose }) => {
    const handleChange = (newName: string) => {
        setName(newName);
    };

    return (
        <View>
            <Modal
                isVisible={visible}
                avoidKeyboard={true}
                onBackdropPress={onClose}
            >

                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>

                        <View style={styles.header}>
                            <Text style={styles.headerText}>Enter a name</Text>
                        </View>

                        <View style={styles.content}>
                            <TextInput
                                style={styles.contentText}
                                value={name}
                                onChangeText={handleChange}
                                onSubmitEditing={onClose}
                                clearTextOnFocus={true}
                                autoFocus={true}
                            />
                        </View>
                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.footerButton} onPress={onClose}>
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
