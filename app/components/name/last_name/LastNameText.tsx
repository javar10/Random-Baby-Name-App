import React from 'react';
import { View, Text, TextStyle } from 'react-native';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  lastName: string;
  setLastName: Dispatch<SetStateAction<string>>;  
  style?: TextStyle | TextStyle[];
}

const LastNameText: React.FC<Props> = ({ lastName, setLastName, style }) => {
  
  return (
    <View>
      <Text style={style}>{lastName}</Text>
    </View>
  );
};

export default LastNameText;
