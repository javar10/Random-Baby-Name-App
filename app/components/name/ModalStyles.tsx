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
        height: 'auto'
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
        padding: 16,
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
    
});

export default styles;