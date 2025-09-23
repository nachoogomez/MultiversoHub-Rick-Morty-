import AsyncStorage from '@react-native-async-storage/async-storage';

export class CacheStorage {
  private static readonly CACHE_KEYS = {
    CHARACTERS: 'cached_characters',
    FAVORITES: 'cached_favorites',
    SETTINGS: 'cached_settings',
    STATS: 'cached_stats',
  };


  static async clearAllCache(): Promise<void> {
    try {
      const keys = Object.values(this.CACHE_KEYS);
      await AsyncStorage.multiRemove(keys);
      console.log('Cache cleared successfully');
    } catch (error) {
      console.error('Error clearing cache:', error);
      throw error;
    }
  }

  static async clearCacheByKey(key: string): Promise<void> {
    try {
      await AsyncStorage.removeItem(key);
      console.log(`Cache cleared for key: ${key}`);
    } catch (error) {
      console.error(`Error clearing cache for key ${key}:`, error);
      throw error;
    }
  }

  static async getCacheInfo(): Promise<{ totalKeys: number; keys: string[] }> {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const cacheKeys = keys.filter(key => 
        Object.values(this.CACHE_KEYS).includes(key)
      );
      return {
        totalKeys: cacheKeys.length,
        keys: cacheKeys
      };
    } catch (error) {
      console.error('Error getting cache info:', error);
      return { totalKeys: 0, keys: [] };
    }
  }

  static async setCacheData(key: string, data: any): Promise<void> {
    try {
      await AsyncStorage.setItem(key, JSON.stringify(data));
    } catch (error) {
      console.error(`Error storing cache data for key ${key}:`, error);
      throw error;
    }
  }

  static async getCacheData(key: string): Promise<any> {
    try {
      const data = await AsyncStorage.getItem(key);
      return data ? JSON.parse(data) : null;
    } catch (error) {
      console.error(`Error getting cache data for key ${key}:`, error);
      return null;
    }
  }
}
