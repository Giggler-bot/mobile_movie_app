// app/(tabs)/saved.tsx
import React, { useEffect, useState } from "react";
import { View, Text, FlatList, Image, TouchableOpacity } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface Movie {
  id: number;
  title: string;
  poster_path: string;
}

export default function Saved() {
  const [savedMovies, setSavedMovies] = useState<Movie[]>([]);

  // Load saved movies from storage
  const loadSavedMovies = async () => {
    try {
      const stored = await AsyncStorage.getItem("savedMovies");
      if (stored) {
        setSavedMovies(JSON.parse(stored));
      }
    } catch (error) {
      console.error("Error loading saved movies", error);
    }
  };

  // Remove a movie from saved list
  const removeFromSaved = async (id: number) => {
    const updated = savedMovies.filter((movie) => movie.id !== id);
    setSavedMovies(updated);
    await AsyncStorage.setItem("savedMovies", JSON.stringify(updated));
  };

  useEffect(() => {
    loadSavedMovies();
  }, []);

  if (savedMovies.length === 0) {
    return (
      <View className="flex-1 justify-center items-center bg-primary">
        <Text className="text-white text-lg">No saved movies yet 📌</Text>
      </View>
    );
  }

  return (
    <View className="flex-1 bg-primary px-4 pt-6">
      <Text className="text-white text-2xl font-bold mb-4">Saved Movies</Text>
      <FlatList
        data={savedMovies}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View className="flex-row items-center bg-secondary rounded-lg mb-4 p-3">
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              className="w-16 h-24 rounded-md"
            />
            <View className="flex-1 ml-4">
              <Text className="text-white text-lg font-semibold">{item.title}</Text>
            </View>
            <TouchableOpacity onPress={() => removeFromSaved(item.id)}>
              <Text className="text-red-400 font-bold">Remove</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}
