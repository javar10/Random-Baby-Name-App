import { Dispatch, SetStateAction, useState } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity, ImageBackground } from "react-native";
// import backgroundImage from '../../assets/images/clouds.png';

interface Props {
    gender: string;
    setGender: Dispatch<SetStateAction<string>>;
}

const SelectGender: React.FC<Props> = ({ gender, setGender }) => {
    return (


        <View style={styles.container}>
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
            <TouchableOpacity
                style={[styles.button, { backgroundColor: '#DFEFDF' }]}
                onPress={() => setGender('neutral')}
            >
                <Text style={styles.text}>Gender Neutral</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 20
    },
    button: {
        width: 150,
        aspectRatio: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 50,
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
    }

})

export default SelectGender