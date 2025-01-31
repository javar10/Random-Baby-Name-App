import React, { useState } from 'react';
import { View, Text, TextStyle, Modal, TouchableOpacity, StyleSheet, TextInput, Pressable } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
// import { TextInput } from 'react-native-gesture-handler';

interface Props {
    lastName: string;
    setLastName: Dispatch<SetStateAction<string>>;
    // style?: TextStyle | TextStyle[];
    visible: boolean;
    onClose: () => void;
}

const LastNameModal: React.FC<Props> = ({ lastName, setLastName, visible, onClose }) => {
    const handleChange = (newLastName: string) => {
        setLastName(newLastName); // Update the last name directly
    };


    // Debugging logs to check the modal visibility and state
    console.log('Modal visible:', visible);
    console.log('Last Name in Modal:', lastName);

    return (
        <View>
            <Modal
                animationType="fade"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        <View style={styles.modalHeader}>
                            <TouchableOpacity onPress={onClose}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
                        </View>

                        <View>
                            <Text style={styles.inputHeader}>Type a last name:</Text>
                            <TextInput
                                style={styles.inputText}
                                value={lastName}
                                onChangeText={handleChange}
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
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        width: 300,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        paddingBottom: 20
        // alignItems: 'center',
    },
    // modalText: {
    //     fontSize: 18,
    //     marginBottom: 10,
    // },
    modalHeader: {
        alignItems: "flex-end",
        marginBottom: 10,
    },
    // closeButton: {
    //     padding: 10,
    //     marginTop: 10,
    //     borderRadius: 5,
    // },
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
