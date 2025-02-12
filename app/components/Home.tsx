import { StyleSheet, View, ImageBackground } from "react-native";
import BabyName from "./name/BabyName";
import { useState } from "react";
import SelectGender from "./SelectGender";
import React from "react";
import OptionsMenu from "./options/OptionsMenu";
import ViewFavorites from "./favorites/ViewFavorites";

const Home = () => {
    const [gender, setGender] = useState<string>('');

    const [firstName, setFirstName] = useState<string>('First');
    const [middleName, setMiddleName] = useState<string>('Middle');
    const [lastName, setLastName] = useState<string>('Last');

    const defaultBackground = require("../../assets/images/clouds.png");
    const girlBackground = require("../../assets/images/girl-background.png");
    const boyBackground = require("../../assets/images/boy-background.png");
    const neutralBackground = require("../../assets/images/neutral-background.png");

    const [viewFavorites, setViewFavorites] = useState<boolean>(false)

    const [nameFont, setNameFont] = useState<string>('Roboto');

    return (
        <>
            {!gender && !viewFavorites &&
                <ImageBackground
                    source={defaultBackground}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <View style={styles.container}>
                        <View style={styles.content}>
                            <SelectGender 
                            gender={gender} 
                            setGender={setGender} 
                            viewFavorites={viewFavorites} 
                            setViewFavorites={setViewFavorites} />
                        </View>
                    </View>
                </ImageBackground>
            }

            {viewFavorites &&
                <ImageBackground
                    source={defaultBackground}
                    style={styles.backgroundImage}
                    resizeMode="cover"
                >
                    <View style={styles.container}>
                        <View style={styles.content}>
                            <ViewFavorites setViewFavorites={setViewFavorites} />
                        </View>
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
                                setNameFont={setNameFont}
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

export default Home