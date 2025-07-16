Pokemon React Native App
A React Native application that allows users to search, browse, and explore Pokemon using the PokéAPI. Built with TypeScript and modern React Native development practices.

Features

Search Pokemon - Search for Pokemon by name. This search will return the first 21 matches and can be refined by typing more characters. If developed further, pagination could be added for this, or a filter system to filter by type, abilities, etc.
Pokemon Details - View comprehensive Pokemon information including:

- Name, height, weight, and species
- Base stats (HP, Attack, Defense, etc.)
- Pokemon sprites
- Number of games the Pokemon has appeared in

If developed further, links to related pokemon (evolution, pre-evolution, etc.) could be added.


Tech Stack
- React Native 
- TypeScript
- Expo 
- React Navigation - Navigation between screens
- AsyncStorage - Local data persistence
- PokéAPI - Pokemon data source

Prerequisites
Before running this app, make sure you have:

Node.js (v16 or higher)
npm or yarn
Expo CLI (or use npx)
iOS Simulator (for iOS testing) or Android Studio (for Android testing)
Expo Go app on your physical device (optional)

Installation

Clone the repository
https://github.com/Ben-Cor/pokeApi-react-native
Navigate to the project directory
cd pokeApi-react-native
Install dependencies
npm install
or
yarn install
Start the development server
npx expo start
or
yarn start
Open the app in your preferred environment
For iOS, press 'i' in the terminal or use the Expo Go app.
For Android, press 'a' in the terminal or use the Expo Go app.

Tests
Basic testing has been setup using React Native Testing Library. To run tests, use the following command:
npm test

File Sturcture
The project structure is organized as follows:
```
├── app/ - Contains the main application code
│   ├── _layout.tsx - Layout component for navigation
│   ├── index.tsx - Home screen with search functionality
│   ├── pokemon/ - Contains Pokemon details screen
│   │   └── [id].tsx - Dynamic route for displaying Pokemon details
│   ├── favorites.tsx - Screen for displaying favorite Pokemon
├── assets/ - Contains static assets like images and icons
├── components/ - Contains reusable components
│   ├── Header.tsx - Header component for the app
│   ├── SearchBar.tsx - Component for the search input
│   ├── Navbar.tsx - Navigation menu component
│   ├── SearchResult.tsx - Component for displaying search results
├── hooks/ - Contains custom hooks
│   ├── pokemoninfo.ts - Hook for fetching Pokemon data
├── types/ - Contains TypeScript type definitions
│   ├── pokemon.ts - Type definitions for Pokemon data
│   ├── navigation.ts - Type definitions for navigation parameters
|-- context/ - Contains store for state management
│   ├── PokemonContext.ts - Store for managing Pokemon favourite state


