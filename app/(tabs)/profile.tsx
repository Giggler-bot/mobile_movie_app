import { View, Text, Image, ScrollView } from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';
import { images } from '@/constants/images';
import { icons } from '@/constants/icons';

const Profile = () => {
  const user = {
    name: 'Obed Giggler',
    email: 'obedmystero@gmail.com', 
  };

  return (
    <SafeAreaView className="flex-1 bg-primary">
      <ScrollView 
        className="flex-1 px-5"
        contentContainerStyle={{ paddingBottom: 40 }}
        showsVerticalScrollIndicator={false}
      >
        {/* App Logo */}
        <View className="flex-row justify-center items-center mt-6">
          <Image 
            source={icons.logo} 
            className="w-[160px] h-[55px]" 
            resizeMode="contain" 
          />
        </View>

        {/* Profile Picture & Info */}
        <View className="flex-col items-center mt-10">
          <View className="w-32 h-32 rounded-full border-4 border-secondary overflow-hidden shadow-lg">
            <Image
              source={images.hero}
              className="w-full h-full"
              resizeMode="cover"
            />
          </View>
          <Text className="text-white text-2xl font-bold mt-4">{user.name}</Text>
          <Text className="text-gray-400 text-sm">{user.email}</Text>
        </View>

        {/* Account Details */}
        <View className="mt-10">
          <Text className="text-white text-lg font-bold mb-3">Account Details</Text>
          <View className="bg-gray-800 p-5 rounded-xl shadow-md space-y-2">
            <Text className="text-gray-300">💎 Membership: Premium</Text>
            <Text className="text-gray-300">📦 Plan: Standard Plan</Text>
            <Text className="text-gray-300">📱 Devices: 3/5</Text>
          </View>
        </View>
        
        {/* My Watchlist */}
        <View className="mt-10">
          <Text className="text-white text-lg font-bold mb-3">My Watchlist</Text>
          <View className="bg-gray-800 p-5 rounded-xl shadow-md">
            <Text className="text-gray-300">
              Your watchlist is currently empty.
            </Text>
            {/* Later: FlatList with MovieCard components */}
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Profile;
