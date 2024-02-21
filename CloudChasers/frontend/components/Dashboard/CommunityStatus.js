import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';

const communityUpdates = [
  { groupName: 'Pasta Lovers', likes: 120, members: 80 },
  { groupName: 'Meat Meat Meat', likes: 150, members: 50 },
  { groupName: 'Health Gurus', likes: 90, members: 40 },
];

const CommunityUpdates = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Community Updates</Text>
      <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.scrollContainer}>
        {communityUpdates.map((update, index) => (
          <View key={index} style={styles.updateContainer}>
            <Text style={styles.groupName}>{update.groupName}</Text>
            <Text style={styles.detailText}>Likes: {update.likes} | Members: {update.members}</Text>
            {/* <Text style={styles.detailText}>Members: {update.members}</Text> */}
          </View>
        ))}
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    // flex: 1,
    backgroundColor: '#EC6641',
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    width: '95%',
    // height: 'auto',
    borderRadius: 15,
    padding: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 15,
  },
  scrollContainer: {
    //if you need to style the scroll view
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginLeft: 10,
    marginBottom: 10,
  },
  updateContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 10,
    marginRight: 10,
    marginBottom: 5,
    width: 200,
    height: 'auto',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.22,
    shadowRadius: 2.22,
    elevation: 3,
    borderRadius: 15,
  },
  groupName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detailText: {
    fontSize: 14,
  },
});

export default CommunityUpdates;
