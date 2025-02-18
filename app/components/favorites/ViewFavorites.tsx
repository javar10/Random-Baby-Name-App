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
    id: string,
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
            setFavorites(sortedFavorites);
        });
    }, [favorites]);

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

    const editFilteredName = (item: FilteredItem) => {
        setLastName('Last')
        setGender(item.gender)
        setViewFavorites(false)
        if (item.place === 'first') {
            setFirstName(item.name)
            setMiddleName('Middle')
        } else if (item.place === 'middle') {
            setFirstName('First')
            setMiddleName(item.name)
        }
        console.log({ item })
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
                <Text style={styles.itemText} onPress={() => editFilteredName(item)}>
                    {item.name}
                </Text>
            </View>
        );
    };

    // const renderHiddenItem = ({ item }: { item: ListItem }) => {
    //     if ('firstName' in item) {
    //         return (
    //             <View style={styles.hiddenOptions}>
    //                 <ShareName //I DO want to share the single name
    //                     buttonType='fav'
    //                     name={`${item.firstName} ${item.middleName ? `${item.middleName} ` : ''}${item.lastName}`}
    //                 />
    //                 <DeleteFavorite item={item} row={openRowRef} />
    //             </View>
    //         )
    //     }
    //     return (
    //         <View style={styles.hiddenOptions}>
    //             <ShareName
    //                 buttonType='fav'
    //                 name={item.name}
    //             />
    //         </View>
    //     )
    // };

    const renderHiddenItem = ({ item, rowMap }: { item: ListItem; rowMap: { [key: string]: any } }) => {
        if ('firstName' in item) {
            return (
                <View style={styles.hiddenOptions}>
                    <ShareName
                        buttonType='fav'
                        name={`${item.firstName} ${item.middleName ? `${item.middleName} ` : ''}${item.lastName}`}
                    />
                    <DeleteFavorite favorites={favorites} setFavorites={setFavorites} item={item} rowMap={rowMap} rowKey={item.id.toString()} />
                </View>
            );
        }
        return (
            <View style={styles.hiddenOptions}>
                <ShareName
                    buttonType='fav'
                    name={item.name}
                />
            </View>
        );
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
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderItem}
                            renderHiddenItem={(data, rowMap) => renderHiddenItem({ item: data.item, rowMap })}
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
                            favorites={favorites}
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