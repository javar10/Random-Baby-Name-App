import React from 'react'

import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
import Modal from "react-native-modal";
import { girlNames } from '@/app/constants/girlNames';

interface Props {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    visible: boolean;
    onClose: () => void;
}

const RandomNameModal: React.FC<Props> = ({ name, setName, visible, onClose }) => {
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
                            <Text style={styles.headerText}>Select a name:</Text>

                        </View>

                        <View style={styles.nameList}>
                            <FlatList
                                data={girlNames}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) =>
                                    <TouchableOpacity onPress={() => {
                                        setName(item);
                                        onClose();
                                    }}
                                    >
                                        <Text style={styles.nameListText}>
                                            {item}
                                        </Text>
                                    </TouchableOpacity>
                                }
                            >

                            </FlatList>
                        </View>
                        <View>
                            <TouchableOpacity style={styles.footer} onPress={onClose}>
                                <Text style={styles.closeButtonText}>X</Text>
                            </TouchableOpacity>
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
    },
    header: {
        // alignItems: "flex-end",
        // marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderBottomWidth: 1,
    },
    closeButtonText: {
        color: 'gray',
        fontSize: 32,
        borderWidth: 1,
        borderRadius: 5,
        padding: 3,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    headerText: {
        // marginBottom: 5,
        fontSize: 32
    },
    nameList: {
        paddingVertical: 5,
        borderTopWidth: 1,
        borderBottomWidth: 1
    },
    nameListText: {
        fontSize: 28,
    },
    footer: {
        marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
        // borderTopWidth: 1,
    }
});

export default RandomNameModal
