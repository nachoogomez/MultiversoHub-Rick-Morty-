import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  ScrollView, 
  Switch,
  Alert
} from 'react-native';
import SettingItem from '../components/ui/SettingItem';
import { CacheStorage } from '../storage/cacheStorage';
import { useFavourites, useTheme } from '../context';
import telemetryService from '../services/telemetryService';

interface SettingsScreenProps {
  navigation: any;
}

export default function SettingsScreen({ navigation }: SettingsScreenProps) {
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  const [autoSyncEnabled, setAutoSyncEnabled] = useState(false);
  const { clearFavourites } = useFavourites();
  const { theme, isDarkMode, setTheme } = useTheme();

  const handleClearCache = () => {
    Alert.alert(
      'Limpiar caché',
      '¿Estás seguro de que quieres limpiar la caché de la aplicación? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Limpiar', 
          style: 'destructive',
          onPress: async () => {
            try {
              await CacheStorage.clearAllCache();
              telemetryService.trackCacheClear();
              Alert.alert('Éxito', 'Caché limpiada correctamente');
            } catch (error) {
              telemetryService.trackError('cache_clear_failed', 'SettingsScreen', { error: error.message });
              Alert.alert('Error', 'No se pudo limpiar la caché. Inténtalo de nuevo.');
            }
          }
        }
      ]
    );
  };

  const handleResetFavorites = () => {
    Alert.alert(
      'Resetear favoritos',
      '¿Estás seguro de que quieres eliminar todos tus favoritos? Esta acción no se puede deshacer.',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Resetear', 
          style: 'destructive',
          onPress: () => {
            try {
              clearFavourites();
              Alert.alert('Éxito', 'Favoritos reseteados correctamente');
            } catch (error) {
              telemetryService.trackError('favorites_reset_failed', 'SettingsScreen', { error: error.message });
              Alert.alert('Error', 'No se pudieron resetear los favoritos. Inténtalo de nuevo.');
            }
          }
        }
      ]
    );
  };

  const handleDarkMode = (value: boolean) => {
    setTheme(value);
  }

  const handleAutoSyncToggle = (value: boolean) => {
    setAutoSyncEnabled(value);
    telemetryService.trackAutoSyncToggle(value);
  }


  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        {/* App Info */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Información de la App</Text>
          <SettingItem
            icon="information-circle"
            title="Versión"
            subtitle="1.0.0"
          />
        </View>

        {/* Preferences */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Preferencias</Text>
          <SettingItem
            icon="moon"
            title="Modo Oscuro"
            subtitle="Usar tema oscuro (siempre activado)"
            rightComponent={
              <Switch
                value={isDarkMode}
                onValueChange={handleDarkMode}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={isDarkMode ? '#FFFFFF' : '#8E8E93'}
              />
            }
          />
          <SettingItem
            icon="sync"
            title="Sincronización Automática"
            subtitle="Sincronizar datos automáticamente"
            rightComponent={
              <Switch
                value={autoSyncEnabled}
                onValueChange={handleAutoSyncToggle}
                trackColor={{ false: theme.colors.border, true: theme.colors.primary }}
                thumbColor={autoSyncEnabled ? '#FFFFFF' : '#8E8E93'}
              />
            }
          />
        </View>

        {/* Data Management */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Gestión de Datos</Text>
          <SettingItem
            icon="trash"
            title="Limpiar Caché"
            subtitle="Eliminar datos temporales almacenados"
            onPress={handleClearCache}
          />
          <SettingItem
            icon="refresh"
            title="Resetear Favoritos"
            subtitle="Eliminar todos los favoritos guardados"
            onPress={handleResetFavorites}
          />
        </View>

        {/* App Actions */}
        <View style={styles.section}>
          <Text style={[styles.sectionTitle, { color: theme.colors.text }]}>Acciones</Text>
          <SettingItem
            icon="star"
            title="Calificar App"
            onPress={() => Alert.alert('Calificar', 'Gracias por tu interés en calificar la app')}
          />
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    padding: 20,
  },
  section: {
    marginBottom: 32,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 16,
  },
});
