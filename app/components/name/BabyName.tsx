import { useState } from "react";
import { Text, View, StyleSheet, Dimensions, SafeAreaView } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import LastNameModal from "./LastNameModal";

const { width: screenWidth } = Dimensions.get("window");

export default function BabyName() {
    const [firstName, setFirstName] = useState<string>('First');
    const [middleName, setMiddleName] = useState<string>('Middle');
    const [lastName, setLastName] = useState<string>('Last');

    const [lastNameModalVisible, setLastNameModalVisible] = useState<boolean>(false);

    // Debugging logs to check if states are updated correctly
    console.log('First Name:', firstName);
    console.log('Middle Name:', middleName);
    console.log('Last Name:', lastName);
    console.log('Modal Visible:', lastNameModalVisible);

    return (
        <SafeAreaView style={styles.box}>
            <AutoSizeText
                fontSize={90}
                numberOfLines={1}
                mode={ResizeTextMode.max_lines}
                style={styles.text}
            >
                <Text onPress={() => setFirstName('Lia')}>{firstName}</Text>
                <Text> </Text>
                <Text>{middleName}</Text>
                <Text> </Text>
                <Text onPress={() => setLastNameModalVisible(true)}>{lastName}</Text>
            </AutoSizeText>

            {lastNameModalVisible && (
                <LastNameModal
                    visible={lastNameModalVisible}
                    lastName={lastName}
                    setLastName={setLastName}
                    onClose={() => setLastNameModalVisible(false)}
                />
            )}

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    box: {
        // width: screenWidth * 0.75,
        maxWidth: screenWidth * 0.75,
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
        color: "#C0C0C0",
        // flex: 1,
        textAlign: "center",
        // fontSize: 90,
    }

})