import React, { useEffect, useState } from 'react'

import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
import Modal from "react-native-modal";
import { girlNames } from '@/app/constants/girlNames';
import TypeNameModal from './TypeNameModal';

interface Props {
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    visible: boolean;
    onClose: () => void;
    setListExists: Dispatch<SetStateAction<boolean>>;
    listExists: boolean;
    randomlySelectedNamesList: string[];
    setRandomlySelectedNamesList: Dispatch<SetStateAction<string[]>>;
}

const RandomNameModal: React.FC<Props> = ({ name, setName, visible, onClose, listExists, setListExists, randomlySelectedNamesList, setRandomlySelectedNamesList }) => {
    const [typeNameModalIsVisible, setTypeNameModalIsVisible] = useState<boolean>(false);
    // TODO *** consider using a string to set visible to name the modal to open rather than a boolean. Then, if modalselected===textmodal, textmodal opens, or if modalselected===randommodal, randommodal opens. 
    // 
    //

    useEffect(() => {
        if (!listExists) {
            selectRandomNames(girlNames)
        }
        setListExists(true)
    }, [])

    const selectRandomNames = (list: string[], count = 5) => {
        if (list.length < count) throw new Error("List is too small");
        const usedIndexes = new Set<number>();
        const selectedNames: string[] = [];

        while (selectedNames.length < count) {
            const randomIndex = Math.floor(Math.random() * list.length);
            if (!usedIndexes.has(randomIndex)) {
                usedIndexes.add(randomIndex);
                selectedNames.push(list[randomIndex])
            }
        }

        setRandomlySelectedNamesList(selectedNames);
        console.log(randomlySelectedNamesList)
    }

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
                                data={randomlySelectedNamesList}
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
                        <View style={styles.footer}>
                            <TouchableOpacity style={styles.footerButton} onPress={() => selectRandomNames(girlNames)}>
                                <Text style={styles.closeButtonText}>New List</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.footerButton} onPress={onClose}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.footerButton}
                                onPress={() => {
                                    onClose();
                                    setTypeNameModalIsVisible(true);
                                    console.log(typeNameModalIsVisible)
                                }}>
                                <Text style={styles.closeButtonText}>Type Name</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
            </Modal >
            {typeNameModalIsVisible && (
                <TypeNameModal
                    name={name}
                    setName={setName}
                    visible={typeNameModalIsVisible}
                    onClose={onClose}
                />
            )}
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
        // alignItems: "flex-end",
        // marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-between',
        // borderBottomWidth: 1,
    },
    closeButtonText: {
        color: 'gray',
        fontSize: 24,
        borderWidth: 1,
        borderRadius: 5,
        padding: 3,
        paddingHorizontal: 10,
        marginTop: 10,
    },
    headerText: {
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
    },
    footerButton: {

    },
});

export default RandomNameModal
