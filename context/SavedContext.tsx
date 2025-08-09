// context/SavedContext.tsx
import React, { createContext, useState, useEffect, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";



export interface SavedContextType {
  saved: Movie[];
  setSaved: React.Dispatch<React.SetStateAction<Movie[]>>;
  saveMovie: (movie: Movie) => Promise<void>;
  removeMovie: (id: number) => Promise<void>;
}

export const useSaved = () => {
  const context = useContext(SavedContext);
  if (!context) {
    throw new Error("useSaved must be used within a SavedProvider");
  }
  return context;
};

export const SavedContext = createContext<SavedContextType | undefined>(undefined);

export const SavedProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [saved, setSaved] = useState<Movie[]>([]);

  useEffect(() => {
    const loadSaved = async () => {
      const stored = await AsyncStorage.getItem("savedMovies");
      if (stored) setSaved(JSON.parse(stored));
    };
    loadSaved();
  }, []);

  const saveMovie = async (movie: Movie) => {
    const exists = saved.some((m) => m.id === movie.id);
    if (!exists) {
      const updated = [...saved, movie];
      setSaved(updated);
      await AsyncStorage.setItem("savedMovies", JSON.stringify(updated));
    }
  };

  const removeMovie = async (id: number) => {
    const updated = saved.filter((m) => m.id !== id);
    setSaved(updated);
    await AsyncStorage.setItem("savedMovies", JSON.stringify(updated));
  };

  return (
    <SavedContext.Provider value={{ saved, setSaved, saveMovie, removeMovie }}>
      {children}
    </SavedContext.Provider>
  );
};
