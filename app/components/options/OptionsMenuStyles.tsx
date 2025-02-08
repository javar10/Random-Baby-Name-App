import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    optionsMenu: {
        margin: 20,
    },
    optionsMenuButton: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#F0F0F0",
        backgroundColor: "#ffffff",
        width: '20%',
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    optionsMenuButtonText: {
        fontSize: 28,
        color: "#909090",
    },
    optionsMenuIcon: {
        padding: 20,
        color: "#909090",
    }
})

export default styles;