import { Client, Databases, Query, ID } from "react-native-appwrite";
import { APPWRITE_CONFIG } from './appwriteConfig';

const database = new Databases(
  new Client()
    .setEndpoint(APPWRITE_CONFIG.endpoint)
    .setProject(APPWRITE_CONFIG.projectId)
);

export const SearchCount = async (query: string, movie: Movie) => {
//   console.log("Using DB:", APPWRITE_CONFIG.databaseId);
//   console.log("Using Collection:", APPWRITE_CONFIG.collectionId);
  
  try {
    const result = await database.listDocuments(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.collectionId,
      [Query.equal('searchTerm', query)]
    );

    if (result.documents.length > 0) {
      const existing = result.documents[0];

      await database.updateDocument(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.collectionId,
        existing.$id,
        {
          count: existing.count + 1,
        }
      );
    } else {
      await database.createDocument(
        APPWRITE_CONFIG.databaseId,
        APPWRITE_CONFIG.collectionId,
        ID.unique(),
        {
          searchTerm: query,
          movie_id: movie.id,
          count: 1,
          title: movie.title,
          poster_url: `https://image.tmdb.org/t/p/w500${movie.poster_path}`,
        }
      );
    }
  } catch (error) {
    console.error("Failed to track search:", error);
  }
}

export const getTrendingMovies = async (): Promise<TrendingMovie[] | undefined> => {
    try {
      const result = await database.listDocuments(
      APPWRITE_CONFIG.databaseId,
      APPWRITE_CONFIG.collectionId,
      [Query.limit(5),
      Query.orderDesc('count')
    ]);

    return result.documents as unknown as TrendingMovie[]

    } catch(error) {
        console.log(error);
        return undefined
        
    }
}