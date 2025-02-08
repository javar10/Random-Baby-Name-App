import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    modalOverlay: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
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
        borderBottomWidth: 2
    },
    contentText: {
        fontSize: 28,
    },
    nameListText: {
        fontSize: 28,
    },
    inputText: {
        borderColor: 'gray',
        borderWidth: 1,
        borderRadius: 5,
        padding: 5,
        cursor: 'auto',
        fontSize: 28,
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