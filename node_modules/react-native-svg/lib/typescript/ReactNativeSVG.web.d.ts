import * as React from 'react';
import type { GestureResponderEvent } from 'react-native';
import type { NumberArray, NumberProp, TransformProps } from './lib/extract/types';
type BlurEvent = Object;
type FocusEvent = Object;
type PressEvent = Object;
type LayoutEvent = Object;
type EdgeInsetsProp = Object;
interface BaseProps {
    accessible?: boolean;
    accessibilityLabel?: string;
    accessibilityHint?: string;
    accessibilityIgnoresInvertColors?: boolean;
    accessibilityRole?: string;
    accessibilityState?: Object;
    delayLongPress?: number;
    delayPressIn?: number;
    delayPressOut?: number;
    disabled?: boolean;
    hitSlop?: EdgeInsetsProp;
    nativeID?: string;
    touchSoundDisabled?: boolean;
    onBlur?: (e: BlurEvent) => void;
    onFocus?: (e: FocusEvent) => void;
    onLayout?: (event: LayoutEvent) => object;
    onLongPress?: (event: PressEvent) => object;
    onClick?: (event: PressEvent) => object;
    onPress?: (event: PressEvent) => object;
    onPressIn?: (event: PressEvent) => object;
    onPressOut?: (event: PressEvent) => object;
    pressRetentionOffset?: EdgeInsetsProp;
    rejectResponderTermination?: boolean;
    transform?: TransformProps['transform'];
    translate?: NumberArray;
    translateX?: NumberProp;
    translateY?: NumberProp;
    scale?: NumberArray;
    scaleX?: NumberProp;
    scaleY?: NumberProp;
    rotation?: NumberProp;
    skewX?: NumberProp;
    skewY?: NumberProp;
    origin?: NumberArray;
    originX?: NumberProp;
    originY?: NumberProp;
    fontStyle?: string;
    fontWeight?: NumberProp;
    fontSize?: NumberProp;
    fontFamily?: string;
    forwardedRef?: React.RefCallback<SVGElement> | React.MutableRefObject<SVGElement | null>;
    style: Iterable<{}>;
    gradientTransform: TransformProps['transform'];
    patternTransform: TransformProps['transform'];
}
export declare class WebShape<P extends BaseProps = BaseProps, C = {}> extends React.Component<P, C> {
    [x: string]: unknown;
    protected tag?: React.ElementType;
    protected prepareProps(props: P): P;
    elementRef: React.MutableRefObject<SVGElement | null>;
    lastMergedProps: Partial<P>;
    /**
     * disclaimer: I am not sure why the props are wrapped in a `style` attribute here, but that's how reanimated calls it
     */
    setNativeProps(props: {
        style: P;
    }): void;
    _remeasureMetricsOnActivation: () => void;
    touchableHandleStartShouldSetResponder?: (e: GestureResponderEvent) => boolean;
    touchableHandleResponderMove?: (e: GestureResponderEvent) => void;
    touchableHandleResponderGrant?: (e: GestureResponderEvent) => void;
    touchableHandleResponderRelease?: (e: GestureResponderEvent) => void;
    touchableHandleResponderTerminate?: (e: GestureResponderEvent) => void;
    touchableHandleResponderTerminationRequest?: (e: GestureResponderEvent) => boolean;
    constructor(props: P, context: C);
    render(): JSX.Element;
}
export declare class Circle extends WebShape {
    tag: "circle";
}
export declare class ClipPath extends WebShape {
    tag: "clipPath";
}
export declare class Defs extends WebShape {
    tag: "defs";
}
export declare class Ellipse extends WebShape {
    tag: "ellipse";
}
export declare class G extends WebShape<BaseProps & {
    x?: NumberProp;
    y?: NumberProp;
    translate?: string;
}> {
    tag: "g";
    prepareProps(props: BaseProps & {
        x?: NumberProp;
        y?: NumberProp;
        translate?: string;
    }): {
        accessible?: boolean | undefined;
        accessibilityLabel?: string | undefined;
        accessibilityHint?: string | undefined;
        accessibilityIgnoresInvertColors?: boolean | undefined;
        accessibilityRole?: string | undefined;
        accessibilityState?: Object | undefined;
        delayLongPress?: number | undefined;
        delayPressIn?: number | undefined;
        delayPressOut?: number | undefined;
        disabled?: boolean | undefined;
        hitSlop?: Object | undefined;
        nativeID?: string | undefined;
        touchSoundDisabled?: boolean | undefined;
        onBlur?: ((e: Object) => void) | undefined;
        onFocus?: ((e: Object) => void) | undefined;
        onLayout?: ((event: Object) => object) | undefined;
        onLongPress?: ((event: Object) => object) | undefined;
        onClick?: ((event: Object) => object) | undefined;
        onPress?: ((event: Object) => object) | undefined;
        onPressIn?: ((event: Object) => object) | undefined;
        onPressOut?: ((event: Object) => object) | undefined;
        pressRetentionOffset?: Object | undefined;
        rejectResponderTermination?: boolean | undefined;
        transform?: string | (import("react-native").PerpectiveTransform | import("react-native").RotateTransform | import("react-native").RotateXTransform | import("react-native").RotateYTransform | import("react-native").RotateZTransform | import("react-native").ScaleTransform | import("react-native").ScaleXTransform | import("react-native").ScaleYTransform | import("react-native").TranslateXTransform | import("react-native").TranslateYTransform | import("react-native").SkewXTransform | import("react-native").SkewYTransform | import("react-native").MatrixTransform)[] | import("./lib/extract/types").ColumnMajorTransformMatrix | undefined;
        translate?: (NumberArray & string) | undefined;
        translateX?: NumberProp | undefined;
        translateY?: NumberProp | undefined;
        scale?: NumberArray | undefined;
        scaleX?: NumberProp | undefined;
        scaleY?: NumberProp | undefined;
        rotation?: NumberProp | undefined;
        skewX?: NumberProp | undefined;
        skewY?: NumberProp | undefined;
        origin?: NumberArray | undefined;
        originX?: NumberProp | undefined;
        originY?: NumberProp | undefined;
        fontStyle?: string | undefined;
        fontWeight?: NumberProp | undefined;
        fontSize?: NumberProp | undefined;
        fontFamily?: string | undefined;
        forwardedRef?: ((instance: SVGElement | null) => void) | React.MutableRefObject<SVGElement | null> | undefined;
        style: Iterable<{}>;
        gradientTransform: string | (import("react-native").PerpectiveTransform | import("react-native").RotateTransform | import("react-native").RotateXTransform | import("react-native").RotateYTransform | import("react-native").RotateZTransform | import("react-native").ScaleTransform | import("react-native").ScaleXTransform | import("react-native").ScaleYTransform | import("react-native").TranslateXTransform | import("react-native").TranslateYTransform | import("react-native").SkewXTransform | import("react-native").SkewYTransform | import("react-native").MatrixTransform)[] | import("./lib/extract/types").ColumnMajorTransformMatrix | undefined;
        patternTransform: string | (import("react-native").PerpectiveTransform | import("react-native").RotateTransform | import("react-native").RotateXTransform | import("react-native").RotateYTransform | import("react-native").RotateZTransform | import("react-native").ScaleTransform | import("react-native").ScaleXTransform | import("react-native").ScaleYTransform | import("react-native").TranslateXTransform | import("react-native").TranslateYTransform | import("react-native").SkewXTransform | import("react-native").SkewYTransform | import("react-native").MatrixTransform)[] | import("./lib/extract/types").ColumnMajorTransformMatrix | undefined;
    };
}
export declare class Image extends WebShape {
    tag: "image";
}
export declare class Line extends WebShape {
    tag: "line";
}
export declare class LinearGradient extends WebShape {
    tag: "linearGradient";
}
export declare class Path extends WebShape {
    tag: "path";
}
export declare class Polygon extends WebShape {
    tag: "polygon";
}
export declare class Polyline extends WebShape {
    tag: "polyline";
}
export declare class RadialGradient extends WebShape {
    tag: "radialGradient";
}
export declare class Rect extends WebShape {
    tag: "rect";
}
export declare class Stop extends WebShape {
    tag: "stop";
}
export declare class Svg extends WebShape {
    tag: "svg";
}
export declare class Symbol extends WebShape {
    tag: "symbol";
}
export declare class Text extends WebShape {
    tag: "text";
}
export declare class TSpan extends WebShape {
    tag: "tspan";
}
export declare class TextPath extends WebShape {
    tag: "textPath";
}
export declare class Use extends WebShape {
    tag: "use";
}
export declare class Mask extends WebShape {
    tag: "mask";
}
export declare class ForeignObject extends WebShape {
    tag: "foreignObject";
}
export declare class Marker extends WebShape {
    tag: "marker";
}
export declare class Pattern extends WebShape {
    tag: "pattern";
}
export default Svg;
//# sourceMappingURL=ReactNativeSVG.web.d.ts.map