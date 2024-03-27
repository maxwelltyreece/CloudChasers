import type { TextStyle } from 'react-native';
declare type StyleProps = {
    radius: number;
    progressValueColor?: string;
    progressValueFontSize?: number;
    progressValueStyle?: TextStyle;
    activeStrokeColor?: string;
};
declare const styles: (props: StyleProps) => {
    fromProps: {
        fontSize: number;
        color: import("react-native").ColorValue | undefined;
    };
    input: {
        fontWeight: "bold";
        textAlign: "center";
        padding: number;
    };
};
export default styles;
