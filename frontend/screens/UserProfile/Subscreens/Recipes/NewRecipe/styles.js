import { StyleSheet, Dimensions } from 'react-native';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
  flexGrow: 1,
    justifyContent: 'space-between',
  paddingHorizontal: '5%',
  backgroundColor: '#FFFFFF',
  paddingVertical: 25,
  paddingTop: 10,
  zIndex: 1,
  },
  imagePreview: {
  width: 150,
  height: 150,
  resizeMode: 'contain',
  position: 'absolute',
  bottom: 80,
  alignSelf: 'center',
    borderRadius: 10,
  },
  formContainer: {
    alignItems: 'center',
    marginTop: 20,
  
  },
  backButton: {
    alignSelf: 'flex-start',
    marginBottom: 20,
  },
  backButtonText: {
    fontSize: 18,
    color: '#007bff',
  },
  headerText: {
    fontSize: 24,
    fontFamily: 'Montserrat_700Bold',
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    fontFamily: 'Montserrat_600SemiBold',
    height: 40,
    marginBottom: 20,
    borderRadius: 10,
    width: '80%',
    padding: 10,
    backgroundColor: '#FFFFFF',
  },
  submitButton: {
    backgroundColor: '#FF815E',
    paddingVertical: 12,
    paddingHorizontal: 10,
    borderRadius: 15,
    width: '60%',
    alignSelf: 'center',
    marginBottom: 2, // Ensures some space at the bottom
  },
  
  
  submitButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontFamily: 'Montserrat_700Bold',
    fontSize: 16,
  },
  text: {
    textAlign: "left",
    fontFamily: 'Montserrat_700Bold',
    fontSize: 20,
  },
  image: {
    width: '100%',
    height: 200,
    marginBottom: 20,
  },

    semiCircle: {
      width: width * 2.25,
      height: width * 1.75,
      borderRadius: width,
      position: 'absolute',
      top: -width,
      left: -(width * 2.25 - width) / 2,
      backgroundColor: '#F0F0F0',
      zIndex: -1, 
    },


    //Modal Styles

    centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      marginTop: 22,
    },
    modalView: {
      margin: 20,
      backgroundColor: "white",
      borderRadius: 20,
      padding: 35,
      width: 300,
      alignItems: "stretch", 
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
    },
    modalText: {
      marginBottom: 15,
      textAlign: "center",
      fontFamily: 'Montserrat_700Bold',
    },
    dropdownContainer: {
      paddingBottom: 10,


    },
    modalInput: {
      height: 40,
      marginBottom: 20,
      borderWidth: 1,
      padding: 10,
      width: 250,
      borderRadius: 10,
    },
    button: {
      borderRadius: 20,
      padding: 10,
      elevation: 2,
    },
    buttonClose: {
      backgroundColor: "#FF815E",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center",
    },
    
});