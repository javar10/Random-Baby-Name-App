import { Dispatch, SetStateAction, useState } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

interface Props {
    gender: string;
    setGender: Dispatch<SetStateAction<string>>;
}

const SelectGender: React.FC<Props> = ({ gender, setGender }) => {
    return (
        <View style={styles.container}>
            <TouchableOpacity
                style={[styles.button, {backgroundColor: '#FFD5E7'}]}
                onPress={() => setGender('girl')}
            >
                <Text style={styles.text}>Girl</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, {backgroundColor: '#BCF0FF'}]}
                onPress={() => setGender('boy')}
            >
                <Text style={styles.text}>Boy</Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={[styles.button, {backgroundColor: '#DFEFDF'}]}
                onPress={() => setGender('neutral')}
            >
                <Text style={styles.text}>Unisex</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-evenly',
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