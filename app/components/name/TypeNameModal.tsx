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

    useEffect(() => {
        setOriginalName(name);
    }, [])

    const onCancel = () => {
        setName(originalName);
        onClose();
    }

    const handleChange = (newName: string) => {
        setName(newName);
    };

    return (
        <View>
            <Modal
                isVisible={true}
                avoidKeyboard={true}
                onBackdropPress={onClose}
            >

                <View style={styles.modalOverlay}>
                    <View style={styles.container}>

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
                            <DeleteText
                                name={name}
                                setName={setName}
                            />
                            <TouchableOpacity style={styles.footerButton} onPress={onClose}>
                                <FontAwesomeIcon style={styles.footerIcon} icon={faCheck} />
                            </TouchableOpacity>

                            {/* TODO: add an X button that also closes the Modal, but keeps the original text */}
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
