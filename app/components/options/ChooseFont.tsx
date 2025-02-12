import { Text, TouchableOpacity } from "react-native";
import React, { Dispatch, SetStateAction, useState } from 'react';
import Modal from "react-native-modal";
import styles from "./OptionsMenuStyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFont } from "@fortawesome/free-solid-svg-icons";
import DropDownPicker from "react-native-dropdown-picker";
import fontList from "@/app/constants/fontList";


interface Props {
    // setFirstName: Dispatch<SetStateAction<string>>;
    // setMiddleName: Dispatch<SetStateAction<string>>;
    // setLastName: Dispatch<SetStateAction<string>>;
    // setGender: Dispatch<SetStateAction<string>>;
    // fontsOpen: boolean;
    // setFontsOpen: Dispatch<SetStateAction<boolean>>;
    nameFont: string;
    setNameFont: Dispatch<SetStateAction<string>>;
}

const fontArray = Object.keys(fontList).map((key) => ({
    label: key,
    value: key,
}));

const ChooseFont: React.FC<Props>= ({
    // setFirstName, setMiddleName, setLastName, setGender, fontsOpen, setFontsOpen 
    nameFont, setNameFont
}) => {
    const [modalOpen, setModalOpen] = useState<boolean>(false);
    const [fontsOpen, setFontsOpen] = useState<boolean>(false);
    const [selectedFont, setSelectedFont] = useState<string>('Space Mono')

    return (
        <>
            <Modal
                isVisible={modalOpen}
                onBackdropPress={() => setModalOpen(false)}
            >
                <DropDownPicker
                    open={fontsOpen}
                    value={selectedFont}
                    items={fontArray}
                    setOpen={setFontsOpen}
                    setValue={setSelectedFont}
                    textStyle={{fontFamily: selectedFont}}
                    
                    renderListItem={(props) => {
                        const { item, onPress } = props;
                        return (
                            <TouchableOpacity
                                onPress={() => {
                                    setSelectedFont(String(item.value))
                                    setModalOpen(false)
                                    setFontsOpen(false)
                                    setNameFont(String(item.value))
                                    console.log(selectedFont)
                                }}
                                style={{
                                    padding: 10,
                                    borderBottomWidth: 1,
                                    borderBottomColor: "#ddd",
                                }}
                            >
                                <Text style={{ fontFamily: item.value, fontSize: 18, color: "black" }}>
                                    {item.label}
                                </Text>
                            </TouchableOpacity>
                        );
                    }}

                />
            </Modal>

            <TouchableOpacity style={styles.optionsMenuButton} onPress={() => setModalOpen(true)} >
                <FontAwesomeIcon style={styles.optionsMenuIcon} icon={faFont} />
            </TouchableOpacity>
        </>

    );
}

export default ChooseFont

// Font Picker Code from Chat
// import React, { useState } from "react";
// import { View, Text } from "react-native";
// import DropDownPicker from "react-native-dropdown-picker";
// import fontList from "../fontList"; // Import font list

// const FontPicker = () => {
//   const [open, setOpen] = useState(false);
//   const [selectedFont, setSelectedFont] = useState("Roboto-Regular");

//   return (
//     <View>
//       <DropDownPicker
//         open={open}
//         value={selectedFont}
//         items={fontList}
//         setOpen={setOpen}
//         setValue={setSelectedFont}
//       />
//       <Text style={{ fontFamily: selectedFont, fontSize: 20, marginTop: 20 }}>
//         This text uses {selectedFont}
//       </Text>
//     </View>
//   );
// };

// export default FontPicker;
