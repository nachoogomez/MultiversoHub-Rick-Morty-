import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  FlatList, 
  Alert
} from 'react-native';
import { Character } from '../types/character';
import CharacterCard from '../components/character/CharacterCard';
import EmptyState from '../components/ui/EmptyState';
import { useFavourites, useTheme } from '../context';

interface FavoritesScreenProps {
  navigation: any;
}

export default function FavoritesScreen({ navigation }: FavoritesScreenProps) {
  const { favourites, removeFromFavourites } = useFavourites();
  const { theme } = useTheme();

  const handleRemoveFavorite = (characterId: number) => {
    Alert.alert(
      'Eliminar de favoritos',
      '¿Estás seguro de que quieres eliminar este personaje de tus favoritos?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Eliminar', 
          style: 'destructive',
          onPress: () => {
            removeFromFavourites(characterId);
          }
        }
      ]
    );
  };

  const handleCharacterPress = (character: Character) => {
    navigation.navigate('Characters', {
      screen: 'CharacterDetail',
      params: { character }
    });
  };

  const renderFavorite = ({ item }: { item: Character }) => (
    <CharacterCard 
      character={item} 
      onPress={handleCharacterPress}
      showRemoveButton={true}
      onRemove={handleRemoveFavorite}
    />
  );

  if (favourites.length === 0) {
    return (
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <EmptyState 
          icon="heart-outline"
          title="No tienes favoritos"
          description="Los personajes que marques como favoritos aparecerán aquí"
          buttonText="Explorar Personajes"
          onButtonPress={() => navigation.navigate('Characters')}
        />
      </View>
    );
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={[styles.header, { borderBottomColor: theme.colors.border }]}>
        <Text style={[styles.headerTitle, { color: theme.colors.text }]}>Mis Favoritos</Text>
        <Text style={[styles.headerSubtitle, { color: theme.colors.textSecondary }]}>
          {favourites.length} personaje{favourites.length !== 1 ? 's' : ''}
        </Text>
      </View>
      
      <FlatList
        data={favourites}
        renderItem={renderFavorite}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
});
