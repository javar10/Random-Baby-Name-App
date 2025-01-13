import { Text, View, StyleSheet, Dimensions } from "react-native";
import { AutoSizeText, ResizeTextMode } from 'react-native-auto-size-text';

const { width: screenWidth } = Dimensions.get("window");

export default function BabyName() {
    return (
        <View
            style={styles.box}
        >
            <AutoSizeText
                fontSize={32}
                numberOfLines={1} 
                mode={ResizeTextMode.max_lines} 
                style={styles.text}
            >
                {/* TODO: Cannot wrap the text elements. Change each on to its own component and find a new solution to dynamically change the font size */}
                <Text>First </Text> 
                <Text style={{ marginRight: 5 }}>Middle </Text>
                <Text>Last</Text>
            </AutoSizeText>
        </View>
    ); d
}

const styles = StyleSheet.create({
    box: {
        // flex: 1,
        width: screenWidth * 0.95,
        flexDirection: 'row',
        justifyContent: "center",
        alignItems: "center",
        borderWidth: 2,
        borderColor: "#F0F0F0",
        backgroundColor: "#ffffff",
        borderRadius: 10,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 20,
        paddingRight: 20,
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 }, // Optional: Shadow offset for iOS
        shadowOpacity: 0.2, // Optional: Shadow opacity for iOS
        shadowRadius: 5, // Optional: Shadow blur for iOS
        elevation: 5, // Optional: Shadow for Android
    },
    text: {
        color: "#F0F0F0",
        flex: 1,
        textAlign: "center",
    }

})