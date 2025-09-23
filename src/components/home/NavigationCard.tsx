import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../../context';

interface NavigationCardProps {
  icon: string;
  title: string;
  description: string;
  buttonText: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary';
}

export default function NavigationCard({ 
  icon, 
  title, 
  description, 
  buttonText, 
  onPress, 
  variant = 'primary' 
}: NavigationCardProps) {
  const { theme } = useTheme();
  const isSecondary = variant === 'secondary';

  return (
    <TouchableOpacity 
      style={[styles.card, { 
        backgroundColor: theme.colors.surface,
        borderColor: theme.colors.border 
      }]}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.cardIcon}>
        <Ionicons 
          name={icon as any} 
          size={32} 
          color={isSecondary ? theme.colors.textSecondary : theme.colors.primary} 
        />
      </View>
      <Text style={[styles.cardTitle, { color: theme.colors.text }]}>{title}</Text>
      <Text style={[styles.cardDescription, { color: theme.colors.textSecondary }]}>{description}</Text>
      <TouchableOpacity 
        style={[
          styles.cardButton, 
          { backgroundColor: theme.colors.primary },
          isSecondary && { backgroundColor: theme.colors.border }
        ]}
        onPress={onPress}
      >
        <Text style={[
          styles.cardButtonText, 
          { color: theme.colors.text },
          isSecondary && { color: theme.colors.textSecondary }
        ]}>
          {buttonText}
        </Text>
      </TouchableOpacity>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 16,
    padding: 24,
    alignItems: 'center',
    borderWidth: 1,
  },
  cardIcon: {
    marginBottom: 16,
  },
  cardTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  cardDescription: {
    fontSize: 14,
    textAlign: 'center',
    marginBottom: 20,
    lineHeight: 20,
  },
  cardButton: {
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 8,
  },
  cardButtonText: {
    fontWeight: '600',
    fontSize: 16,
  },
});
