import { Dispatch, SetStateAction, useState } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import ViewFavorites from "./favorites/ViewFavorites";
import AddToFavorites from "./options/AddToFavorites";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHeart, faMars, faVenus, faVenusMars } from "@fortawesome/free-solid-svg-icons";
// import backgroundImage from '../../assets/images/clouds.png';

interface Props {
    gender: string;
    setGender: Dispatch<SetStateAction<string>>;
    viewFavorites: boolean;
    setViewFavorites: Dispatch<SetStateAction<boolean>>;
}

const SelectGender: React.FC<Props> = ({ gender, setGender, viewFavorites, setViewFavorites }) => {

    return (
        <View style={styles.container}>
            <View style={styles.buttonGrid}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#FFD5E7' }]}
                    onPress={() => setGender('girl')}
                >
                    <FontAwesomeIcon style={styles.icon} icon={faVenus} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#BCF0FF' }]}
                    onPress={() => setGender('boy')}
                >
                    <FontAwesomeIcon style={styles.icon} icon={faMars} />
                </TouchableOpacity>
            </View>

            <View style={styles.buttonGrid}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#DFEFDF' }]}
                    onPress={() => setGender('neutral')}
                >
                    <FontAwesomeIcon style={styles.icon} icon={faVenusMars} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#E0E0E0' }]}
                    onPress={() => setViewFavorites(!viewFavorites)}
                >
                    <FontAwesomeIcon style={styles.icon} icon={faHeart} />
                </TouchableOpacity>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
    },
    button: {
        width: 150,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        borderWidth: 2,
        borderColor: "#F0F0F0",
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
        fontSize: 32,
        textAlign: 'center'
    },
    icon: {
        padding: 48,
        color: "white",
    }

})

export default SelectGender