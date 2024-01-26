import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView } from 'react-native';

const DashboardScreen = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // Replace with local machine ip address
    fetch('http://10.40.190.208:3000/users')
      .then(response => response.json())
      .then(data => setUsers(data))
      .catch(error => console.error('Error:', error));
  }, []);

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <ScrollView>
        {users.map((user, index) => (
          <Text key={index}>{user.username}</Text> // Assuming 'user' has a 'username' field
        ))}
      </ScrollView>
    </View>
  );
};

export default DashboardScreen;
