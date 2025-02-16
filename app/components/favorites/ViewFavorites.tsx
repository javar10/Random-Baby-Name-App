import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback, FlatList } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { loadFavorites, FavoriteItem } from '../../storage/favoritesStorage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faArrowUpFromBracket, faHome } from '@fortawesome/free-solid-svg-icons';
import ShareName from '../options/ShareName';
import { default as modalStyles } from '../name/ModalStyles';
import styles from './FavoritesStyles';
import DeleteFavorite from './DeleteFavorite';
import FilterFavorites from './FilterFavorites';
import ShareFavsList from './ShareFavsList';

interface Props {
    setViewFavorites: Dispatch<SetStateAction<boolean>>;
    setFirstName: Dispatch<SetStateAction<string>>;
    setMiddleName: Dispatch<SetStateAction<string>>;
    setLastName: Dispatch<SetStateAction<string>>;
    setGender: Dispatch<SetStateAction<string>>;
}

interface FilteredItem {
    name: string,
    place: string,
    gender: string,
}

type ListItem = FavoriteItem | FilteredItem

const ViewFavorites: React.FC<Props> = ({ setViewFavorites, setFirstName, setMiddleName, setLastName, setGender }) => {
    const [favorites, setFavorites] = useState<FavoriteItem[]>([]);
    const [isFiltered, setIsFiltered] = useState<boolean>(false);
    const [filteredFavorites, setFilteredFavorites] = useState<FilteredItem[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [genderFilterFavs, setGenderFilterFavs] = useState<FavoriteItem[]>([])

    const openRowRef = useRef<any>(null);
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
            // setFavorites(sortedFavorites);
            setGenderFilterFavs(sortedFavorites);
        });
    }, []);

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

    useEffect(() => {
        let nameFavs: FilteredItem[] = [];
        let tempFavs: FilteredItem[] = [];
        let seenNames = new Set<string>(); // To track names we've already added

        if (selectedFilters.includes('first names')) {
            tempFavs = [
                ...tempFavs,
                ...favorites
                    .map(item => ({ name: item.firstName, place: 'first', gender: item.gender }))
                    .filter(item => {
                        if (seenNames.has(item.name)) {
                            return false; // Skip this item if the name is already in the set
                        }
                        seenNames.add(item.name); // Add the name to the set
                        return true; // Keep this item
                    })
            ];
            // nameFavs = [...tempFavs]
        }

        if (selectedFilters.includes('middle names')) {
            tempFavs = [
                ...tempFavs,
                ...favorites
                    .map(item => ({ name: item.middleName, place: 'middle', gender: item.gender }))
                    .filter(item => {
                        if (item.name === '' || seenNames.has(item.name)) {
                            return false; // Skip this item if the name is already in the set
                        }
                        seenNames.add(item.name); // Add the name to the set
                        return true; // Keep this item
                    })
            ];
            // nameFavs = [...tempFavs]
        }

        // TODO: use nameFavs to set the favs from names
        // then use nameFavs to filter based on each gender. 
        // Add each gender list to the list if it's filter is selected.
        // if (tempFavs.length > 0) {
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

    const handleOutsidePress = () => {
        if (openRowRef.current) {
            openRowRef.current.closeRow();
            openRowRef.current = null;
        }
    };

    const editSelectedName = (item: FavoriteItem) => {
        console.log(item)
        setFirstName(item.firstName)
        setMiddleName(item.middleName)
        setLastName(item.lastName)
        setViewFavorites(false);
        setGender(item.gender)
    }

    const renderItem = ({ item }: { item: ListItem }) => {
        if ('firstName' in item) {
            return (
                <View>
                    <Text style={styles.itemText} onPress={() => editSelectedName(item)}>
                        {item.firstName} {item.middleName || ''} {item.lastName}
                    </Text>
                </View>
            );
        }

        return (
            <View>
                {/* TODO: OnPress of single name, open up editing component */}
                <Text style={styles.itemText} onPress={() => console.log(item)}>
                    {item.name}
                </Text>
            </View>
        );
    };

    const renderHiddenItem = ({ item }: { item: ListItem }) => {
        if ('firstName' in item) {
            return (
                <View style={styles.hiddenOptions}>
                    <ShareName
                        buttonType='fav'
                        firstName={item.firstName}
                        middleName={item.middleName}
                        lastName={item.lastName}
                    />
                    <DeleteFavorite
                        item={item}
                    />
                </View>
            )
        }
        return null;
    };

    return (
        <>
            <TouchableWithoutFeedback onPress={handleOutsidePress}>
                <View style={styles.favoritesContainer}>
                    <View style={modalStyles.header}>
                        <Text style={modalStyles.headerText}>Favorites</Text>
                    </View>
                    <View style={styles.favoritesContent}>
                        <SwipeListView
                            data={selectedFilters.includes('first names') || selectedFilters.includes('middle names')
                                ? filteredFavorites
                                : genderFilterFavs
                            }
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem}
                            rightOpenValue={-60}
                            leftOpenValue={60}
                            stopRightSwipe={-90}
                            stopLeftSwipe={90}
                            friction={10}
                            tension={50}
                            closeOnScroll
                        />

                    </View>
                    <View style={modalStyles.footer}>
                        {/* TODO: filter feature */}
                        <FilterFavorites
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}
                            isFiltered={isFiltered}
                            setIsFiltered={setIsFiltered}
                        />

                        {/* TODO: add a send button to send the complete list of favorites.  */}
                        <ShareFavsList /> 
                        {/* Pass list of visible names, either filteredfavs or genderFilterFavs */}

                        <TouchableOpacity style={modalStyles.footerButton} onPress={() => setViewFavorites(false)}>
                            <FontAwesomeIcon style={modalStyles.footerIcon} icon={faHome} />
                        </TouchableOpacity>
                    </View>
                </View>
            </TouchableWithoutFeedback>
        </>
    );
};

export default ViewFavorites;