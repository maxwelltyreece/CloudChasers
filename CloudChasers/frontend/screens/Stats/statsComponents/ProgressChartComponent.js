import React, {useState} from 'react';
import { View, Dimensions, StyleSheet, Pressable, Text, Modal, TouchableOpacity, ScrollView } from 'react-native';

import { ProgressChart } from 'react-native-chart-kit';

const ProgressChartComponent = () => {

  const nutrients = ["Protein", "Fat", "Carbs", "Calories"];
  const initialData = {
    labels: [], 
    data: [],
  };

  const [chartData, setChartData] = useState(initialData);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedNutrients, setSelectedNutrients] = useState([]);

  const toggleNutrientSelection = (nutrient) => {
    let newSelection = [...selectedNutrients];
    if (newSelection.includes(nutrient)) {
      newSelection = newSelection.filter(n => n !== nutrient);
    } else if (newSelection.length < 3) {
      newSelection.push(nutrient);
    }
    setSelectedNutrients(newSelection);
  };

  const applyNutrientsToChart = () => {
    const nutrientDataMapping = {
      "Protein": 0.5,
      "Fat": 0.4,
      "Carbs": 0.6,
      "Calories": 0.8
    };

    const newData = {
      labels: selectedNutrients,
       data: selectedNutrients.map(nutrient => nutrientDataMapping[nutrient])
    };

    setChartData(newData);
    setModalVisible(false);
  };

  return (
    <View>
      <Pressable style={styles.selectGoalButton} onPress={() => setModalVisible(true)}>
        <Text style={styles.selectGoalButtonText}>Select Nutrients</Text>
      </Pressable>

      <ProgressChart
        data={chartData}
        width={Dimensions.get('window').width}
        height={200}
        strokeWidth={16}
        radius={30}
        chartConfig={{
          backgroundColor: '#f2f2f2',
          backgroundGradientFrom: '#f2f2f2',
          backgroundGradientTo: '#f2f2f2',
          decimalPlaces: 2,
          color: (opacity = 1) => `rgba(0, 122, 255, ${opacity})`,
          labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
        }}
        hideLegend={false}
      />
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={styles.centeredView}>
          <View style={styles.modalView}>
            <TouchableOpacity
              style={styles.closeButton}
              onPress={() => setModalVisible(false)}
            >
              <Text style={styles.closeButtonText}>×</Text>
            </TouchableOpacity>

            <ScrollView>
              {nutrients.map((nutrient, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.nutrientSelection,
                    selectedNutrients.includes(nutrient) && styles.nutrientSelected,
                  ]}
                  onPress={() => toggleNutrientSelection(nutrient)}
                >
                  <Text>{nutrient}</Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
            <Pressable
              style={[styles.button, styles.buttonClose]}
              onPress={applyNutrientsToChart}
            >
              <Text style={styles.textStyle}>Show Chart</Text>
            </Pressable>
          </View>
        </View>
      </Modal>

    </View>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      maxWidth: '80%',
      maxHeight: '60%',
  },
  nutrientSelection: {
    padding: 10,
    marginVertical: 2,
    borderWidth: 1,
    borderColor: "#ddd",
    width: 200,
  },
  nutrientSelected: {
    backgroundColor: "#e0e0e0",
  },
  buttonClose: {
    backgroundColor: "#2196F3",
    borderRadius: 20,
    width: 150,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center"
  },

  selectGoalButton: {
    backgroundColor: '#FF815E',
    marginTop: 0,
    justifyContent: "center",
    alignItems: "center",
    width: 150,
    marginLeft: 'auto',
    marginRight: 'auto',
    paddingVertical: 3,
    paddingHorizontal: 8,
    borderRadius: 10,
  },
  selectGoalButtonText: {
    fontSize: 12,
    textAlign: "center",
    color: "white",
    fontWeight: "bold",
  },
});
export default ProgressChartComponent;