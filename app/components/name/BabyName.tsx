import { Dispatch, SetStateAction, useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import { AutoSizeText, ResizeTextMode } from "react-native-auto-size-text";
import TypeNameModal from "./TypeNameModal";
import RandomNameModal from "./RandomNameModal";

interface Props {
    firstName: string;
    setFirstName: Dispatch<SetStateAction<string>>;
    middleName: string;
    setMiddleName: Dispatch<SetStateAction<string>>;
    lastName: string;
    setLastName: Dispatch<SetStateAction<string>>;
}

const { width: screenWidth } = Dimensions.get("window");

const BabyName: React.FC<Props> = ({ firstName, setFirstName, middleName, setMiddleName, lastName, setLastName }) => {
    
    const [modalVisible, setModalVisible] = useState<string>('');

    const [randomlySelectedFirstNamesList, setRandomlySelectedFirstNamesList] = useState<string[]>([]);
    const [firstNameListExists, setFirstNameListExists] = useState<boolean>(false);
    const [randomlySelectedMiddleNamesList, setRandomlySelectedMiddleNamesList] = useState<string[]>([]);
    const [middleNameListExists, setMiddleNameListExists] = useState<boolean>(false);

    return (
        <View>
            <View style={styles.box}>
                <AutoSizeText
                    fontSize={90}
                    numberOfLines={1}
                    mode={ResizeTextMode.max_lines}
                    style={styles.text}
                >
                    <Text onPress={() => setModalVisible('firstRandomNameModal')}>{firstName}</Text>
                    <Text> </Text>
                    <Text onPress={() => setModalVisible('middleRandomNameModal')}>{middleName}</Text>
                    <Text> </Text>
                    <Text onPress={() => setModalVisible('lastTypeNameModal')}>{lastName}</Text>
                </AutoSizeText>
            </View>

            {/* First Name Modals */}
            {(modalVisible === 'firstRandomNameModal') && (
                <RandomNameModal
                    visible={true}
                    setModalVisible={setModalVisible}
                    name='first'
                    setName={setFirstName}
                    listExists={firstNameListExists}
                    setListExists={setFirstNameListExists}
                    randomlySelectedNamesList={randomlySelectedFirstNamesList}
                    setRandomlySelectedNamesList={setRandomlySelectedFirstNamesList}
                    onClose={() => setModalVisible('')}
                />
            )}

            {(modalVisible === 'firstTypeNameModal') && (
                <TypeNameModal
                    visible={true}
                    name={firstName}
                    setName={setFirstName}
                    onClose={() => setModalVisible('')}
                />
            )}

            {/* Middle Name Modals */}
            {(modalVisible === 'middleRandomNameModal') && (
                <RandomNameModal
                    visible={true}
                    setModalVisible={setModalVisible}
                    name='middle'
                    setName={setMiddleName}
                    onClose={() => setModalVisible('')}
                    listExists={middleNameListExists}
                    setListExists={setMiddleNameListExists}
                    randomlySelectedNamesList={randomlySelectedMiddleNamesList}
                    setRandomlySelectedNamesList={setRandomlySelectedMiddleNamesList}
                />
            )}

            {(modalVisible === 'middleTypeNameModal') && (
                <TypeNameModal
                    visible={true}
                    name={middleName}
                    setName={setMiddleName}
                    onClose={() => setModalVisible('')}
                />
            )}

            {/* Last Name Modals */}
            {(modalVisible === 'lastTypeNameModal') && (
                <TypeNameModal
                    visible={true}
                    name={lastName}
                    setName={setLastName}
                    onClose={() => setModalVisible('')}
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

export default BabyName