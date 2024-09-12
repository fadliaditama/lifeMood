import { Text, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import React, { useState } from 'react';
// import AsmaulHusna from "./components/asmaulHusna";
// import { SafeAreaView } from "react-native-safe-area-context";

const Index = () => {
  const[selectedValue, setSelectedValue] = useState(null);

  const placeholder = {
    label: 'Select an option...',
    value: null,
  };

  const options = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2' },
    { label: 'Option 3', value: 'option3' },
  ];
  return (
    <View className="flex-1">
      <View className="mt-10 items-center">
        <Text className="font-bold text-4xl">Life Mood</Text>
      </View>

      <View className="m-2">
        <Text className="">Apa perasaanmu hari ini?</Text>
        <RNPickerSelect
          placeholder={placeholder}
          items={options}
          onValueChange={(value) => setSelectedValue(value)}
          value={selectedValue}
        />
      </View>
    </View>
  );
}

export default Index;
