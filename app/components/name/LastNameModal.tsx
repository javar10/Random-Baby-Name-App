import React from 'react';
import { View, Text, StyleSheet, TextInput, Pressable } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
import Modal from "react-native-modal";

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
                            <View style={styles.modalHeader}>
                                <Pressable onPress={onClose}>
                                    <Text style={styles.closeButtonText}>X</Text>
                                </Pressable>
                            </View>

                            <View>
                                <Text style={styles.inputHeader}>Type name:</Text>
                                <TextInput
                                    style={styles.inputText}
                                    value={name}
                                    onChangeText={handleChange}
                                    onSubmitEditing={onClose}
                                />
                            </View>
                        </View>
                    </View>
                </Modal>
            </View>
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
        paddingBottom: 20,
    },
    modalHeader: {
        alignItems: "flex-end",
        marginBottom: 10,
    },
    closeButtonText: {
        color: 'gray',
        fontSize: 16,
    },
    inputHeader: {
        marginBottom: 5,
        fontSize: 16
    },
    inputText: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        cursor: 'auto',
        fontSize: 32,
    }
});

export default LastNameModal;
