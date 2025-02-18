import React, { Dispatch, SetStateAction, useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import uuid from 'react-native-uuid';
import { FavoriteItem } from '../../storage/favoritesStorage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faFilter } from '@fortawesome/free-solid-svg-icons';
import { default as modalStyles } from '../name/ModalStyles';
import FilterFavsModal from './FilterFavsModal';

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
        let nameFavs: FilteredItem[] = [];
        let tempFavs: FilteredItem[] = [];
        let seenNames = new Set<string>();

        if (selectedFilters.includes('first names')) {
            tempFavs = [
                ...tempFavs,
                ...favorites
                    .map(item => ({ id: item.id, name: item.firstName, place: 'first', gender: item.gender }))
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
                    .map(item => ({ id: uuid.v4() as string, name: item.middleName, place: 'middle', gender: item.gender }))
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

    }, [selectedFilters])

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
                />}
        </>
    );
};

export default FilterFavorites;

// 1. Excessive State Updates in useEffect
// You are calling both setFilteredFavorites and setGenderFilterFavs inside the same useEffect. Each call triggers a re-render, potentially leading to multiple re-renders in one render cycle.
// Solution: Combine the logic into a single state update or separate the filtering logic into a useMemo and trigger the useEffect only when necessary.
// 

// 
// 3. Inefficient Filtering Logic
// You are looping over favorites multiple times for each filter, which is inefficient and can be improved.
// Solution: Use a single loop and filter all categories in one pass.
// 
// 4. Unnecessary useEffect Dependency
// Your useEffect depends on selectedFilters, which is correct, but it seems isFiltered is also a piece of state related to filtering and isn't included. This can lead to stale state issues.
// Solution: Add isFiltered as a dependency if it's part of the filtering logic.
// 
// 5. Repeated Code Blocks
// The filtering of first names and middle names is almost identical, only differing by the key being accessed.
// Solution: Refactor the code to avoid repetition by using a helper function.
// 
// 6. Sorting Directly on the Original Array
// .sort() mutates the original array, which might cause unintended side effects if favorites is being used elsewhere.
// Solution: Use .slice().sort() instead of .sort().
//
// 7. seenNames Handling
// The seenNames set logic is implemented separately for first names and middle names, but there’s a chance that duplicate names across these categories could slip through. You also don’t clear the seenNames between different filter operations, which might lead to incorrect results.
// Solution: Reset seenNames for each filtering operation or manage it more carefully.
// 
// 8. Mixed Data Types for State
// You're using FilteredItem[] for filteredFavorites and FavoriteItem[] for genderFilterFavs, which can cause confusion and potential type mismatches.
// Solution: Use consistent types or document the differences clearly.
// 
// 
// Key Refactor Suggestions:
// Use useMemo for filtering logic.
// Avoid UUID regeneration on every render.
// Consolidate filter logic to reduce loops.
// Use consistent data structures for state.