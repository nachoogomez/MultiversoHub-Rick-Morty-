import React from 'react';
import { 
  StyleSheet, 
  ScrollView, 
  Alert
} from 'react-native';
import { Character } from '../types/character';
import CharacterHeader from '../components/character/CharacterHeader';
import CharacterInfo from '../components/character/CharacterInfo';
import { useFavourites, useTheme } from '../context';

interface CharacterDetailScreenProps {
  route: any;
  navigation: any;
}

export default function CharacterDetailScreen({ route, navigation }: CharacterDetailScreenProps) {
  const { character } = route.params;
  const { toggleFavourite, isFavourite } = useFavourites();
  const { theme } = useTheme();
  
  const handleFavourites = () => {
    toggleFavourite(character);
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <CharacterHeader 
        character={character} 
        onAddToFavorites={handleFavourites}
        isFavourite={isFavourite(character.id)}
      />
      <CharacterInfo character={character} />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
