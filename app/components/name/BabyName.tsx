import { useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import TypeNameModal from "./TypeNameModal";
import { SafeAreaView, SafeAreaProvider } from 'react-native-safe-area-context';
import RandomNameModal from "./RandomNameModal";

const { width: screenWidth } = Dimensions.get("window");

export default function BabyName() {
    const [firstName, setFirstName] = useState<string>('First');
    const [middleName, setMiddleName] = useState<string>('Middle');
    const [lastName, setLastName] = useState<string>('Last');

    const [firstNameModalVisible, setFirstNameModalVisible] = useState<boolean>(false);
    const [middleNameModalVisible, setMiddleNameModalVisible] = useState<boolean>(false);
    const [lastNameModalVisible, setLastNameModalVisible] = useState<boolean>(false);

    const [randomlySelectedNamesList, setRandomlySelectedNamesList] = useState<string[]>([]);
    const [listExists, setListExists] = useState<boolean>(false);

    return (
        <View>
            <View style={styles.box}>
                <AutoSizeText
                    fontSize={90}
                    numberOfLines={1}
                    mode={ResizeTextMode.max_lines}
                    style={styles.text}
                >
                    <Text onPress={() => setFirstNameModalVisible(true)}>{firstName}</Text>
                    <Text> </Text>
                    <Text onPress={() => setMiddleNameModalVisible(true)}>{middleName}</Text>
                    <Text> </Text>
                    <Text onPress={() => setLastNameModalVisible(true)}>{lastName}</Text>
                </AutoSizeText>
            </View>

            {firstNameModalVisible && (
                <RandomNameModal
                    visible={firstNameModalVisible}
                    name={firstName}
                    setName={setFirstName}
                    onClose={() => setFirstNameModalVisible(false)}
                    listExists={listExists}
                    setListExists={setListExists}
                    randomlySelectedNamesList={randomlySelectedNamesList}
                    setRandomlySelectedNamesList={setRandomlySelectedNamesList}
                />
            )}

            {middleNameModalVisible && (
                <TypeNameModal
                    visible={middleNameModalVisible}
                    name={middleName}
                    setName={setMiddleName}
                    onClose={() => setMiddleNameModalVisible(false)}
                />
            )}

            {lastNameModalVisible && (
                <TypeNameModal
                    visible={lastNameModalVisible}
                    name={lastName}
                    setName={setLastName}
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