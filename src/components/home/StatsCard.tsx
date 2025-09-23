import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context';

interface StatsCardProps {
  totalCharacters: number;
  totalFavorites: number;
  onFilterPress: (filter: string) => void;
}

export default function StatsCard({ 
  totalCharacters, 
  totalFavorites, 
  onFilterPress 
}: StatsCardProps) {
  const { theme } = useTheme();
  
  return (
    <View style={[styles.container, { 
      backgroundColor: theme.colors.surface,
      borderColor: theme.colors.border 
    }]}>
      <Text style={[styles.title, { color: theme.colors.text }]}>Resumen</Text>
      
      <View style={styles.statsContainer}>
        <View style={styles.statItem}>
          <Ionicons name="people" size={24} color={theme.colors.primary} />
          <Text style={[styles.statNumber, { color: theme.colors.text }]}>{totalCharacters}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Personajes</Text>
        </View>
        
        <View style={styles.statItem}>
          <Ionicons name="heart" size={24} color={theme.colors.error} />
          <Text style={[styles.statNumber, { color: theme.colors.text }]}>{totalFavorites}</Text>
          <Text style={[styles.statLabel, { color: theme.colors.textSecondary }]}>Favoritos</Text>
        </View>
      </View>

      <View style={[styles.filtersContainer, { borderTopColor: theme.colors.border }]}>
        <Text style={[styles.filtersTitle, { color: theme.colors.text }]}>Filtros Rápidos</Text>
        <View style={styles.filtersRow}>
          <TouchableOpacity 
            style={[styles.filterButton, { 
              backgroundColor: theme.colors.border,
              borderColor: theme.colors.primary 
            }]}
            onPress={() => onFilterPress('Alive')}
          >
            <Ionicons name="pulse" size={16} color={theme.colors.success} />
            <Text style={[styles.filterText, { color: theme.colors.text }]}>Vivos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, { 
              backgroundColor: theme.colors.border,
              borderColor: theme.colors.primary 
            }]}
            onPress={() => onFilterPress('Dead')}
          >
            <Ionicons name="skull" size={16} color={theme.colors.error} />
            <Text style={[styles.filterText, { color: theme.colors.text }]}>Muertos</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={[styles.filterButton, { 
              backgroundColor: theme.colors.border,
              borderColor: theme.colors.primary 
            }]}
            onPress={() => onFilterPress('unknown')}
          >
            <Ionicons name="help-circle" size={16} color={theme.colors.textSecondary} />
            <Text style={[styles.filterText, { color: theme.colors.text }]}>Desconocidos</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    padding: 20,
    marginBottom: 20,
    borderWidth: 1,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
  statsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 20,
  },
  statItem: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 8,
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 14,
  },
  filtersContainer: {
    borderTopWidth: 1,
    paddingTop: 16,
  },
  filtersTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 12,
  },
  filtersRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderRadius: 8,
    marginHorizontal: 4,
    borderWidth: 1,
  },
  filterText: {
    fontSize: 12,
    fontWeight: '500',
    marginLeft: 6,
  },
});

