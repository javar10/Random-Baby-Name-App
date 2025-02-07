import { Dispatch, SetStateAction, useState } from "react";
import { Text, View, StyleSheet, Dimensions, TouchableOpacity } from "react-native";

interface Props {
    gender: string;
    setGender: Dispatch<SetStateAction<string>>;
}

const SelectGender: React.FC<Props> = ({gender, setGender }) => {
    return (
        <View>
            <TouchableOpacity
                onPress={() => setGender('girl')}
            >
                <Text>Girl</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setGender('boy')}
            >
                <Text>Boy</Text>
            </TouchableOpacity>
            <TouchableOpacity
                onPress={() => setGender('neutral')}
            >
                <Text>Gender Neutral</Text>
            </TouchableOpacity>
        </View>
    )
}


const styles = StyleSheet.create({

})

export default SelectGender