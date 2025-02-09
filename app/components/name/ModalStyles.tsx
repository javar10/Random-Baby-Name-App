import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    modalOverlay: {
        justifyContent: 'center',
        alignItems: 'center',
        maxHeight: '90%'
    },
    container: {
        width: 300,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'center',
    },
    headerText: {
        fontSize: 32,
        fontWeight: 'bold'
    },
    content: {
        marginVertical: 5,
        borderTopWidth: 2,
        borderBottomWidth: 2,
    },
    contentText: {
        fontSize: 28,
        paddingVertical: 5
    },
    contentIcon: {
        padding: 14,
    },
    footer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    footerButton: {
        borderRadius: 5,
        padding: 10,
        justifyContent: 'center',
        alignContent: 'center',
    },
    footerIcon: {
        padding: 16,
    },
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
        flexGrow: 1, // Allows scrolling inside
    },
    favoritesListContent: {
        paddingBottom: 10, // Avoids cutoff at the bottom
    },
});

export default styles;