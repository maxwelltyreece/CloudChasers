/// <reference types="react" />
import Shape from './Shape';
import type { CommonPathProps, NumberProp } from '../lib/extract/types';
export interface PolygonProps extends CommonPathProps {
    opacity?: NumberProp;
    points?: string | ReadonlyArray<NumberProp>;
}
export default class Polygon extends Shape<PolygonProps> {
    static displayName: string;
    static defaultProps: {
        points: string;
    };
    setNativeProps: (props: Object & {
        points?: string | NumberProp[];
        d?: string;
    }) => void;
    render(): JSX.Element;
}
//# sourceMappingURL=Polygon.d.ts.map