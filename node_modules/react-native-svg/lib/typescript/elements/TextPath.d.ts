/// <reference types="react" />
import type { ColumnMajorTransformMatrix, NumberProp, TextPathMethod, TextPathMidLine, TextPathSpacing, TextSpecificProps, TransformProps } from '../lib/extract/types';
import type { TextChild } from '../lib/extract/extractText';
import Shape from './Shape';
export interface TextPathProps extends TextSpecificProps {
    children?: TextChild;
    xlinkHref?: string;
    href?: string;
    startOffset?: NumberProp;
    method?: TextPathMethod;
    spacing?: TextPathSpacing;
    midLine?: TextPathMidLine;
    side?: string;
}
export default class TextPath extends Shape<TextPathProps> {
    static displayName: string;
    setNativeProps: (props: Object & {
        matrix?: ColumnMajorTransformMatrix;
        style?: [] | {};
    } & TransformProps) => void;
    render(): JSX.Element;
}
//# sourceMappingURL=TextPath.d.ts.map