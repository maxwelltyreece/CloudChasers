// AcButton.js
import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import ActionButton from 'react-native-action-button';
import RecipeModal from './RecipeModal';

const AcButton = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handlePress = () => {
    setIsModalVisible(!isModalVisible);
  };

  return (
    <View style={styles.container}>
      <ActionButton
        buttonColor="#FF815E"
        onPress={handlePress}
      />
      <RecipeModal
        isVisible={isModalVisible}
        onClose={() => setIsModalVisible(false)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f3f3f3',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default AcButton;