import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';

const communityPanel = [
  { name: 'Matt', streak: 4},
  { name: 'Lorenzo', streak: 2},
  { name: 'Alana', streak: 3},
  { name: 'L', streak: 5},
  { name: 's', streak: 1},
  { name: 'P', streak: 0}
];

const CommunityPanel = () => {
    const sortedCommunityPanel = [...communityPanel].sort((a, b) => b.streak - a.streak);
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Friend's Streaks</Text>
        <ScrollView style={styles.scrollViewStyle}>
          {sortedCommunityPanel.map((update, index) => (
            <View key={index} style={styles.updateContainer}>
            <Text style={styles.detailText}>
              <Text style={styles.rankAndName}>{index + 1}. {update.name}</Text> - {update.streak} days 🔥
            </Text>
          </View>
          ))}
        </ScrollView>
      </View>
    );
  };

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#EC6641',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '95%',
    height: 120,
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
  },
  header: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  rankAndName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 16,
  },
  scrollViewStyle: {
    width: '100%',
  },
  updateContainer: {
    marginBottom: 10,
  },
});

export default CommunityPanel;
