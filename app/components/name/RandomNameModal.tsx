import React, { useEffect } from 'react'

import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
import Modal from "react-native-modal";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { girlNames } from '@/app/constants/girlNames';
import boyNames from '@/app/constants/boyNames';
import { neutralNames } from '@/app/constants/neutralNames';

interface Props {
    visible: boolean;
    setModalVisible: Dispatch<SetStateAction<string>>;
    name: string;
    setName: Dispatch<SetStateAction<string>>;
    listExists: boolean;
    setListExists: Dispatch<SetStateAction<boolean>>;
    randomlySelectedNamesList: string[];
    setRandomlySelectedNamesList: Dispatch<SetStateAction<string[]>>;
    gender: string
    onClose: () => void;
}

const RandomNameModal: React.FC<Props> = ({ visible, setModalVisible, name, setName, listExists, setListExists, randomlySelectedNamesList, setRandomlySelectedNamesList, gender, onClose }) => {

    useEffect(() => {
        if (!listExists) {
            selectRandomNames(gender === 'girl' ? girlNames : gender === 'boy' ? boyNames : gender === 'neutral' ? neutralNames : [])
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
                            <TouchableOpacity style={styles.footerButton} onPress={() => selectRandomNames(gender === 'girl' ? girlNames : gender === 'boy' ? boyNames : gender === 'neutral' ? neutralNames : [])}>
                                <FontAwesomeIcon style={styles.footerIcon} icon={faArrowsRotate} />
                            </TouchableOpacity>

                            <TouchableOpacity style={styles.footerButton}
                                onPress={() => {
                                    onClose();
                                    setModalVisible(`${name}TypeNameModal`);
                                }}>
                                <FontAwesomeIcon style={styles.footerIcon} icon={faPenToSquare} />
                            </TouchableOpacity>

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
        borderTopWidth: 2,
        borderBottomWidth: 2
    },
    nameListText: {
        fontSize: 28,
    },
    footer: {
        // marginBottom: 10,
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    footerButton: {
        // borderWidth: 2,
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center',
        // marginVertical: 10
        // paddingHorizontal: 10,
        // marginTop: 10,
    },
    footerIcon: {
        // color: 'gray',
        padding: 16,
    }
});

export default RandomNameModal
