import { useCallback, useMemo } from 'react';
export default function useCircleValues(_ref) {
  let {
    radius,
    activeStrokeWidth,
    inActiveStrokeWidth
  } = _ref;
  const isSameStrokeWidth = useMemo(() => activeStrokeWidth === inActiveStrokeWidth, [activeStrokeWidth, inActiveStrokeWidth]);
  const isActiveStrokeBigger = useMemo(() => {
    return activeStrokeWidth > inActiveStrokeWidth;
  }, [activeStrokeWidth, inActiveStrokeWidth]);
  const findRadius = useCallback(() => {
    if (isSameStrokeWidth) {
      return radius + inActiveStrokeWidth / 2;
    }

    if (isActiveStrokeBigger) {
      return radius + activeStrokeWidth / 2;
    }

    return radius + inActiveStrokeWidth / 2;
  }, [isSameStrokeWidth, isActiveStrokeBigger, radius, inActiveStrokeWidth, activeStrokeWidth]);
  const inactiveCircleRadius = useMemo(() => findRadius(), [findRadius]);
  const activeCircleRadius = useMemo(() => findRadius(), [findRadius]);
  const circleCircumference = useMemo(() => 2 * Math.PI * activeCircleRadius, [activeCircleRadius]);
  return {
    inactiveCircleRadius,
    activeCircleRadius,
    circleCircumference
  };
}
//# sourceMappingURL=useCircleValues.js.map