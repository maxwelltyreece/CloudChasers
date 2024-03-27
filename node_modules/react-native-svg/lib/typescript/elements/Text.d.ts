import type { ReactNode } from 'react';
import type { ColumnMajorTransformMatrix, NumberArray, NumberProp, TextSpecificProps, TransformProps } from '../lib/extract/types';
import Shape from './Shape';
import './TSpan';
export interface TextProps extends TextSpecificProps {
    children?: ReactNode;
    x?: NumberArray;
    y?: NumberArray;
    dx?: NumberArray;
    dy?: NumberArray;
    rotate?: NumberArray;
    opacity?: NumberProp;
    inlineSize?: NumberProp;
}
export default class Text extends Shape<TextProps> {
    static displayName: string;
    setNativeProps: (props: Object & {
        matrix?: ColumnMajorTransformMatrix;
        style?: [] | {};
    } & TransformProps) => void;
    render(): JSX.Element;
}
//# sourceMappingURL=Text.d.ts.map