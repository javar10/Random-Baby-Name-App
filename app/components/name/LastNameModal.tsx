import React, { useState } from 'react';
import { View, Text, TextStyle, TouchableOpacity, StyleSheet, TextInput, Pressable } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
// import { TextInput } from 'react-native-gesture-handler';
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import Modal from "react-native-modal";

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

    return (
        <SafeAreaProvider>


            <SafeAreaView style={styles.centeredView}>
                <Modal
                    // animationType="slide"
                    // transparent={false}
                    isVisible={visible}
                    // onRequestClose={() => {

                    //     onClose;
                    // }}
                    >
                    {/* <Modal
                    animationType="fade"
                    transparent={true}
                    visible={visible}
                    onRequestClose={onClose}
                > */}

                    <View style={styles.modalOverlay}>
                        <View style={styles.modalContainer}>
                            <View style={styles.modalHeader}>
                                <Pressable onPress={onClose}>
                                    <Text style={styles.closeButtonText}>X</Text>
                                </Pressable>
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
            </SafeAreaView>
        </SafeAreaProvider>


    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalOverlay: {
        // flex: 1,
        position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
    },
    modalContainer: {
        // position: 'absolute',
        width: 300,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        paddingBottom: 20,
        // top: 0,
        // left: 0,
        // right: 0,
        // bottom: 0,
        // backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent background
        justifyContent: "center",
        alignItems: "center",
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
