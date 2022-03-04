import styled from 'styled-components/native';
import Colors from '@/constants/Colors';

export const ContainerWithBorder = styled.View`
  background-color: ${Colors.orange};
  borderTopRightRadius: 24px;
  borderTopLeftRadius: 24px;
  borderBottomRightRadius: 24px;
`;

export const LabelText = styled.Text`
  font-size: 14px;
  margin-bottom: 4px;
`;

export const ValueText = styled.Text`
  font-size: 16px;
  font-weight: bold;
`;

