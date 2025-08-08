import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  Image,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import { images } from '@/constants/images';
import { fetchMovies } from './services/api';
import useFetch from './services/useFetch';
import MovieCard from '@/components/MovieCard';
import { icons } from '@/constants/icons';
import SearchBar from '@/components/SearchBar';
import { SearchCount } from './services/TrackSearches';

const Search = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [debouncedQuery, setDebouncedQuery] = useState('');

  const {
    data: movies,
    loading,
    error,
    refetch: loadMovies,
    reset,
  } = useFetch(() => fetchMovies({ query: debouncedQuery }), false);

    // 👇 Debounce logic
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 500); // delay in ms

    return () => clearTimeout(handler); // clean up previous timeout
  }, [searchQuery]);

  // 👇 Trigger fetch when debouncedQuery changes
  useEffect(() => {
    if (debouncedQuery.trim()) {
      loadMovies();
    } else {
      reset();
    }
  }, [debouncedQuery]);

  useEffect(() => {
      if(movies ?. length > 0 &&  movies ?.[0]){
        SearchCount(debouncedQuery, movies[0])
      }
  })


   
  return (
    <View className="flex-1 bg-primary">
      <Image
        source={images.bg}
        className="absolute w-full h-full z-0"
        resizeMode="cover"
      />

      <FlatList
        data={movies}
        renderItem={({ item }) => <MovieCard {...item} />}
        keyExtractor={(item) => item.id.toString()}
        className="px-5"
        numColumns={3}
        columnWrapperStyle={{
          justifyContent: 'center',
          gap: 16,
          marginVertical: 16,
        }}
        contentContainerStyle={{ paddingBottom: 100 }}
        ListHeaderComponent={
          <>
            {/* Logo */}
            <View className="w-full flex-row justify-center mt-20">
              <Image
                source={icons.logo}
                style={{ width: 180, height: 62, marginTop: 20, marginBottom: 20 }}
              />
            </View>

            {/* SearchBar */}
            <View className="my-5 px-5">
              <SearchBar 
              placeholder="Search movies here" 
              value={searchQuery}
              onChangeText={(text) => setSearchQuery(text)}
              />
            </View>

            {/* Loading */}
            {loading && (
              <ActivityIndicator
                size="large"
                color="#0000ff"
                className="my-3"
              />
            )}

            {/* Error */}
            {error && (
              <Text className="text-red-500 px-5 my-3">
                Error: {error.message}
              </Text>
            )}

             {/* Search Results Header */}
            {!loading && !error && debouncedQuery.trim()
              && movies?.length > 0 && (
              <Text className="text-white font-bold px-5">
                Showing Results for {''}
                <Text className='text-accent'>{debouncedQuery}</Text>
              </Text>
            )}
          </>
        }
        ListEmptyComponent={
          !loading && !error ? (
            <View className='mt-10 px-5'>
              <Text className='text-center text-blue-500'>
                {searchQuery.trim() ? 'No movies found' : 'Search for a movie'}
              </Text>
            </View>
          ) : null
        }
        
      />
    </View>
  );
};

export default Search;
