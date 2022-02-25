import React, { useState } from 'react';
import { Text } from '@/components/Themed';
import Colors from '@/constants/Colors';

export default function ReadMoreText({ numberOfLines, children, style }: { numberOfLines: number, children: React.ReactNode, style?: object }) {

  const [lines, setLines] = useState<any[]>([]);
  const [isShown, setIsShown] = useState(false);
  
  const onTextLayout = (e: any) => {
    setLines(e.nativeEvent.lines);
  };
  
  return (
    <>
      {lines.length == 0 &&
        <Text style={{ ...style, opacity: 0, position: "absolute", width: "100%" }} onTextLayout={onTextLayout}>
          {children}
        </Text>
      }

      {(lines.length > 0 && lines.length > numberOfLines) &&
        <Text style={{ ...style }}>
          {isShown
            ? <>
              {children}
              <Text 
                  style={{ ...style, color: Colors.orange, }}
                  onPress={() => {
                    setIsShown(false);
                  }}
                >
                  {"\nShow less"}
                </Text>
            </> 
            : <>
                {lines.slice(0, numberOfLines).reduce((text: string, line: any) => text + line.text, "").slice(0, -9)}
                <Text 
                  style={{ ...style, color: Colors.orange }}
                  onPress={() => {
                    setIsShown(true);
                  }}
                >
                  {"  ...more"}
                </Text>
            </>
          }
        </Text>
      }

      {(lines.length > 0 && lines.length <= numberOfLines) &&
        <Text style={style}>{children}</Text>
      }

    </>
  );
}

