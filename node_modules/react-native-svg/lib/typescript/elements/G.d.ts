import type { ReactNode } from 'react';
import type { CommonPathProps, FontProps, NumberProp, TransformProps } from '../lib/extract/types';
import Shape from './Shape';
export interface GProps extends CommonPathProps, FontProps {
    children?: ReactNode;
    opacity?: NumberProp;
}
export default class G<P> extends Shape<GProps & P> {
    static displayName: string;
    setNativeProps: (props: Object & {
        matrix?: number[];
    } & TransformProps) => void;
    render(): JSX.Element;
}
//# sourceMappingURL=G.d.ts.map