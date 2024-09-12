import { Text, View } from "react-native";
import RNPickerSelect from 'react-native-picker-select';
import React, { useState, useMemo } from 'react';
import dataLifesaver from '../data_lifesaver.json';

interface VerseInfo {
  verse: string;
  source: string;
}

const LifeMood = () => {
  const [selectedVerseInfo, setSelectedVerseInfo] = useState<VerseInfo | null>(null);

  const placeholder = {
    label: 'Pilih opsi...',
    value: null,
  };

  // Mengelompokkan mood yang unik dan menyimpan verse serta source yang sesuai
  const moodVersesMap = useMemo(() => {
    const map = new Map<string, VerseInfo[]>();
    dataLifesaver.verses.forEach(item => {
      const moods = item.mood || item.moods || '';
      const verseInfo = { verse: item.verse, source: item.source };
      if (typeof moods === 'string') {
        if (!map.has(moods)) map.set(moods, []);
        map.get(moods)!.push(verseInfo);
      } else if (Array.isArray(moods)) {
        (moods as string[]).forEach(mood => {
          if (!map.has(mood)) map.set(mood, []);
          map.get(mood)!.push(verseInfo);
        });
      }
    });
    return map;
  }, []);

  const options = useMemo(() => {
    return Array.from(moodVersesMap.keys()).map(mood => ({
      label: mood,
      value: mood,
    }));
  }, [moodVersesMap]);

  const getRandomVerse = (mood: string) => {
    const verses = moodVersesMap.get(mood);
    if (verses && verses.length > 0) {
      const randomIndex = Math.floor(Math.random() * verses.length);
      return verses[randomIndex];
    }
    return null;
  };

  return (
    <View className="flex-1 bg-white">
      <View className="mt-10 items-center">
        <Text className="font-bold text-4xl">MoodHadith</Text>
      </View>

      <View className="m-4">
        <Text className="">Apa perasaanmu hari ini?</Text>
        <View className="mt-3">
        <View className="border border-gray-300 rounded-lg">
          <RNPickerSelect
            placeholder={placeholder}
            items={options}
            onValueChange={(value) => {
              if (value) {
                const randomVerse = getRandomVerse(value);
                setSelectedVerseInfo(randomVerse);
              } else {
                setSelectedVerseInfo(null);
              }
            }}
            value={selectedVerseInfo ? selectedVerseInfo.verse : null}
          />
        </View>
          
        </View>
        {selectedVerseInfo && (
          <View className="mt-4">
            <Text>Ayat terpilih: {selectedVerseInfo.verse}</Text>
            <Text>Sumber: {selectedVerseInfo.source}</Text>
          </View>
        )}
      </View>

      <View className='absolute inset-x-0 bottom-0'>
        <Text className='text-center text-xs'>
          Created By <Text className='text-blue-500'>@Fadliaditama</Text>
        </Text>
      </View>
    </View>

  );
}

export default LifeMood;
