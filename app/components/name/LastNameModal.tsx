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
                animationType="slide"
                transparent={true}
                visible={visible}
                onRequestClose={onClose}
            >
                <View style={styles.modalOverlay}>
                    <View style={styles.modalContainer}>
                        {/* <Text style={styles.modalText}>{content}</Text> */}

                        {/* Close Button */}
                        <Pressable onPress={onClose} style={styles.closeButton}>
                            <Text style={styles.closeButtonText}>Close</Text>
                        </Pressable>
                    </View>
                </View>
                <View>
                <TextInput
                    value={lastName}
                    onChangeText={handleChange}
                />
                </View>
    
                <Text>{lastName}</Text>
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
        padding: 20,
        borderRadius: 10,
        alignItems: 'center',
    },
    modalText: {
        fontSize: 18,
        marginBottom: 10,
    },
    closeButton: {
        backgroundColor: 'red',
        padding: 10,
        marginTop: 10,
        borderRadius: 5,
    },
    closeButtonText: {
        color: 'white',
        fontSize: 16,
    },
});

export default LastNameModal;
