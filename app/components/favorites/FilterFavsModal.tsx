import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList } from 'react-native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark, faEraser, faCheck } from '@fortawesome/free-solid-svg-icons';
import { default as modalStyles } from '../name/ModalStyles';
import Modal from "react-native-modal";

interface Props {
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    selectedFilters: string[];
    setSelectedFilters: Dispatch<SetStateAction<string[]>>;
}

const FilterFavsModal: React.FC<Props> = ({ setModalOpen, selectedFilters, setSelectedFilters }) => {
    const filterOptions = ['first names', 'middle names', 'girl names', 'boy names', 'gender neutral']
    const [originalFilters, setOriginalFilters] = useState<string[]>([]);

    useEffect(() => {
        setOriginalFilters(selectedFilters)
        console.log(originalFilters)
    }, [])

    const renderItem = ({ item }: { item: string }) => (
        <View style={{
            flexDirection: 'row',
            backgroundColor: selectedFilters.includes(item) ? '#909090' : ''
        }}>
            <TouchableOpacity onPress={() => {
                console.log(item)
                if (selectedFilters.includes(item)) {
                    setSelectedFilters((prev) => prev.filter((filter) => filter !== item));
                } else {
                    setSelectedFilters((prev) => [...prev, item]);
                }
            }}
            >
                <Text
                    style={[
                        modalStyles.contentText,
                        {
                            paddingLeft: 5,
                            color: selectedFilters.includes(item) ? 'white' : ''
                        }
                    ]}>
                    {item}
                </Text>
            </TouchableOpacity>
        </View>
    );

    const cancelFilter = () => {
        setSelectedFilters(originalFilters);
        setModalOpen(false);
    }

    return (
        <View>
            <Modal
                isVisible={true}
                onBackdropPress={cancelFilter}
            >
                <View style={modalStyles.modalOverlay}>
                    <View style={modalStyles.container}>
                        <View style={modalStyles.header}>
                            <Text style={modalStyles.headerText}>Filter Favorites</Text>
                        </View>

                        <View style={modalStyles.content}>
                            <FlatList
                                data={filterOptions}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderItem}
                            />
                        </View>

                        <View style={modalStyles.footer}>
                            <TouchableOpacity style={modalStyles.footerButton} onPress={() => setSelectedFilters([])}>
                                <FontAwesomeIcon style={modalStyles.footerIcon} icon={faEraser} />
                            </TouchableOpacity>
                            <TouchableOpacity style={modalStyles.footerButton} onPress={() => (setModalOpen(false))}>
                                <FontAwesomeIcon style={modalStyles.footerIcon} icon={faCheck} />
                            </TouchableOpacity>
                            <TouchableOpacity style={modalStyles.footerButton} onPress={cancelFilter}>
                                <FontAwesomeIcon style={modalStyles.footerIcon} icon={faXmark} />
                            </TouchableOpacity>

                        </View>
                    </View>
                </View>

            </Modal>
        </View>


    );
};

export default FilterFavsModal;