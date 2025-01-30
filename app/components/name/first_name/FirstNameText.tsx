import React from 'react';
import { View, Text, TextStyle } from 'react-native';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  firstName: string;
  setFirstName: Dispatch<SetStateAction<string>>;  
  style?: TextStyle;
}

const FirstNameText: React.FC<Props> = ({ firstName, setFirstName, style }) => {

  return (
    <View>
      <Text style={style}>{firstName}</Text>
    </View>
  );
};

export default FirstNameText;
