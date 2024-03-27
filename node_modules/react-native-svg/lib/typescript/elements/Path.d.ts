/// <reference types="react" />
import Shape from './Shape';
import type { CommonPathProps, NumberProp } from '../lib/extract/types';
export interface PathProps extends CommonPathProps {
    d?: string;
    opacity?: NumberProp;
}
export default class Path extends Shape<PathProps> {
    static displayName: string;
    render(): JSX.Element;
}
//# sourceMappingURL=Path.d.ts.map