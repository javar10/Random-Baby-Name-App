import { Text, TouchableOpacity, View } from "react-native";
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
            <TouchableOpacity onPress={resetName} >
                <Text>Start Over</Text>
            </TouchableOpacity>
        </View>
    );
}