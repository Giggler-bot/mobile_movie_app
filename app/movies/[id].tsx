import { View, Text, Image, ScrollView } from "react-native";
import { useLocalSearchParams } from "expo-router";
import useFetch from "../(tabs)/services/useFetch";
import { fetchMoviesDetails } from "../(tabs)/services/api";
import { icons } from "@/constants/icons";

interface MovieInfoProps {
  label: string;
  value?: string | number | null
}

const MovieInfo = ({ label, value }: MovieInfoProps) => (
  <View className="flex-col items-start justify-center mt-5">
    <Text className=" font-normal text-sm text-light-200">{label}</Text>
    <Text className="text-light-100 font-bold text-sm mt-2"></Text>
  </View>
)


const MovieDetails = () => {
  const { id } = useLocalSearchParams();
  
  const { data: movie, loading } = useFetch(() => fetchMoviesDetails(id as string));

  return (
    <View className="bg-primary flex-1">
      <ScrollView contentContainerStyle={{
        paddingBottom: 80
      }}>
        <View>
          <Image 
            source={{uri: `https://image.tmdb.org/t/p/w500${movie?.poster_path}`}}
            className="w-full h-[500px]"
            resizeMode="stretch"
          />
          <View className="flex-col items-start justify-center mt-5 px-5">
            <Text className="text-white font-semibold">{movie?.title}</Text>
            <View className="flex-row items-center gap-x-1 mt-3">
              <Text className="text-light-200 text-sm">{movie?.release_date?.split('-')[0]}</Text>
              <Text className="text-light-200 text-sm">{movie ?.runtime}m</Text>
            </View>

            <View className="flex-row items-center bg-dark-100 px-2 py-1 rounded-md gap-x-1 mt-2">
              <Image 
                source={icons.star}
                className="size-4"
              />
              <Text className="text-white text-sm font-semibold">
                {Math.round(movie ?.vote_average ?? 0)}/10
              </Text>

              <Text className="text-light-200 text-sm">({movie?.vote_count} votes)</Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  )






} 

 