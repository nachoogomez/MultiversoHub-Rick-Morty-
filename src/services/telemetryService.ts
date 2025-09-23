import AsyncStorage from '@react-native-async-storage/async-storage';

export interface TelemetryEvent {
  id: string;
  timestamp: number;
  event: string;
  category: 'user_action' | 'system' | 'error' | 'performance';
  data?: Record<string, any>;
  userId?: string;
  sessionId: string;
}

export interface TelemetryConfig {
  enabled: boolean;
  maxEvents: number;
  flushInterval: number;
  debugMode: boolean;
}

class TelemetryService {
  private static instance: TelemetryService;
  private events: TelemetryEvent[] = [];
  private sessionId: string;
  private config: TelemetryConfig;
  private flushTimer: NodeJS.Timeout | null = null;

  private constructor() {
    this.sessionId = this.generateSessionId();
    this.config = {
      enabled: true,
      maxEvents: 1000,
      flushInterval: 30000, // 30 seconds
      debugMode: __DEV__,
    };
    this.startFlushTimer();
  }

  public static getInstance(): TelemetryService {
    if (!TelemetryService.instance) {
      TelemetryService.instance = new TelemetryService();
    }
    return TelemetryService.instance;
  }

  private generateSessionId(): string {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private generateEventId(): string {
    return `event_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private startFlushTimer(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
    }
    
    this.flushTimer = setInterval(() => {
      this.flushEvents();
    }, this.config.flushInterval);
  }

  private async flushEvents(): Promise<void> {
    if (this.events.length === 0) return;

    try {
      const eventsToFlush = [...this.events];
      this.events = [];

      // In a real app, you would send to your analytics service
      if (this.config.debugMode) {
        console.log('📊 Telemetry Events Flushed:', eventsToFlush);
      }

      // Store locally for debugging
      await this.storeEventsLocally(eventsToFlush);
    } catch (error) {
      console.error('Failed to flush telemetry events:', error);
    }
  }

  private async storeEventsLocally(events: TelemetryEvent[]): Promise<void> {
    try {
      const existingEvents = await AsyncStorage.getItem('@multiverso_telemetry');
      const allEvents = existingEvents ? JSON.parse(existingEvents) : [];
      allEvents.push(...events);
      
      // Keep only last 1000 events
      if (allEvents.length > 1000) {
        allEvents.splice(0, allEvents.length - 1000);
      }
      
      await AsyncStorage.setItem('@multiverso_telemetry', JSON.stringify(allEvents));
    } catch (error) {
      console.error('Failed to store telemetry events locally:', error);
    }
  }

  public track(event: string, category: TelemetryEvent['category'], data?: Record<string, any>): void {
    if (!this.config.enabled) return;

    const telemetryEvent: TelemetryEvent = {
      id: this.generateEventId(),
      timestamp: Date.now(),
      event,
      category,
      data,
      sessionId: this.sessionId,
    };

    this.events.push(telemetryEvent);

    // Debug logging
    if (this.config.debugMode) {
      console.log(`📊 [${category.toUpperCase()}] ${event}`, data || '');
    }

    // Flush if we hit max events
    if (this.events.length >= this.config.maxEvents) {
      this.flushEvents();
    }
  }

  // User Action Events
  public trackFavoritesAdd(characterId: number, characterName: string): void {
    this.track('favorites_add', 'user_action', {
      characterId,
      characterName,
    });
  }

  public trackFavoritesRemove(characterId: number, characterName: string): void {
    this.track('favorites_remove', 'user_action', {
      characterId,
      characterName,
    });
  }

  public trackFavoritesReset(totalFavorites: number): void {
    this.track('favorites_reset', 'user_action', {
      totalFavorites,
    });
  }

  public trackDarkModeToggle(enabled: boolean): void {
    this.track('dark_mode_toggle', 'user_action', {
      enabled,
      theme: enabled ? 'dark' : 'light',
    });
  }

  public trackCacheClear(): void {
    this.track('cache_clear', 'user_action');
  }

  public trackAutoSyncToggle(enabled: boolean): void {
    this.track('auto_sync_toggle', 'user_action', {
      enabled,
    });
  }

  public trackScreenView(screenName: string, previousScreen?: string): void {
    this.track('screen_view', 'user_action', {
      screenName,
      previousScreen,
    });
  }

  public trackCharacterView(characterId: number, characterName: string): void {
    this.track('character_view', 'user_action', {
      characterId,
      characterName,
    });
  }

  public trackFilterApplied(filterType: string, filterValue: string): void {
    this.track('filter_applied', 'user_action', {
      filterType,
      filterValue,
    });
  }

  public trackSearchPerformed(query: string, resultsCount: number): void {
    this.track('search_performed', 'user_action', {
      query,
      resultsCount,
    });
  }

  // System Events
  public trackAppStart(): void {
    this.track('app_start', 'system', {
      sessionId: this.sessionId,
    });
  }

  public trackAppBackground(): void {
    this.track('app_background', 'system');
  }

  public trackAppForeground(): void {
    this.track('app_foreground', 'system');
  }

  public trackDataLoad(dataType: string, success: boolean, duration?: number): void {
    this.track('data_load', 'system', {
      dataType,
      success,
      duration,
    });
  }

  public trackCacheHit(dataType: string): void {
    this.track('cache_hit', 'system', {
      dataType,
    });
  }

  public trackCacheMiss(dataType: string): void {
    this.track('cache_miss', 'system', {
      dataType,
    });
  }

  // Error Events
  public trackError(error: string, context?: string, data?: Record<string, any>): void {
    this.track('error', 'error', {
      error,
      context,
      ...data,
    });
  }

  public trackApiError(endpoint: string, statusCode: number, error: string): void {
    this.track('api_error', 'error', {
      endpoint,
      statusCode,
      error,
    });
  }

  // Performance Events
  public trackPerformance(operation: string, duration: number, data?: Record<string, any>): void {
    this.track('performance', 'performance', {
      operation,
      duration,
      ...data,
    });
  }

  public trackMemoryUsage(): void {
    // In a real app, you would get actual memory usage
    this.track('memory_usage', 'performance', {
      timestamp: Date.now(),
    });
  }

  // Utility Methods
  public async getStoredEvents(): Promise<TelemetryEvent[]> {
    try {
      const events = await AsyncStorage.getItem('@multiverso_telemetry');
      return events ? JSON.parse(events) : [];
    } catch (error) {
      console.error('Failed to get stored events:', error);
      return [];
    }
  }

  public async clearStoredEvents(): Promise<void> {
    try {
      await AsyncStorage.removeItem('@multiverso_telemetry');
      this.track('telemetry_clear', 'system');
    } catch (error) {
      console.error('Failed to clear stored events:', error);
    }
  }

  public setConfig(config: Partial<TelemetryConfig>): void {
    this.config = { ...this.config, ...config };
  }

  public getConfig(): TelemetryConfig {
    return { ...this.config };
  }

  public async flush(): Promise<void> {
    await this.flushEvents();
  }

  public destroy(): void {
    if (this.flushTimer) {
      clearInterval(this.flushTimer);
      this.flushTimer = null;
    }
    this.flushEvents();
  }
}

export default TelemetryService.getInstance();
