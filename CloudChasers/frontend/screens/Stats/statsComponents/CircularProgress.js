import React from 'react';
import { CircularProgressBase } from 'react-native-circular-progress-indicator';


const CircularProgress = ({ value, radius, activeStrokeColor, inActiveStrokeColor }) => {
  const props = {
    activeStrokeWidth: 25,
    inActiveStrokeWidth: 25,
    inActiveStrokeOpacity: 0.2
  };

  return (
    <CircularProgressBase
    {...props}
    value={80}
    radius={125}
    activeStrokeColor={'#e84118'}
    inActiveStrokeColor={'#e84118'}
    >
        <CircularProgressBase
            {...props}
            value={87}
            radius={100}
            activeStrokeColor={'#badc58'}
            inActiveStrokeColor={'#badc58'}
        >
            <CircularProgressBase
            {...props}
            value={62}
            radius={75}
            activeStrokeColor={'#18dcff'}
            inActiveStrokeColor={'#18dcff'}
            />
        </CircularProgressBase>
</CircularProgressBase>
  );
};

export default CircularProgress;
