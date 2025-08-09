import { Text, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { Link } from 'expo-router'



const TrendingMovies = ({ movie: { movie_id, title, poster_url }, index}: TrendingCardProps) => {
  return (
   <Link href={`/movies/${movie_id}`} asChild>
    <TouchableOpacity className='w-32 relative pl-5'>
      <Image 
        source={{ uri: poster_url}}
        className='w-32 h-48 rounded-lg'
        resizeMode='cover'
      />
      <Text className='text-sm font-bold mt-2 text-blue-200' numberOfLines={2}> {title}</Text>
    </TouchableOpacity>
   </Link>

  )
}

export default TrendingMovies