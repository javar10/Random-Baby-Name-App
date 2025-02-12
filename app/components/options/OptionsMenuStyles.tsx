import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
    optionsMenu: {
        position: 'absolute',
        bottom: '15%',
        flexDirection: 'row',
        justifyContent: 'center',
        gap: 40,
    },
    optionsMenuButton: {
        borderRadius: 5,
        borderWidth: 2,
        borderColor: "#F0F0F0",
        backgroundColor: "#ffffff",
        width: 60,
        aspectRatio: 1,
        padding: 10,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    optionsMenuIcon: {
        padding: 20,
        color: "#909090",
    }
})

export default styles;