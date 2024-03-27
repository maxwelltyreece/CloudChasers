export interface UseCircleValuesProps {
    radius: number;
    activeStrokeWidth: number;
    inActiveStrokeWidth: number;
}
export default function useCircleValues({ radius, activeStrokeWidth, inActiveStrokeWidth, }: UseCircleValuesProps): {
    inactiveCircleRadius: number;
    activeCircleRadius: number;
    circleCircumference: number;
};
