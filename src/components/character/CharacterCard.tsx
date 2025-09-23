import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Image, 
  TouchableOpacity 
} from 'react-native';
import { Character } from '../../types/character';
import { useTheme } from '../../context';

interface CharacterCardProps {
  character: Character;
  onPress: (character: Character) => void;
  showRemoveButton?: boolean;
  onRemove?: (characterId: number) => void;
}

export default function CharacterCard({ 
  character, 
  onPress, 
  showRemoveButton = false, 
  onRemove 
}: CharacterCardProps) {
  const { theme } = useTheme();
  
  return (
    <TouchableOpacity 
      style={[styles.characterCard, { 
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border 
      }]}
      onPress={() => onPress(character)}
      activeOpacity={0.7}
    >
      <Image source={{ uri: character.image }} style={styles.characterImage} />
      <View style={styles.characterInfo}>
        <Text style={[styles.characterName, { color: theme.colors.text }]}>{character.name}</Text>
        <Text style={[styles.characterDetails, { color: theme.colors.textSecondary }]}>
          {character.species} • {character.status}
        </Text>
        <Text style={[styles.characterLocation, { color: theme.colors.textSecondary }]}>{character.location.name}</Text>
      </View>
      {showRemoveButton ? (
        <TouchableOpacity 
          style={[styles.removeButton, { 
            backgroundColor: theme.colors.border,
            borderColor: theme.colors.primary 
          }]}
          onPress={() => onRemove?.(character.id)}
        >
          <Text style={[styles.removeButtonText, { color: theme.colors.error }]}>×</Text>
        </TouchableOpacity>
      ) : (
        <View style={styles.arrowContainer}>
          <Text style={[styles.arrow, { color: theme.colors.textSecondary }]}>›</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  characterCard: {
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
  },
  characterImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 16,
  },
  characterInfo: {
    flex: 1,
  },
  characterName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 4,
  },
  characterDetails: {
    fontSize: 14,
    marginBottom: 2,
  },
  characterLocation: {
    fontSize: 12,
  },
  arrowContainer: {
    marginLeft: 8,
  },
  arrow: {
    fontSize: 24,
  },
  removeButton: {
    padding: 8,
    borderRadius: 16,
    width: 36,
    height: 36,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  removeButtonText: {
    fontSize: 20,
    fontWeight: 'bold',
    lineHeight: 20,
  },
});
