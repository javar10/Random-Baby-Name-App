import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native';
import { loadFavorites, FavoriteItem } from '../../storage/favoritesStorage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faXmark, faEraser, faCheck } from '@fortawesome/free-solid-svg-icons';
import ShareName from '../options/ShareName';
import { default as modalStyles } from '../name/ModalStyles';
import { default as favStyles } from './FavoritesStyles';
import Modal from "react-native-modal";

interface Props {
    setModalOpen: Dispatch<SetStateAction<boolean>>;
    selectedFilters: string[];
    setSelectedFilters: Dispatch<SetStateAction<string[]>>;
    isFiltered: boolean;
    setIsFiltered: Dispatch<SetStateAction<boolean>>;
}

const FilterFavsModal: React.FC<Props> = ({ setModalOpen, selectedFilters, setSelectedFilters, isFiltered, setIsFiltered
    // setViewFavorites, setFirstName, setMiddleName, setLastName, setGender 
}) => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const filterOptions = ['first names', 'middle names', 'girl names', 'boy names', 'gender neutral']

    useEffect(() => {
        loadFavorites().then((data) => {
            const sortedFavorites = data.sort((a, b) => {
                return (
                    a.firstName.localeCompare(b.firstName) ||
                    (a.middleName && b.middleName
                        ? a.middleName.localeCompare(b.middleName)
                        : a.lastName.localeCompare(b.lastName)) ||
                    a.lastName.localeCompare(b.lastName)
                );
            });
            setFavorites(sortedFavorites);
        });
    }, [favorites]);

    const renderItem = ({ item }: { item: string }) => (
        <View style={{ flexDirection: 'row' }}>
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
                        { backgroundColor: selectedFilters.includes(item) ? '#909090' : '' }
                    ]}>
                    {item}
                </Text>
            </TouchableOpacity>
        </View>
    );

    const acceptFilters = () => {
        if (selectedFilters) {
            setIsFiltered(true)
        } else {
            setIsFiltered(false)
        }
        setModalOpen(false)
    }

    return (
        <View>
            <Modal
                isVisible={true}
                onBackdropPress={() => setModalOpen(false)}
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
                            <TouchableOpacity style={modalStyles.footerButton} onPress={() => console.log('clear filters')}>
                                <FontAwesomeIcon style={modalStyles.footerIcon} icon={faEraser} />
                            </TouchableOpacity>
                            <TouchableOpacity style={modalStyles.footerButton} onPress={acceptFilters}>
                                <FontAwesomeIcon style={modalStyles.footerIcon} icon={faCheck} />
                            </TouchableOpacity>
                            <TouchableOpacity style={modalStyles.footerButton} onPress={() => (setModalOpen(false))}>
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