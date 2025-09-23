import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Character } from '../../types/character';

interface CharacterInfoProps {
  character: Character;
}

export default function CharacterInfo({ character }: CharacterInfoProps) {
  const getGenderIcon = (gender: string) => {
    switch (gender) {
      case 'Male':
        return 'male';
      case 'Female':
        return 'female';
      case 'Genderless':
        return 'help-outline';
      default:
        return 'help-outline';
    }
  };

  return (
    <View style={styles.content}>
      {/* Basic Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Básica</Text>
        
        <View style={styles.infoRow}>
          <Ionicons name="paw" size={20} color="#007AFF" />
          <Text style={styles.infoLabel}>Especie:</Text>
          <Text style={styles.infoValue}>{character.species}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name={getGenderIcon(character.gender)} size={20} color="#007AFF" />
          <Text style={styles.infoLabel}>Género:</Text>
          <Text style={styles.infoValue}>{character.gender}</Text>
        </View>

        {character.type && (
          <View style={styles.infoRow}>
            <Ionicons name="information-circle" size={20} color="#007AFF" />
            <Text style={styles.infoLabel}>Tipo:</Text>
            <Text style={styles.infoValue}>{character.type}</Text>
          </View>
        )}
      </View>

      {/* Location Information */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Ubicación</Text>
        
        <View style={styles.infoRow}>
          <Ionicons name="location" size={20} color="#007AFF" />
          <Text style={styles.infoLabel}>Origen:</Text>
          <Text style={styles.infoValue}>{character.origin.name}</Text>
        </View>

        <View style={styles.infoRow}>
          <Ionicons name="map" size={20} color="#007AFF" />
          <Text style={styles.infoLabel}>Ubicación actual:</Text>
          <Text style={styles.infoValue}>{character.location.name}</Text>
        </View>
      </View>

      {/* Episodes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Episodios</Text>
        <Text style={styles.episodeCount}>
          Aparece en {character.episode.length} episodio{character.episode.length !== 1 ? 's' : ''}
        </Text>
      </View>

      {/* Additional Info */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Información Adicional</Text>
        
        <View style={styles.infoRow}>
          <Ionicons name="calendar" size={20} color="#007AFF" />
          <Text style={styles.infoLabel}>Creado:</Text>
          <Text style={styles.infoValue}>
            {new Date(character.created).toLocaleDateString()}
          </Text>
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 16,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
    paddingVertical: 8,
  },
  infoLabel: {
    fontSize: 16,
    color: '#8E8E93',
    marginLeft: 12,
    marginRight: 8,
    minWidth: 80,
  },
  infoValue: {
    fontSize: 16,
    color: '#FFFFFF',
    flex: 1,
  },
  episodeCount: {
    fontSize: 16,
    color: '#8E8E93',
    fontStyle: 'italic',
  },
});
