import React, { Dispatch, SetStateAction } from "react";
import { View, Text, Pressable, StyleSheet, TouchableOpacity } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, { useSharedValue, useAnimatedStyle, withSpring } from "react-native-reanimated";
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faTrashCan } from '@fortawesome/free-solid-svg-icons';
import { FavoriteItem } from "@/app/storage/favoritesStorage";

const SWIPE_THRESHOLD = -50; // Adjust based on how far you want it to swipe

interface Props {
    item: FavoriteItem;
    onDelete: () => void;
    hasBottomBorder: boolean;
}
const SwipeableRow: React.FC<Props> = ({ item, onDelete, hasBottomBorder }) => {
    const translateX = useSharedValue(0);

    const panGesture = Gesture.Pan()
        .onUpdate((event) => {
            translateX.value = Math.max(-75, Math.min(0, event.translationX)); // Limit swipe distance
        })
        .onEnd(() => {
            if (translateX.value < SWIPE_THRESHOLD) {
                translateX.value = withSpring(-75); // Snap open
            } else {
                translateX.value = withSpring(0); // Snap closed
            }
        });

    const animatedStyle = useAnimatedStyle(() => ({
        transform: [{ translateX: translateX.value }],
    }));

    return (
        <View style={styles.container}>
            {/* Hidden options (Delete button) */}
            <View style={styles.hiddenOptions}>
                <TouchableOpacity onPress={onDelete}>
                    <FontAwesomeIcon style={styles.contentIcon} icon={faTrashCan} />
                </TouchableOpacity>
            </View>

            {/* Swipeable content */}
            <GestureDetector gesture={panGesture}>
                <Animated.View style={[styles.swipeableRow, animatedStyle, styles.favoritesItem,
                     {borderBottomWidth: !hasBottomBorder ? 0 : 1}
                     ]}>
                    <Text style={styles.itemText}>{item.firstName} {item.middleName}{item.middleName ? ' ' : ''}{item.lastName}</Text>
                </Animated.View>
            </GestureDetector>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: "row",
        alignItems: "center",
        marginVertical: 8,
        overflow: "hidden",
    },
    hiddenOptions: {
        position: "absolute",
        right: 0,
        width: 75,
        height: "100%",
        backgroundColor: "red",
        justifyContent: "center",
        alignItems: "center",
    },
    deleteButton: {
        backgroundColor: "red",
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    deleteText: {
        color: "white",
        fontWeight: "bold",
    },
    swipeableRow: {
        backgroundColor: "white",
        width: "100%",
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 5,
    },
    itemText: {
        fontSize: 28,
        paddingVertical: 5
    },
    contentIcon: {
        padding: 14,
        color: 'white'
    },
    favoritesItem: {
  
    },
});

export default SwipeableRow;
