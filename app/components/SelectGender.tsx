import { Dispatch, SetStateAction, useState } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
import ViewFavorites from "./ViewFavorites";
import AddToFavorites from "./options/AddToFavorites";
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
                    <Text style={styles.text}>Girl</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#BCF0FF' }]}
                    onPress={() => setGender('boy')}
                >
                    <Text style={styles.text}>Boy</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.buttonGrid}>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: '#DFEFDF' }]}
                    onPress={() => setGender('neutral')}
                >
                    <Text style={styles.text}>Gender Neutral</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    style={[styles.button, { backgroundColor: 'white' }]}
                    onPress={() => setViewFavorites(!viewFavorites)}>
                    <Text style={styles.text}>View Favorites</Text>
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
        // paddingHorizontal: 20,
        // flexDirection: 'row'
    },
    buttonGrid: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        // width: '80%',
    },
    button: {
        width: 150,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        margin: 15,
        borderWidth: 2,
        borderColor: "#F0F0F0",
        // backgroundColor: "#ffffff",
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
    }

})

export default SelectGender