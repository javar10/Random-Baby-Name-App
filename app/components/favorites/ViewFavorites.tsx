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
            setFavorites(sortedFavorites);
        });
    }, [favorites]);

    // useEffect(() => {  // this is to set the filteredFavorites list according to the selectedFilters array
    //     // select names that are meet the list criteria

    //     let updatedFavorites: string[] = [];

    //     if (selectedFilters.includes('first names')) {
    //         const namesToAdd: string[] = favorites.map(name => name.firstName);
    //         updatedFavorites = [...updatedFavorites, ...namesToAdd];
    //     } 

    //     if (selectedFilters.includes('middle names')) {
    //         const namesToAdd: string[] = favorites.map(name => name.middleName);
    //         updatedFavorites = [...updatedFavorites, ...namesToAdd];
    //     } 

    //     const uniqueFavorites = Array.from(new Set(updatedFavorites));
    //     setFilteredFavorites(uniqueFavorites.sort());
    //     setIsFiltered(selectedFilters.length > 0);

    // }, [selectedFilters])

    // useEffect(() => { // This is working fine now, but I think what i really want is a function to view different parts of the FavoriteItem object. 
    //     if (selectedFilters.length === 0) {
    //         setIsFiltered(false);
    //     } else {
    //         let updatedFavorites: string[] = [];

    //         if (selectedFilters.includes('first names')) {
    //             updatedFavorites = [...updatedFavorites, ...favorites.map(name => name.firstName)];
    //         }
    //         if (selectedFilters.includes('middle names')) {
    //             updatedFavorites = [...updatedFavorites, ...favorites.map(name => name.middleName)];
    //         }

    //         const uniqueFavorites = Array.from(new Set(updatedFavorites));
    //         setFilteredFavorites(uniqueFavorites.sort());
    //         setIsFiltered(true);
    //     }
    //     // console.log({ filteredFavorites })
    // }, [selectedFilters, isFiltered]);


    useEffect(() => {
        let tempFavs: FilteredItem[] = []
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
        }
        tempFavs.sort((a, b) => a.name.localeCompare(b.name));

        setFilteredFavorites(tempFavs)
        setIsFiltered(selectedFilters.length > 0)

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

    // const renderItem = ({ item }: { item: FavoriteItem }) => {
    //     let nameList: string[] = [];
    //     let firstNamesSelected: boolean = false;

    //     if (selectedFilters.includes('first names')) firstNamesSelected = true;
    //     return (
    //         <View>
    //             <Text style={styles.itemText} onPress={() => editSelectedName(item)}>
    //                 {/* {typeof item === 'string'  // Again, this works, but I don't think it's what I want
    //                 ? item
    //                 : `${item.firstName} ${item.middleName || ''} ${item.lastName}`} */}
    //                 {/* {!isFiltered
    //                 ? `${item.firstName} ${item.middleName || ''} ${item.lastName}`

    //                 : selectedFilters.includes('first names')
    //                     ? item.firstName
    //                     : selectedFilters.includes()
    //                     : ''
    //             } */}
    //                 {selectedFilters.includes('first names')
    //                     ? item.firstName
    //                     : selectedFilters.includes('middle names')
    //                         ? item.middleName
    //                         : `${item.firstName} ${item.middleName || ''} ${item.lastName}`
    //                 }
    //             </Text>
    //         </View>
    //     )
    // };

    const renderItem = ({ item }: { item: ListItem }) => {
        // const filteredFavorites: FilteredItem[] = [];

        // if (selectedFilters.includes('first names')) filteredFavorites.push({name: item.firstName, place: 'first', gender: item.gender});
        // if (selectedFilters.includes('middle names') && item.middleName) filteredFavorites.push({name: item.middleName, place: 'middle', gender: item.gender});

        // If no filters are selected, show the full name
        // if (filteredFavorites.length === 0) {
        //     filteredFavorites.push(`${item.firstName} ${item.middleName || ''} ${item.lastName}`);
        // }
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
                <Text style={styles.itemText} onPress={() => console.log(item)}>
                    {item.name}
                </Text>
            </View>
        )

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

    const renderFilteredItem = ({ item }: { item: FilteredItem }) => (
        <View>
            <Text style={styles.itemText} onPress={() => console.log(item)}>
                {item.name}
            </Text>
        </View>
    );

    return (
        <>
            <TouchableWithoutFeedback onPress={handleOutsidePress}>
                <View style={styles.favoritesContainer}>
                    <View style={modalStyles.header}>
                        <Text style={modalStyles.headerText}>Favorites</Text>
                    </View>
                    <View style={styles.favoritesContent}>
                        {/* {!isFiltered && */}
                        <SwipeListView
                            // data={!isFiltered ? favorites : filteredFavorites} // This also works, but again, I think not what I want. I should always pass favorites.
                            data={isFiltered ? filteredFavorites : favorites}
                            keyExtractor={(item, index) => index.toString()}
                            renderItem={renderItem}
                            renderHiddenItem={renderHiddenItem} // I want to conditionally render the hidden items or maybe just no 'trash'
                            rightOpenValue={-60}
                            leftOpenValue={60}
                            stopRightSwipe={-90}
                            stopLeftSwipe={90}
                            friction={10}
                            tension={50}
                            closeOnScroll
                        />
                        {/* } */}
                        {/* {isFiltered &&
                            <FlatList
                                data={favorites}
                                keyExtractor={(item, index) => index.toString()}
                                renderItem={renderFilteredItem}
                            />
                        } */}
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
                        <TouchableOpacity style={modalStyles.footerButton} onPress={() => console.log('sent')}>
                            <FontAwesomeIcon style={modalStyles.footerIcon} icon={faArrowUpFromBracket} />
                        </TouchableOpacity>

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