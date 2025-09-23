import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import WelcomeCard from '../components/home/WelcomeCard';
import NavigationCard from '../components/home/NavigationCard';
import StatsCard from '../components/home/StatsCard';
import { useFavourites, useStats, useTheme } from '../context';
import telemetryService from '../services/telemetryService';

interface HomeScreenProps {
  navigation: any;
}

export default function HomeScreen({ navigation }: HomeScreenProps) {
  const { favourites } = useFavourites();
  const { totalCharacters } = useStats();
  const { theme } = useTheme();

  const handleNavigate = (screen: string) => {
    telemetryService.trackScreenView(screen, 'Home');
    navigation.navigate(screen);
  };

  const handleFilterPress = (filter: string) => {
    telemetryService.trackFilterApplied('status', filter);
    navigation.navigate('Characters', { 
      screen: 'CharactersList', 
      params: { filter } 
    });
  };

  return (
    <ScrollView style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.content}>
        <WelcomeCard 
          title="Welcome to MultiversoHub"
          subtitle="Explore the infinite multiverse of Rick and Morty characters, episodes, and adventures!"
        />

        <StatsCard 
          totalCharacters={totalCharacters}
          totalFavorites={favourites.length}
          onFilterPress={handleFilterPress}
        />

        <View style={styles.cardsContainer}>
          <NavigationCard
            icon="people"
            title="Characters"
            description="Discover all your favorite characters from across dimensions"
            buttonText="Explore Characters"
            onPress={() => handleNavigate('Characters')}
            variant="primary"
          />

          <NavigationCard
            icon="heart"
            title="Favorites"
            description="Keep track of your favorite characters and episodes"
            buttonText="View Favorites"
            onPress={() => handleNavigate('Favorites')}
            variant="primary"
          />

          <NavigationCard
            icon="settings"
            title="Settings"
            description="Customize your MultiversoHub experience"
            buttonText="Open Settings"
            onPress={() => handleNavigate('Settings')}
            variant="primary"
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
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 20,
  },
  cardsContainer: {
    gap: 20,
  },
});
