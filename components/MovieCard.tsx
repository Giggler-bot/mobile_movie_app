import { View, Text, TouchableOpacity, Image } from "react-native";
import React from "react";
import { Link } from "expo-router";
import { icons } from "@/constants/icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useSaved } from "@/context/SavedContext";

const GENRE_MAP: Record<number, string> = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

const MovieCard = (movie: Movie) => {
  const { saved, setSaved } = useSaved(); // ✅ get saved state from context

  const posterUrl = movie.poster_path
    ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
    : "https://placehold.co/600x400/1a1a1a/ffffff.png?text=No+Image";

  const releaseYear = movie.release_date?.split("-")[0];
  const starRating = (movie.vote_average / 2).toFixed(1);

  const saveMovie = async (movie: Movie) => {
    try {
      const exists = saved.some((m: Movie) => String(m.id) === String(movie.id));
      if (!exists) {
        const updated = [...saved, movie];
        setSaved(updated); // ✅ update state
        await AsyncStorage.setItem("savedMovies", JSON.stringify(updated));
      }
    } catch (error) {
      console.error("Error saving movie", error);
    }
  };

  return (
    <Link href={`/movies/${movie.id}`} asChild>
      <TouchableOpacity className="w-[30%] mb-4 relative">
        {/* Poster */}
        <Image
          source={{ uri: posterUrl }}
          className="w-full h-48 rounded-md"
          resizeMode="cover"
        />

        {/* Save Button */}
        <TouchableOpacity
          className="absolute top-2 right-2 z-10"
          onPress={() => saveMovie(movie)} // ✅ pass full movie
        >
          <Image source={icons.save} className="w-4 h-4 opacity-80" />
        </TouchableOpacity>

        {/* Title */}
        <Text className="text-sm font-bold text-white mt-2" numberOfLines={1}>
          {movie.title}
        </Text>

        {/* Rating */}
        <View className="flex-row items-center gap-x-1 mt-1">
          <Image source={icons.star} className="w-4 h-4" />
          <Text className="text-xs text-white font-bold">{starRating} ★</Text>
        </View>

        {/* Release Year */}
        <Text className="text-xs text-light-200 font-medium mt-1">
          {releaseYear}
        </Text>

        {/* Genres */}
        <View className="flex-row flex-wrap gap-1 mt-1">
          {movie.genre_ids.slice(0, 2).map((id) => (
            <Text
              key={id}
              className="text-[10px] text-gray-400 bg-dark-700 px-1 py-[1px] rounded"
            >
              {GENRE_MAP[id]}
            </Text>
          ))}
        </View>

        {/* Overview */}
        <Text className="text-[10px] text-gray-300 mt-1" numberOfLines={2}>
          {movie.overview}
        </Text>
      </TouchableOpacity>
    </Link>
  );
};

export default MovieCard;
