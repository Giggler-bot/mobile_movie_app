import { icons } from "@/constants/icons";
import { router, useLocalSearchParams } from "expo-router";
import { ActivityIndicator, Image, ScrollView, Text, TouchableOpacity, View } from "react-native";
import { fetchMoviesDetails } from "../../services/api";
import useFetch from "../../services/useFetch";

interface MovieInfoProps {
  label: string;
  value?: string | number | null;
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className="font-normal text-sm text-light-200">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2">
      {value || "N/A"}
    </Text>
  </View>
);

const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  const { data: movie, loading } = useFetch(() => fetchMoviesDetails(id as string));

  if (loading) {
    return (
      <View className="flex-1 items-center justify-center bg-primary">
        <ActivityIndicator size="large" color="#E50914" />
      </View>
    );
  }

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{ paddingBottom: 100 }}>
        {/* Hero Section */}
        <View className="relative w-full h-[500px]">
          <Image
            source={{ uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}` }}
            className="w-full h-full"
            resizeMode="cover"
          />
          <View className="absolute inset-0 bg-gradient-to-b from-transparent to-primary" />
        </View>

        {/* Movie Info */}
        <View className="px-5 mt-[-60px]">
          <Text className="text-white text-3xl font-bold">{movie?.title}</Text>

          {/* Meta Info */}
          <View className="flex-row items-center gap-x-4 mt-3">
            <MovieInfo label="Release Year" value={movie?.release_date?.split("-")[0]} />
            <MovieInfo label="Runtime" value={`${movie?.runtime}m`} />
            <MovieInfo label="Rating" value={`${Math.round(movie?.vote_average ?? 0)}/10`} />
          </View>

          {/* Action Buttons */}
          <View className="flex-row gap-x-3 mt-5">
            <TouchableOpacity className="bg-accent px-5 py-3 rounded-lg flex-row items-center justify-center flex-1">
              <Image source={icons.play} className="size-5 mr-2" tintColor="#fff" />
              <Text className="text-white font-semibold">Play</Text>
            </TouchableOpacity>
          </View>

          {/* Overview */}
          <MovieInfo label="Overview" value={movie?.overview} />

          {/* Genres */}
          <MovieInfo label="Genres" value={movie?.genres?.map((g) => g.name).join(" • ")} />

          {/* Popularity & Country */}
          <MovieInfo label="Popularity" value={movie?.popularity} />
          <MovieInfo
            label="Production Countries"
            value={movie?.production_countries?.map((c) => c.name).join(", ")}
          />
        </View>
      </ScrollView>

      {/* Back Button */}
      <TouchableOpacity
        className="absolute top-10 left-5 bg-black/50 p-3 rounded-full"
        onPress={router.back}
      >
        <Image source={icons.arrow} className="size-5 rotate-180" tintColor="#fff" />
      </TouchableOpacity>
    </View>
  );
};

export default MovieDetails;
