import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text,
  StyleSheet, 
  FlatList, 
  RefreshControl,
  Alert,
  TouchableOpacity
} from 'react-native';
import { getCharacters } from '../api/api';
import { Character } from '../types/character';
import CharacterCard from '../components/character/CharacterCard';
import LoadingSpinner from '../components/ui/LoadingSpinner';
import ErrorState from '../components/ui/ErrorState';
import { Button } from 'react-native';
import { useStats, useTheme } from '../context';
import telemetryService from '../services/telemetryService';

interface CharactersScreenProps {
  navigation: any;
  route: any;
}

export default function CharactersScreen({ navigation, route }: CharactersScreenProps) {
  const [characters, setCharacters] = useState<Character[]>([]);
  const [loading, setLoading] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [loadingMore, setLoadingMore] = useState(false);
  const [hasMorePages, setHasMorePages] = useState(true);
  const [filter, setFilter] = useState<string | null>(null);
  const { incrementCharacters } = useStats();
  const { theme } = useTheme();

  useEffect(() => {
    // Check if filter was passed from navigation
    const filterParam = route?.params?.filter;
    if (filterParam !== filter) {
      setFilter(filterParam);
      setCurrentPage(1);
      setCharacters([]);
      fetchCharacters(1, false);
    }
  }, [route?.params?.filter]);

  const fetchCharacters = async (page: number = 1, append: boolean = false) => {
    try {
      if (append) {
        setLoadingMore(true);
      } else {
        setLoading(true);
      }
      setError(null);
      const data = await getCharacters(page);
      let filteredResults = data.results;
      
      // Apply filter if set
      if (filter) {
        filteredResults = data.results.filter(char => char.status === filter);
      }
      
      if (append) {
        setCharacters(prev => [...prev, ...filteredResults]);
      } else {
        setCharacters(filteredResults);
      }
      setHasMorePages(!!data.info.next);
      
      // Increment character count for stats
      incrementCharacters();
    } catch (err) {
      setError('Error al cargar los personajes');
      telemetryService.trackError('characters_load_failed', 'CharactersScreen', { 
        page, 
        error: err.message 
      });
      Alert.alert('Error', 'No se pudieron cargar los personajes');
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const onRefresh = async () => {
    setRefreshing(true);
    setCurrentPage(1);
    await fetchCharacters(1, false);
    setRefreshing(false);
  };

  const loadMoreCharacters = async () => {
    if (!loadingMore && hasMorePages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      await fetchCharacters(nextPage, true);
    }
  };

  const handleCharacterPress = (character: Character) => {
    telemetryService.trackCharacterView(character.id, character.name);
    navigation.navigate('CharacterDetail', { character });
  };

  const renderCharacter = ({ item }: { item: Character }) => (
    <CharacterCard 
      character={item} 
      onPress={handleCharacterPress} 
    />
  );

  if (loading) {
    return <LoadingSpinner message="Cargando personajes..." />;
  }

  if (error) {
    return <ErrorState message={error} onRetry={fetchCharacters} />;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      {filter && (
        <View style={[styles.filterIndicator, { 
          backgroundColor: theme.colors.surface,
          borderBottomColor: theme.colors.border 
        }]}>
          <Text style={[styles.filterText, { color: theme.colors.text }]}>
            Filtro activo: {filter === 'Alive' ? 'Vivos' : filter === 'Dead' ? 'Muertos' : 'Desconocidos'}
          </Text>
          <TouchableOpacity 
            style={[styles.clearFilterButton, { 
              backgroundColor: theme.colors.border,
              borderColor: theme.colors.primary 
            }]}
            onPress={() => {
              telemetryService.trackFilterApplied('status', 'none');
              setFilter(null);
              setCurrentPage(1);
              setCharacters([]);
              fetchCharacters(1, false);
            }}
          >
            <Text style={[styles.clearFilterText, { color: theme.colors.primary }]}>Limpiar</Text>
          </TouchableOpacity>
        </View>
      )}
      <FlatList
        data={characters}
        renderItem={renderCharacter}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.listContainer}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            tintColor={theme.colors.primary}
          />
        }
        ListFooterComponent={() => (
          hasMorePages ? (
            <View style={styles.loadMoreContainer}>
              <Button
                title={loadingMore ? "Cargando..." : "Ver más personajes"}
                onPress={loadMoreCharacters}
                disabled={loadingMore}
                color={theme.colors.primary}
              />
            </View>
          ) : null
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  listContainer: {
    paddingHorizontal: 16,
    paddingTop: 20,
    paddingBottom: 20,
  },
  loadMoreContainer: {
    paddingVertical: 20,
    alignItems: 'center',
  },
  filterIndicator: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
  },
  filterText: {
    fontSize: 14,
    fontWeight: '500',
  },
  clearFilterButton: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
    borderWidth: 1,
  },
  clearFilterText: {
    fontSize: 12,
    fontWeight: '500',
  },
});
