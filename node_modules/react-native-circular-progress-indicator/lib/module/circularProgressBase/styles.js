import { StyleSheet } from 'react-native';

const styles = props => StyleSheet.create({
  container: {
    width: props.radius * 2,
    height: props.radius * 2,
    alignItems: 'center',
    justifyContent: 'center'
  },
  valueContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  rotatingContainer: {
    transform: [{
      rotate: `${props.rotation}deg`
    }]
  }
});

export default styles;
//# sourceMappingURL=styles.js.map