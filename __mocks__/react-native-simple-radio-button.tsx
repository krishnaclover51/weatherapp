import { Text, TouchableOpacity } from 'react-native';

import React from 'react';

// Mock for RadioButtonInput
export const RadioButtonInput = ({ obj, index, isSelected, onPress }: any) => {
  return (
    <TouchableOpacity onPress={() => onPress(index)} testID={`radio-input-${index}`}>
      <Text>{`${obj?.label} ${isSelected ? '[X]' : '[ ]'}`}</Text>
    </TouchableOpacity>
  );
};

// Mock for RadioButtonLabel
export const RadioButtonLabel = ({ obj, index, onPress }: any) => {
  return (
    <TouchableOpacity onPress={() => onPress(index)} testID={`radio-label-${index}`}>
      <Text>{obj?.label}</Text>
    </TouchableOpacity>
  );
};

export default RadioButtonInput;
