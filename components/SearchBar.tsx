import { View, TextInput, Image, TouchableOpacity } from 'react-native'
import { icons } from '@/constants/icons'
import React from 'react'

interface Props {
  placeholder: string;
  onPress?: () => void;
  value?: string;
  onChangeText?: (text: string) => void;
}

const SearchBar = ({ placeholder, onPress, value, onChangeText }: Props) => {
  return (
    <TouchableOpacity onPress={onPress} activeOpacity={1}>
      <View className='flex-row items-center bg-dark-200 rounded-full px-5 py-4'>
        <Image source={icons.search} className='size-5' resizeMode='contain' tintColor='#ab8bff' />
        <TextInput
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          editable={!onPress}
          placeholderTextColor="#a8b5db"
          className='flex-1 ml-2 text-white'
        />
      </View>
    </TouchableOpacity>
  );
};

export default SearchBar;
