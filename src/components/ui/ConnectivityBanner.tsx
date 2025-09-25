import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  Animated 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface ConnectivityBannerProps {
  visible: boolean;
}

export default function ConnectivityBanner({ visible }: ConnectivityBannerProps) {
  if (!visible) return null;

  return (
    <Animated.View style={styles.banner}>
      <View style={styles.content}>
        <Ionicons name="wifi-outline" size={20} color="#FF3B30" />
        <Text style={styles.text}>Sin conexión a internet</Text>
      </View>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  banner: {
    backgroundColor: '#FF3B30',
    paddingVertical: 8,
    paddingHorizontal: 16,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 1000,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
  text: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginLeft: 8,
  },
});
