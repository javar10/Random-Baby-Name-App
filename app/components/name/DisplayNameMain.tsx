import { StyleSheet, View, ImageBackground } from "react-native";
import BabyName from "../name/BabyName";
import { useState, Dispatch, SetStateAction } from "react";
import React from "react";
import OptionsMenu from "../options/OptionsMenu";

interface Props {
    firstName: string;
    setFirstName: Dispatch<SetStateAction<string>>;
    middleName: string;
    setMiddleName: Dispatch<SetStateAction<string>>;
    lastName: string;
    setLastName: Dispatch<SetStateAction<string>>;
    gender: string;
    setGender: Dispatch<SetStateAction<string>>;
}

const DisplayNameMain: React.FC<Props> = ({
    firstName,
    setFirstName,
    middleName,
    setMiddleName,
    lastName,
    setLastName,
    gender,
    setGender,
}) => {
    const [nameFont, setNameFont] = useState<string>('Roboto');

    const defaultBackground = require("../../../assets/images/clouds.png");
    const girlBackground = require("../../../assets/images/girl-background.png");
    const boyBackground = require("../../../assets/images/boy-background.png");
    const neutralBackground = require("../../../assets/images/neutral-background.png");

    return (
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
                        nameFont={nameFont}
                    />
                    <OptionsMenu
                        firstName={firstName}
                        setFirstName={setFirstName}
                        middleName={middleName}
                        setMiddleName={setMiddleName}
                        lastName={lastName}
                        setLastName={setLastName}
                        gender={gender}
                        setGender={setGender}
                        nameFont={nameFont}
                        setNameFont={setNameFont}
                    />
                </View>
            </View>
        </ImageBackground>

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

export default DisplayNameMain