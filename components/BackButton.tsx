import React from 'react';
import { TouchableOpacity, Text} from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { Ionicons } from '@expo/vector-icons'; // Or use your preferred icon set

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => navigation.goBack()}
      className="flex-row items-center gap-2 px-4 py-2"
    >
      <Ionicons name="arrow-back" size={24} color="white" />
      <Text className="text-white text-base">Back</Text>
    </TouchableOpacity>
  );
};

export default BackButton;
