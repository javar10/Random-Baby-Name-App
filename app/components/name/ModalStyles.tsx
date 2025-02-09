import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    modalOverlay: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    container: {
        width: 300,
        backgroundColor: 'white',
        padding: 10,
        borderRadius: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    headerText: {
        fontSize: 32
    },
    content: {
        paddingVertical: 15,
        borderTopWidth: 2,
        borderBottomWidth: 2,
        // maxHeight: 120,
    },
    favoritesList: {
        flexDirection: 'row',
        borderBottomWidth: 1,
        padding: 8,
    },
    contentText: {
        fontSize: 28,
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
        // color: 'gray',
        padding: 16,
    }
});

export default styles;