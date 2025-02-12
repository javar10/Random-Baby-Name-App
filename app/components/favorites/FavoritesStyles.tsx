import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    favoritesContainer: {
        width: 300,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
        maxHeight: '90%', // Limits the total height
    },
    favoritesContent: {
        flexShrink: 1, // Ensures it takes up available space
        maxHeight: '80%', // Keeps FlatList contained
        borderTopWidth: 2,
        borderBottomWidth: 2,
    },
    favoritesItem: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        alignItems: 'center',
        paddingVertical: 5,
    },
    favoritesList: {
        flexGrow: 1,
    },
    favoritesListContent: {
        paddingBottom: 10,
    },
    itemText: {
        fontSize: 28,
        paddingVertical: 10,
        width: '100%',
        backgroundColor: 'white',
        borderBottomWidth: 1,
    },
    hiddenOptions: {
        borderBottomWidth: 1,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        width: "100%",
        height: '100%',
    },
    deleteOption: {
        marginRight: '5%',
    },
    shareOption: {
        marginLeft: '5%',
    },
    hiddenIcon: {
        padding: 16,
    },
});

export default styles;