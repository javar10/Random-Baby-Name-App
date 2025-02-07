import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import BabyName from "./name/BabyName";
import { useState } from "react";

export default function Home() {
    const [firstName, setFirstName] = useState<string>('First');
    const [middleName, setMiddleName] = useState<string>('Middle');
    const [lastName, setLastName] = useState<string>('Last');

    const resetName = () => {
        setFirstName('First');
        setMiddleName('Middle');
        setLastName('Last');
    }

    return (
        <View>
            <BabyName
                firstName={firstName}
                setFirstName={setFirstName}
                middleName={middleName}
                setMiddleName={setMiddleName}
                lastName={lastName}
                setLastName={setLastName}
            />
            <View style={styles.optionsMenu}>
            <TouchableOpacity style={styles.optionsMenuButton} onPress={resetName} >
                <Text style={styles.optionsMenuButtonText}>Start Over</Text>
            </TouchableOpacity>
            </View>

        </View>
    );
}

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
        padding: 5,
        justifyContent: 'center',
        alignItems: 'center',
        shadowColor: "#000",
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.2,
        shadowRadius: 5,
        elevation: 5,
    },
    optionsMenuButtonText: {
        fontSize: 20,
        color: "#909090",
    }
})