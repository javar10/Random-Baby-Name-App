import { useState } from "react";
import { Text, View, StyleSheet, Dimensions } from "react-native";
import FirstNameText from "./first_name/FirstNameText";
import MiddleNameText from "./middle_name/MiddleNameText";
import LastNameText from "./last_name/LastNameText";

const { width: screenWidth } = Dimensions.get("window");

export default function BabyName() {
    const [firstName, setFirstName] = useState<string>('First');
    const [middleName, setMiddleName] = useState<string>('Middle');
    const [lastName, setLastName] = useState<string>('Last');

    const [nameWidth, setNameWidth] = useState<number>(0);

    const handleTextLayout = (e: any, setTextWidth: React.Dispatch<React.SetStateAction<number>>) => {
        const { width: textWidth } = e.nativeEvent.layout;
        setTextWidth(textWidth);
    };

    const calculateFontSize = (textWidth: number) => {
        return Math.max(86, (screenWidth * 0.75 - textWidth) / 10);
    };

    return (
        <View
            style={styles.box}
            
        >
            <Text onLayout={(e) => handleTextLayout(e, setNameWidth)}>
                <FirstNameText
                    firstName={firstName}
                    setFirstName={setFirstName}
                    style={[styles.text, { fontSize: calculateFontSize(nameWidth) }]} />
                <Text style={[styles.text, { fontSize: calculateFontSize(nameWidth) }]}> </Text>
                <MiddleNameText
                    middleName={middleName}
                    setMiddleName={setMiddleName}
                    style={[styles.text, { fontSize: calculateFontSize(nameWidth) }]} />
                <Text style={[styles.text, { fontSize: calculateFontSize(nameWidth) }]}> </Text>
                <LastNameText
                    lastName={lastName}
                    setLastName={setLastName}
                    style={[styles.text, { fontSize: calculateFontSize(nameWidth) }]} />
            </Text>

        </View>
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
        // fontSize: 86,
    }

})