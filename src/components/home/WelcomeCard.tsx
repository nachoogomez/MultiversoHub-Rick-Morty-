import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet 
} from 'react-native';
import { useTheme } from '../../context';

interface WelcomeCardProps {
  title: string;
  subtitle: string;
}

export default function WelcomeCard({ title, subtitle }: WelcomeCardProps) {
  const { theme } = useTheme();
  
  return (
    <View style={styles.container}>
      <Text style={[styles.title, { color: theme.colors.text }]}>{title}</Text>
      <Text style={[styles.subtitle, { color: theme.colors.text, opacity: 0.8 }]}>{subtitle}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 40,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    lineHeight: 24,
  },
});
