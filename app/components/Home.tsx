import { StyleSheet, View, ImageBackground } from "react-native";
import { useState } from "react";
import SelectGender from "./SelectGender";
import React from "react";
import ViewFavorites from "./favorites/ViewFavorites";
import DisplayNameMain from "./name/DisplayNameMain";

const Home = () => {
    const [firstName, setFirstName] = useState<string>('First');
    const [middleName, setMiddleName] = useState<string>('Middle');
    const [lastName, setLastName] = useState<string>('Last');
    const [gender, setGender] = useState<string>('');
    const [viewFavorites, setViewFavorites] = useState<boolean>(false)

    const defaultBackground = require("../../assets/images/clouds.png");

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
                            <ViewFavorites
                                setViewFavorites={setViewFavorites}
                                setFirstName={setFirstName}
                                setMiddleName={setMiddleName}
                                setLastName={setLastName}
                                setGender={setGender}
                            />
                        </View>
                    </View>
                </ImageBackground>

            }

            {gender &&
                <DisplayNameMain
                    firstName={firstName}
                    setFirstName={setFirstName}
                    middleName={middleName}
                    setMiddleName={setMiddleName}
                    lastName={lastName}
                    setLastName={setLastName}
                    gender={gender}
                    setGender={setGender}
                />
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