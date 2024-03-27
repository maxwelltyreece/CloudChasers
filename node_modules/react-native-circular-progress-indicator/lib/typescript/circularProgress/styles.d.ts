import type { TextStyle } from 'react-native';
declare type StyleProps = {
    radius: number;
    progressValueColor?: string;
    progressValueFontSize?: number;
    progressValueStyle?: TextStyle;
    activeStrokeColor?: string;
    titleStyle?: TextStyle;
    titleColor?: string;
    titleFontSize?: number;
    showProgressValue?: boolean;
    subtitleColor?: string;
    subtitleFontSize?: number;
    subtitleStyle: TextStyle;
    rotation: number;
};
declare const styles: (props: StyleProps) => {
    container: {
        width: number;
        height: number;
        alignItems: "center";
        justifyContent: "center";
    };
    valueContainer: {
        flex: number;
        alignItems: "center";
        justifyContent: "center";
    };
    valueContainerRow: {
        flexDirection: "row";
        alignItems: "center";
    };
    rotatingContainer: {
        transform: {
            rotate: string;
        }[];
    };
    fromProps: {
        fontSize: number;
        color: import("react-native").ColorValue | undefined;
    };
    input: {
        fontWeight: "bold";
        textAlign: "center";
    };
    title: {
        textAlign: "center";
        width: string;
        marginTop: number;
        color: import("react-native").ColorValue | undefined;
        fontSize: number;
    };
    subtitle: {
        color: import("react-native").ColorValue | undefined;
        fontSize: number;
    };
};
export default styles;
