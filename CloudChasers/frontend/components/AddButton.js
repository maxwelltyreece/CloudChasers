import React, { useState } from 'react';
import {
	View, Text, TouchableWithoutFeedback, StyleSheet, Modal,
} from 'react-native';
import Svg, { Path } from 'react-native-svg';
import PropTypes from 'prop-types';
import { useNavigation } from '@react-navigation/native';
import Modal from 'react-native-modal';

const CustomIcon = ({ width = 80, height = 82, startAnimation }) => {
    const [bubbleVisible, setBubbleVisible] = useState(false);
    const navigation = useNavigation();
    const handlePress = () => {
        setBubbleVisible(true);
        startAnimation(); // Start the animation
    };
    
    return (
        <View>
            <TouchableWithoutFeedback onPress={handlePress}>
            <Svg width={width} height={height} viewBox="0 0 80 82" fill="none">
                    <Path
                        d="M72.9816 14.2106C80.6197 23.9184 81.2327 36.9284 78.561 48.9885C75.9048 60.9786 69.8823 72.5196 58.8632 77.9412C47.8655 83.3523 35.0218 81.1582 23.9765 75.8451C13.0869 70.6068 3.96698 61.8531 1.04351 50.128C-1.91256 38.2721 1.6092 25.8768 9.11341 16.2339C16.6332 6.57095 27.7974 0.411021 40.0353 0.023339C52.6089 -0.374977 65.2027 4.32393 72.9816 14.2106Z"
                        fill="#FF815E"
                    />
                    <Path
                        fillRule="evenodd"
                        clipRule="evenodd"
                        d="M56.9196 35.1339H46.1161V24.3304C46.1161 21.3459 43.6974 18.9286 40.7143 18.9286C37.7312 18.9286 35.3125 21.3459 35.3125 24.3304V35.1339H24.5089C21.5258 35.1339 19.1071 37.5512 19.1071 40.5357C19.1071 43.5202 21.5258 45.9375 24.5089 45.9375H35.3125V56.7411C35.3125 59.7256 37.7312 62.1429 40.7143 62.1429C43.6974 62.1429 46.1161 59.7256 46.1161 56.7411V45.9375H56.9196C59.9028 45.9375 62.3214 43.5202 62.3214 40.5357C62.3214 37.5512 59.9028 35.1339 56.9196 35.1339Z"
                        fill="white"
                    />
                </Svg>
            </TouchableWithoutFeedback>
            <Modal
                isVisible={bubbleVisible}
                onBackdropPress={() => setBubbleVisible(false)}
                backdropTransitionOutTiming={0}
                animationIn="fadeIn"
                animationOut="fadeOut"
                backdropColor="rgba(0,0,0,0.2)" 
                animationInTiming={300}
                animationOutTiming={200}
            >
                <TouchableWithoutFeedback onPress={() => {
                    setBubbleVisible(false);
                    navigation.navigate('+'); 
                }}>
                    <View style={styles.bubble}>
                        <Text>This is a bubble!</Text>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>
        </View>
    );
};

const styles = StyleSheet.create({
	modal: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
	bubble: {
		position: 'absolute',
		width: 200,
		height: 100,
		backgroundColor: '#FF815E', // Same color as the fill of the icon
		borderRadius: 10,
		padding: 10,
		bottom: 90, // Adjust this value as needed
		alignSelf: 'center',
		alignItems: 'center',
		justifyContent: 'center',
		// Removed borderColor and borderWidth
	},
});

function CustomIcon({ width = 80, height = 82 }) {
	const [bubbleVisible, setBubbleVisible] = useState(false);
	const navigation = useNavigation();

	return (
		<View>
			<TouchableWithoutFeedback onPress={() => setBubbleVisible(true)}>
				<Svg width={width} height={height} viewBox="0 0 80 82" fill="none">
					<Path
						d="M72.9816 14.2106C80.6197 23.9184 81.2327 36.9284 78.561 48.9885C75.9048 60.9786 69.8823 72.5196 58.8632 77.9412C47.8655 83.3523 35.0218 81.1582 23.9765 75.8451C13.0869 70.6068 3.96698 61.8531 1.04351 50.128C-1.91256 38.2721 1.6092 25.8768 9.11341 16.2339C16.6332 6.57095 27.7974 0.411021 40.0353 0.023339C52.6089 -0.374977 65.2027 4.32393 72.9816 14.2106Z"
						fill="#FF815E"
					/>
					<Path
						fillRule="evenodd"
						clipRule="evenodd"
						d="M56.9196 35.1339H46.1161V24.3304C46.1161 21.3459 43.6974 18.9286 40.7143 18.9286C37.7312 18.9286 35.3125 21.3459 35.3125 24.3304V35.1339H24.5089C21.5258 35.1339 19.1071 37.5512 19.1071 40.5357C19.1071 43.5202 21.5258 45.9375 24.5089 45.9375H35.3125V56.7411C35.3125 59.7256 37.7312 62.1429 40.7143 62.1429C43.6974 62.1429 46.1161 59.7256 46.1161 56.7411V45.9375H56.9196C59.9028 45.9375 62.3214 43.5202 62.3214 40.5357C62.3214 37.5512 59.9028 35.1339 56.9196 35.1339Z"
						fill="white"
					/>
				</Svg>
			</TouchableWithoutFeedback>
			<Modal
				animationType="none"
				transparent
				visible={bubbleVisible}
				onRequestClose={() => setBubbleVisible(false)}
			>
				<TouchableWithoutFeedback onPress={() => setBubbleVisible(false)}>
					<View style={styles.modal}>
						<TouchableWithoutFeedback onPress={() => {
							setBubbleVisible(false);
							navigation.navigate('+');
						}}
						>
							<View style={styles.bubble}>
								<Text>This is a bubble!</Text>
							</View>
						</TouchableWithoutFeedback>
					</View>
				</TouchableWithoutFeedback>
			</Modal>
		</View>
	);
}

CustomIcon.propTypes = {
	width: PropTypes.number,
	height: PropTypes.number,
};

export default CustomIcon;
