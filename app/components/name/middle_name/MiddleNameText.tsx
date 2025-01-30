import React from 'react';
import { View, Text, TextStyle } from 'react-native';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  middleName: string;
  setMiddleName: Dispatch<SetStateAction<string>>;  
  style?: TextStyle;
}

const MiddleNameText: React.FC<Props> = ({ middleName, setMiddleName, style }) => {

  return (
    <View>
      <Text style={style}>{middleName}</Text>
    </View>
  );
};

export default MiddleNameText;
