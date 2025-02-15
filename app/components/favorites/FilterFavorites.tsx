import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { loadFavorites, FavoriteItem } from '../../storage/favoritesStorage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import ShareName from '../options/ShareName';
import { default as modalStyles } from '../name/ModalStyles';
import styles from './FavoritesStyles';
import DeleteFavorite from './DeleteFavorite';
import FilterFavsModal from './FilterFavsModal';

interface Props {
    // setViewFavorites: Dispatch<SetStateAction<boolean>>;
    // setFirstName: Dispatch<SetStateAction<string>>;
    // setMiddleName: Dispatch<SetStateAction<string>>;
    // setLastName: Dispatch<SetStateAction<string>>;
    // setGender: Dispatch<SetStateAction<string>>;
    selectedFilters: string[];
    setSelectedFilters: Dispatch<SetStateAction<string[]>>;
    isFiltered: boolean;
    setIsFiltered: Dispatch<SetStateAction<boolean>>;
}

const FilterFavorites: React.FC<Props> = ({ selectedFilters, setSelectedFilters, isFiltered, setIsFiltered,
    // setViewFavorites, setFirstName, setMiddleName, setLastName, setGender 
}) => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [modalOpen, setModalOpen] = useState<boolean>(false);

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

    return (
        <>

            <TouchableOpacity style={modalStyles.footerButton} onPress={() => setModalOpen(true)}>
                <FontAwesomeIcon style={modalStyles.footerIcon} icon={faFilter} />
            </TouchableOpacity>
            {modalOpen &&
                <FilterFavsModal
                    setModalOpen={setModalOpen}
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                    isFiltered={isFiltered}
                    setIsFiltered={setIsFiltered}
                />}
        </>

    );
};

export default FilterFavorites;