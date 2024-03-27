import type { ReactElement } from 'react';
import React from 'react';
import type { TransformProps } from './types';
export default function extractGradient(props: {
    id?: string;
    children?: ReactElement[];
    transform?: TransformProps['transform'];
    gradientTransform?: TransformProps['transform'];
    gradientUnits?: 'objectBoundingBox' | 'userSpaceOnUse';
} & TransformProps, parent: {}): {
    name: string;
    gradient: number[];
    children: ReactElement<any, string | React.JSXElementConstructor<any>>[];
    gradientUnits: number;
    gradientTransform: import("./types").ColumnMajorTransformMatrix | null;
} | null;
//# sourceMappingURL=extractGradient.d.ts.map