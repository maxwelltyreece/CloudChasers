import type { StrokeColorConfigType } from '../types';
export interface UseAnimatedValueProps {
    value: number;
    initialValue?: number;
    radius?: number;
    duration?: number;
    delay?: number;
    maxValue?: number;
    onAnimationComplete?: () => void;
    activeStrokeWidth?: number;
    inActiveStrokeWidth?: number;
    clockwise?: boolean;
    startInPausedState?: boolean;
    valueSuffix?: string;
    valuePrefix?: string;
    progressFormatter?: (v: number) => number | string;
    strokeColorConfig?: StrokeColorConfigType[];
}
export default function useAnimatedValue({ initialValue, radius, maxValue, clockwise, startInPausedState, delay, value, duration, onAnimationComplete, activeStrokeWidth, inActiveStrokeWidth, progressFormatter, strokeColorConfig, }: UseAnimatedValueProps): {
    animatedCircleProps: Partial<{
        strokeDashoffset: number;
        stroke: string | number;
    }>;
    animatedTextProps: Partial<{}>;
    progressValue: Readonly<{
        value: string;
    }>;
    pause: () => void;
    play: () => void;
    reAnimate: () => void;
};
