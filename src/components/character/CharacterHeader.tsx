import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Character } from '../../types/character';

interface CharacterHeaderProps {
  character: Character;
  onAddToFavorites: () => void;
  isFavourite: boolean;
}

export default function CharacterHeader({ character, onAddToFavorites, isFavourite }: CharacterHeaderProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Alive':
        return '#34C759';
      case 'Dead':
        return '#FF3B30';
      default:
        return '#8E8E93';
    }
  };

  return (
    <View style={styles.header}>
      <Image source={{ uri: character.image }} style={styles.characterImage} />
      <View style={styles.headerInfo}>
        <Text style={styles.characterName}>{character.name}</Text>
        <View style={styles.statusContainer}>
          <View style={[styles.statusDot, { backgroundColor: getStatusColor(character.status) }]} />
          <Text style={styles.statusText}>{character.status}</Text>
        </View>
      </View>
      <TouchableOpacity style={styles.favoriteButton} onPress={onAddToFavorites}>
        <Ionicons 
          name={isFavourite ? "heart" : "heart-outline"} 
          size={24} 
          color={isFavourite ? "#FF3B30" : "#8E8E93"} 
        />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#1C1C1E',
    borderBottomWidth: 1,
    borderBottomColor: '#2C2C2E',
  },
  characterImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
  },
  headerInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 8,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  statusDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 8,
  },
  statusText: {
    fontSize: 16,
    color: '#8E8E93',
  },
  favoriteButton: {
    padding: 8,
  },
});
