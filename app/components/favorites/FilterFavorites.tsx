import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { FavoriteItem } from '../../storage/favoritesStorage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { default as modalStyles } from '../name/ModalStyles';
import FilterFavsModal from './FilterFavsModal';
// import  from 'react-native-vector-icons/Feather'
import { AntDesign, Feather } from '@expo/vector-icons';


interface FilteredItem {
    id: string,
    name: string,
    place: string,
    gender: string,
}

interface Props {
    favorites: FavoriteItem[];
    selectedFilters: string[];
    setSelectedFilters: Dispatch<SetStateAction<string[]>>;
    setFilteredFavorites: Dispatch<SetStateAction<FilteredItem[]>>;
    setGenderFilterFavs: Dispatch<SetStateAction<FavoriteItem[]>>;
}

const FilterFavorites: React.FC<Props> = ({ favorites, selectedFilters, setSelectedFilters, setFilteredFavorites, setGenderFilterFavs }) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);

    useEffect(() => {
        let tempFavs: FilteredItem[] = [];
        let seenNames = new Set<string>();
    
        favorites.forEach(item => {
            const addItem = (name: string, place: string) => {
                if (name && !seenNames.has(name)) {
                    seenNames.add(name);
                    tempFavs.push({ id: `${item.id}${place}`, name, place, gender: item.gender });
                }
            };
    
            if (selectedFilters.includes('first names')) {
                addItem(item.firstName, 'first');
            }
            if (selectedFilters.includes('middle names')) {
                addItem(item.middleName, 'middle');
            }
        });

        if (selectedFilters.some(filter => ['boy names', 'girl names', 'gender neutral'].includes(filter))) {
            tempFavs = tempFavs.filter(item =>
                (selectedFilters.includes('boy names') && item.gender === 'boy') ||
                (selectedFilters.includes('girl names') && item.gender === 'girl') ||
                (selectedFilters.includes('gender neutral') && item.gender === 'neutral')
            );
        }

        if (tempFavs.length > 1) {
            tempFavs.sort((a, b) => a.name.localeCompare(b.name));
        }
        
        setFilteredFavorites(tempFavs)

        const filteredData = favorites.filter(item => {
            const showItem =
                selectedFilters.length === 0 ||
                (selectedFilters.includes('boy names') && item.gender === 'boy') ||
                (selectedFilters.includes('girl names') && item.gender === 'girl') ||
                (selectedFilters.includes('gender neutral') && item.gender === 'neutral');
            return showItem;
        });
        setGenderFilterFavs(filteredData)

    }, [selectedFilters])

    return (
        <>
        {/* TODO: Change filter icon when filters are applied */}
            <TouchableOpacity style={modalStyles.footerButton} onPress={() => setModalOpen(true)}>
                <FontAwesomeIcon style={modalStyles.footerIcon} icon={faFilter} />
                {/* <Feather name='filter' size={32} strokeWidt/> */}
                {/* <AntDesign name='filter' size={36} /> */}
            </TouchableOpacity>

            {modalOpen &&
                <FilterFavsModal
                    setModalOpen={setModalOpen}
                    selectedFilters={selectedFilters}
                    setSelectedFilters={setSelectedFilters}
                />}
        </>
    );
};

export default FilterFavorites;

// TODO: Keep filters after closing favs
// TODO: Remove unused dependencies 