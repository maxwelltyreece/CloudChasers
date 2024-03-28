import { StyleSheet } from 'react-native';
import globalStyles from '../../../../styles/global';

export const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 0,
    },
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingHorizontal: 10,
        paddingVertical: 24,
    },
    label: {
        fontSize: 14,
        ...globalStyles.bold,
    },
    separator: {
        height: 1,
        backgroundColor: '#A9A9A9',
        width: '100%',
    },
    profilePictureContainer: {
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
    },
    profilePicture: {
        width: 150,
        height: 150,
        borderRadius: 75,
        backgroundColor: '#DDDDDD',
    },
    cameraIcon: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        color: 'rgba(0, 0, 0, 0.7)',
        borderRadius: 15,
    },
});
