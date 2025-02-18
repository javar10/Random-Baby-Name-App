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

interface FilteredItem {
    id: number,
    name: string,
    place: string,
    gender: string,
}

interface Props {
    // setViewFavorites: Dispatch<SetStateAction<boolean>>;
    // setFirstName: Dispatch<SetStateAction<string>>;
    // setMiddleName: Dispatch<SetStateAction<string>>;
    // setLastName: Dispatch<SetStateAction<string>>;
    // setGender: Dispatch<SetStateAction<string>>;
    favorites: FavoriteItem[];
    selectedFilters: string[];
    setSelectedFilters: Dispatch<SetStateAction<string[]>>;
    isFiltered: boolean;
    setIsFiltered: Dispatch<SetStateAction<boolean>>;
    filteredFavorites: FilteredItem[];
    setFilteredFavorites: Dispatch<SetStateAction<FilteredItem[]>>;
    genderFilterFavs: FavoriteItem[];
    setGenderFilterFavs: Dispatch<SetStateAction<FavoriteItem[]>>;
}

const FilterFavorites: React.FC<Props> = ({ favorites, selectedFilters, setSelectedFilters, isFiltered, setIsFiltered,
    filteredFavorites, setFilteredFavorites, genderFilterFavs, setGenderFilterFavs,
    // setViewFavorites, setFirstName, setMiddleName, setLastName, setGender 
}) => {
    // const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
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
            setGenderFilterFavs(sortedFavorites);
        });
    }, [favorites]);

    // useEffect(() => {
    //     loadFavorites().then((data) => {
    //         const sortedFavorites = data.sort((a, b) => {
    //             return (
    //                 a.firstName.localeCompare(b.firstName) ||
    //                 (a.middleName && b.middleName
    //                     ? a.middleName.localeCompare(b.middleName)
    //                     : a.lastName.localeCompare(b.lastName)) ||
    //                 a.lastName.localeCompare(b.lastName)
    //             );
    //         });
    //         setFavorites(sortedFavorites);
    //     });
    // }, [favorites]);

    useEffect(() => {
        let nameFavs: FilteredItem[] = [];
        let tempFavs: FilteredItem[] = [];
        let seenNames = new Set<string>();

        if (selectedFilters.includes('first names')) {
            tempFavs = [
                ...tempFavs,
                ...favorites
                    .map(item => ({ id: Date.now(),name: item.firstName, place: 'first', gender: item.gender }))
                    .filter(item => {
                        if (seenNames.has(item.name)) {
                            return false;
                        }
                        seenNames.add(item.name);
                        return true;
                    })
            ];

        }

        if (selectedFilters.includes('middle names')) {
            tempFavs = [
                ...tempFavs,
                ...favorites
                    .map(item => ({ id: Date.now(), name: item.middleName, place: 'middle', gender: item.gender }))
                    .filter(item => {
                        if (item.name === '' || seenNames.has(item.name)) {
                            return false;
                        }
                        seenNames.add(item.name);
                        return true;
                    })
            ];

        }

        if (selectedFilters.includes('boy names') || selectedFilters.includes('girl names') || selectedFilters.includes('gender neutral')) {
            if (selectedFilters.includes('boy names')) {
                const boyFavs = tempFavs.filter(item => item.gender === 'boy');
                nameFavs = [...nameFavs, ...boyFavs];
            }
            if (selectedFilters.includes('girl names')) {
                const girlFavs = tempFavs.filter(item => item.gender === 'girl');
                nameFavs = [...nameFavs, ...girlFavs];
            }
            if (selectedFilters.includes('gender neutral')) {
                const neutralFavs = tempFavs.filter(item => item.gender === 'neutral');
                nameFavs = [...nameFavs, ...neutralFavs];
            }
            tempFavs = [...nameFavs]
        }

        tempFavs.sort((a, b) => a.name.localeCompare(b.name));
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

        console.log({ filteredData })
        console.log({ tempFavs })

    }, [selectedFilters, isFiltered])

    return (
        <>
            <TouchableOpacity style={modalStyles.footerButton} onPress={() => setModalOpen(true)}>
                <FontAwesomeIcon style={modalStyles.footerIcon} icon={faFilter} />
            </TouchableOpacity>
            {modalOpen &&
                <FilterFavsModal
                    favorites={favorites}
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