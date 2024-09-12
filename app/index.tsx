import { Text, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import React, { useState, useMemo } from 'react';
import dataLifesaver from './../data_lifesaver.json';

const Index = () => {
  const [selectedVerseInfo, setSelectedVerseInfo] = useState(null);

  const placeholder = {
    label: 'Pilih opsi...',
    value: null,
  };

  // Mengelompokkan mood yang unik dan menyimpan verse serta source yang sesuai
  const options = useMemo(() => {
    const moodVerseMap = new Map();
    dataLifesaver.verses.forEach(item => {
      const moods = item.mood || item.moods || '';
      const verseInfo = { verse: item.verse, source: item.source };
      if (typeof moods === 'string') {
        moodVerseMap.set(moods, verseInfo);
      } else if (Array.isArray(moods)) {
        (moods as string[]).forEach(mood => moodVerseMap.set(mood, verseInfo));
      }
    });

    return Array.from(moodVerseMap).map(([mood, verseInfo]) => ({
      label: typeof mood === 'string' ? mood : String(mood),
      value: verseInfo,
    }));
  }, []);

  return (
    <View className="flex-1 bg-white">
      <View className="mt-10 items-center">
        <Text className="font-bold text-4xl">Life Mood</Text>
      </View>

      <View className="m-4">
        <Text className="">Apa perasaanmu hari ini?</Text>
        <View className="border border-gray-300 rounded-lg">
        <RNPickerSelect 
          placeholder={placeholder}
          items={options}
          onValueChange={(value) => setSelectedVerseInfo(value)}
          value={selectedVerseInfo}
        />
        </View>
        {selectedVerseInfo && (
          <View>
            <Text>Ayat terpilih: {selectedVerseInfo.verse}</Text>
            <Text>Sumber: {selectedVerseInfo.source}</Text>
          </View>
        )}
      </View>
    </View>
  );
}

export default Index;
