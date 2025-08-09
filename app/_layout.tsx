// import { Stack } from "expo-router";
// import { StatusBar } from "react-native";
// import './globals.css'

// export default function RootLayout() {
//   return (
//     <>
//       <StatusBar hidden={true} />
      
//       <Stack>
//         <Stack.Screen 
//           name="(tabs)"
//           options={{ headerShown: false }}
//         />
//         <Stack.Screen 
//           name="movies/[id]"
//           options={{ headerShown: false }}
//         />
//       </Stack>
//     </>
//   );
// }

import { Stack } from "expo-router";
import { StatusBar } from "react-native";
import { SavedProvider } from "../context/SavedContext"; // ✅ make sure path is correct
import './globals.css';

export default function RootLayout() {
  return (
    <SavedProvider>
      <StatusBar hidden={true} />
      
      <Stack>
        <Stack.Screen 
          name="(tabs)"
          options={{ headerShown: false }}
        />
        <Stack.Screen 
          name="movies/[id]"
          options={{ headerShown: false }}
        />
      </Stack>
    </SavedProvider>
  );
}
