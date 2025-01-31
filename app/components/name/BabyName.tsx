import { useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import LastNameModal from "./LastNameModal";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';

const { width: screenWidth } = Dimensions.get("window");

export default function BabyName() {
    const [firstName, setFirstName] = useState<string>('First');
    const [middleName, setMiddleName] = useState<string>('Middle');
    const [lastName, setLastName] = useState<string>('Last');

    const [lastNameModalVisible, setLastNameModalVisible] = useState<boolean>(false);

    return (
        <View>
            <View style={styles.box}>
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
            </View>

            {lastNameModalVisible && (
                <LastNameModal
                    visible={lastNameModalVisible}
                    lastName={lastName}
                    setLastName={setLastName}
                    onClose={() => setLastNameModalVisible(false)}
                />
            )}
            
        </View>
    );
}

const styles = StyleSheet.create({
    box: {
        maxWidth: screenWidth * 0.8,
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
        shadowOffset: { width: 0, height: 2 }, 
        shadowOpacity: 0.2,
        shadowRadius: 5, 
        elevation: 5,
    },
    text: {
        color: "#C0C0C0",
        textAlign: "center",
    }

})