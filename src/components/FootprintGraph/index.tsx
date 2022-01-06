import * as React from 'react';
import { View } from 'react-native';
import Svg, {
  Circle,
  Ellipse,
  G,
  TSpan,
  TextPath,
  Path,
  Polygon,
  Polyline,
  Line,
  Rect,
  Use,
  Symbol,
  Defs,
  LinearGradient,
  RadialGradient,
  Stop,
  ClipPath,
  Pattern,
  Mask,
} from 'react-native-svg';


export type FootprintGraphType = {
  id: string;
  name: string;
};

// FootprintGraph({ data }: { data: FootprintGraphType[] })
export default function FootprintGraph() {

  const value1 = 1;
  const value2 = 4;
  const value3 = 3;
  const dist = 10;

  const coor = (value: number, index: number) => {
    const angle = index * Math.PI * 2 / 3 - Math.PI / 2;
    const x = (value * dist * Math.cos(angle)) + 50;
    const y = (value * dist * Math.sin(angle)) + 50;
    return `${x},${y}`;
  }

  return (
    <View>
      <Svg height="200" width="200" viewBox="0 0 100 100">
        <Defs>
          <LinearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="100%" gradientUnits="userSpaceOnUse">
            <Stop offset="10%" stopColor="#F7682F"></Stop>
            <Stop offset="90%" stopColor="#FFCC3300" stopOpacity="0.5"></Stop>
          </LinearGradient>
        </Defs>
        {Array.from({ length: 4 }).map((x, i) => 
          <Ellipse
            cx="50"
            cy="50"
            rx={(i + 1) * dist}
            ry={(i + 1) * dist}
            stroke="#E5E5E5"
            strokeWidth="0.8"
          />
        )}
        <Line x1="0" y1="0" x2="100" y2="100" stroke="#E5E5E5" strokeWidth="0.8" />
        <Line x1="0" y1="0" x2="100" y2="100" stroke="#E5E5E5" strokeWidth="0.8" />
        <Line x1="0" y1="0" x2="100" y2="100" stroke="#E5E5E5" strokeWidth="0.8" />
        <Polygon
          points={`${coor(value1, 0)} ${coor(value1, 1)} ${coor(value1, 2)}`}
          fill="url(#gradient)"
        />
      </Svg>
    </View>
  );
}

