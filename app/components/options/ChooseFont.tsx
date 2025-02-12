import { TouchableOpacity } from "react-native";
import { Dispatch, SetStateAction } from 'react';
import styles from "./OptionsMenuStyles";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faFont } from "@fortawesome/free-solid-svg-icons";

interface Props {
    setFirstName: Dispatch<SetStateAction<string>>;
    setMiddleName: Dispatch<SetStateAction<string>>;
    setLastName: Dispatch<SetStateAction<string>>;
    setGender: Dispatch<SetStateAction<string>>;
}

const ChooseFont: React.FC<Props> = ({ setFirstName, setMiddleName, setLastName, setGender }) => {

    const chooseFont = () => {
       console.log('choose font')
    }

    return (
        <TouchableOpacity style={styles.optionsMenuButton} onPress={chooseFont} >
            <FontAwesomeIcon style={styles.optionsMenuIcon} icon={faFont}/>
        </TouchableOpacity>
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
