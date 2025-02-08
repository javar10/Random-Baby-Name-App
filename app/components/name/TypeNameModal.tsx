import React from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
import Modal from "react-native-modal";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark } from '@fortawesome/free-solid-svg-icons';

interface Props {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    visible: boolean;
    onClose: () => void;
}

const LastNameModal: React.FC<Props> = ({ name, setName, visible, onClose }) => {
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
                            {/* <TouchableOpacity onPress={onClose}> */}
                            <Text style={styles.headerText}>Enter a name</Text>
                            {/* <Text style={styles.closeButtonText}>X</Text> */}
                            {/* </TouchableOpacity> */}
                        </View>

                        <View style={styles.content}>
                            {/* <Text style={styles.inputHeader}>Type name:</Text> */}
                            <TextInput
                                style={styles.inputText}
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

const styles = StyleSheet.create({
    modalOverlay: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: 300,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 32
    },
    content: {
        paddingVertical: 5,
        // borderTopWidth: 2,
        // borderBottomWidth: 2
    },
    inputText: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        cursor: 'auto',
        fontSize: 28,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    footerButton: {
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center',
    },
    footerIcon: {
        // color: 'gray',
        padding: 16,
    }
});

export default LastNameModal;
