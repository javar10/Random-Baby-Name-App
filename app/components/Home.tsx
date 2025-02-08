import { StyleSheet, Text, TouchableOpacity, View, ImageBackground } from "react-native";
import BabyName from "./name/BabyName";
import { useEffect, useState } from "react";
import SelectGender from "./SelectGender";
import React from "react";
import StartOver from "./options/StartOver";
import SendName from "./options/ShareName";
import OptionsMenu from "./options/OptionsMenu";

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
                            <OptionsMenu
                                firstName={firstName}
                                setFirstName={setFirstName}
                                middleName={middleName}
                                setMiddleName={setMiddleName}
                                lastName={lastName}
                                setLastName={setLastName}
                                setGender={setGender}
                            />
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
        position: 'absolute',
        width: "100%",
        height: "100%",
        flex: 1
    },
    content: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },

})