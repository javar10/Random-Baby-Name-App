import { View, Text, TouchableOpacity, FlatList } from "react-native";
import React, { Dispatch, SetStateAction, useState } from 'react';
import Modal from "react-native-modal";
import { default as optionsStyles } from "./OptionsMenuStyles";
import { default as modalStyles } from '../name/ModalStyles';
import { default as favStyles } from '../favorites/FavoritesStyles';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFont, faXmark } from "@fortawesome/free-solid-svg-icons";
import fontList from "@/app/constants/fontList";

interface Props {
    nameFont: string;
    setNameFont: Dispatch<SetStateAction<string>>;
}

const fontArray = Object.keys(fontList).map((key) => ({
    label: key,
    value: key,
}));

const ChooseFont: React.FC<Props> = ({ nameFont, setNameFont }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    return (
        <>
            <Modal
                isVisible={modalOpen}
                onBackdropPress={() => setModalOpen(false)}
            >
                <View style={modalStyles.modalOverlay}>
                    <View style={[modalStyles.container, {width: 325}]}>

                        <View style={modalStyles.header}>
                            <Text style={modalStyles.headerText}>Select a font</Text>
                        </View>
                        <View style={favStyles.favoritesContent}>
                            <FlatList
                                data={fontArray}
                                keyExtractor={(item) => item.value}
                                renderItem={({ item }) => (
                                    <TouchableOpacity
                                        onPress={() => {
                                            setNameFont(item.value)
                                            setModalOpen(false)
                                        }}
                                    >
                                        <Text
                                            style={[
                                                favStyles.itemText,
                                                {
                                                    fontFamily: item.label,
                                                    backgroundColor: nameFont === item.value ? '#909090' : '',
                                                    color: nameFont === item.value ? 'white' : 'black',
                                            }]}
                                        >
                                            {item.label}
                                        </Text>
                                    </TouchableOpacity>
                                )}
                            />
                        </View>
                        <View style={modalStyles.footer}>
                            <TouchableOpacity style={modalStyles.footerButton} onPress={() => setModalOpen(false)}>
                                <FontAwesomeIcon style={modalStyles.footerIcon} icon={faXmark} />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>
            </Modal >

            <TouchableOpacity style={optionsStyles.optionsMenuButton} onPress={() => setModalOpen(true)} >
                <FontAwesomeIcon style={optionsStyles.optionsMenuIcon} icon={faFont} />
            </TouchableOpacity>
        </>

    );
}

export default ChooseFont
