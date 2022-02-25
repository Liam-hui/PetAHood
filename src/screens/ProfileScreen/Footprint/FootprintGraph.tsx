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

export default function FootprintGraph(props: any) {

  const { size, values } = props;

  const div = 4;
  const dist = 50 / div;

  const coor = (value: number, index: number) => {
    value = value * div;
    const angle = index * Math.PI * 2 / 3 - Math.PI / 2;
    const x = (value * dist * Math.cos(angle)) + 50;
    const y = (value * dist * Math.sin(angle)) + 50;
    return `${x},${y}`;
  }

  return (
    <View>
      <Svg height={size} width={size} viewBox="0 0 100 100">
        <Defs>
          <LinearGradient id="gradient" x1="0%" x2="100%" y1="0%" y2="100%" gradientUnits="userSpaceOnUse">
            <Stop offset="10%" stopColor="#F7682F"></Stop>
            <Stop offset="90%" stopColor="#FFCC3300" stopOpacity="0.5"></Stop>
          </LinearGradient>
        </Defs>
        {Array.from({ length: div }).map((x, i) => 
          <Ellipse
            cx="50"
            cy="50"
            rx={50 * (i + 1) / div}
            ry={50 * (i + 1) / div}
            stroke="#E5E5E5"
            strokeWidth="0.8"
            strokeDasharray="5 5"
          />
        )}
        <Line x1="50" y1="0" x2="50" y2="50" stroke="#E5E5E5" strokeWidth="0.8" strokeDasharray="5 5" />
        {/* <Line x1="0" y1="0" x2="100" y2="100" stroke="#E5E5E5" strokeWidth="0.8" /> */}
        {/* <Line x1="0" y1="0" x2="100" y2="100" stroke="#E5E5E5" strokeWidth="0.8" /> */}
        <Polygon
          points={`${coor(values[0], 0)} ${coor(values[1], 1)} ${coor(values[2], 2)}`}
          fill="url(#gradient)"
        />
      </Svg>
    </View>
  );
}

