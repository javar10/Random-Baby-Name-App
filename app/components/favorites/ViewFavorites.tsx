import React, { Dispatch, SetStateAction, useEffect, useRef, useState } from 'react';
import { View, Text, TouchableOpacity, TouchableWithoutFeedback } from 'react-native';
import { SwipeListView } from 'react-native-swipe-list-view';
import { loadFavorites, FavoriteItem } from '../../storage/favoritesStorage'
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome } from '@fortawesome/free-solid-svg-icons';
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
    const [isFiltered, setIsFiltered] = useState<boolean>(false);
    const [filteredFavorites, setFilteredFavorites] = useState<FilteredItem[]>([]);
    const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
    const [genderFilterFavs, setGenderFilterFavs] = useState<FavoriteItem[]>([])

    const openRowRef = useRef<any>(null);

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
                    <DeleteFavorite item={item} />
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
                        <FilterFavorites
                            selectedFilters={selectedFilters}
                            setSelectedFilters={setSelectedFilters}
                            isFiltered={isFiltered}
                            setIsFiltered={setIsFiltered}
                            filteredFavorites={filteredFavorites}
                            setFilteredFavorites={setFilteredFavorites}
                            genderFilterFavs={genderFilterFavs}
                            setGenderFilterFavs={setGenderFilterFavs}
                        />
                        <ShareFavsList
                            nameList={selectedFilters.includes('first names') || selectedFilters.includes('middle names')
                                ? filteredFavorites
                                : genderFilterFavs
                            }
                        />
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