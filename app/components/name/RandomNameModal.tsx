import React, { useEffect } from 'react'
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { Dispatch, SetStateAction } from 'react';
import Modal from "react-native-modal";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowsRotate } from '@fortawesome/free-solid-svg-icons';
import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import girlNames from '@/app/constants/girlNames';
import boyNames from '@/app/constants/boyNames';
import neutralNames from '@/app/constants/neutralNames';
import styles from './modalStyle';

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

                        <View style={styles.content}>
                            <FlatList
                                data={randomlySelectedNamesList}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={({ item }) =>
                                    <TouchableOpacity onPress={() => {
                                        setName(item);
                                        onClose();
                                    }}
                                    >
                                        <Text style={styles.contentText}>
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

export default RandomNameModal
