import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from "react-native";
import BabyName from "./name/BabyName";
import { useEffect, useState } from "react";
import SelectGender from "./SelectGender";
import React from "react";

export default function Home() {
    const [gender, setGender] = useState<string>('');

    const [firstName, setFirstName] = useState<string>('First');
    const [middleName, setMiddleName] = useState<string>('Middle');
    const [lastName, setLastName] = useState<string>('Last');

    const defaultBackground = require("../../assets/images/clouds.png");
    const girlBackground = require("../../assets/images/girl-background.png");
    const boyBackground = require("../../assets/images/boy-background.png");
    const neutralBackground = require("../../assets/images/neutral-background.png");

    const resetName = () => {
        setFirstName('First');
        setMiddleName('Middle');
        setLastName('Last');
        setGender('');
    }

    return (
        <>
            {!gender &&
                <ImageBackground
                    source={defaultBackground}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <View style={styles.container}>
                        <SelectGender gender={gender} setGender={setGender} />

                    </View>
                </ImageBackground>
            }

            {gender &&
                <ImageBackground
                    source={
                        gender === 'girl' ? girlBackground
                            : gender === 'boy' ? boyBackground
                                : gender === 'neutral' ? neutralBackground
                                    : defaultBackground}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <View style={styles.container}>
                        <View style={styles.content}>
                            <BabyName
                                firstName={firstName}
                                setFirstName={setFirstName}
                                middleName={middleName}
                                setMiddleName={setMiddleName}
                                lastName={lastName}
                                setLastName={setLastName}
                                gender={gender}
                            />
                            <View style={styles.optionsMenu}>
                                <TouchableOpacity style={styles.optionsMenuButton} onPress={resetName} >
                                    <Text style={styles.optionsMenuButtonText}>Start Over</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </ImageBackground>
            }
        </>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: "100%",
        height: "100%",
    },
    backgroundImage: {
        width: "100%",
        height: "100%",
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
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