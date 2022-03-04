import styled from 'styled-components/native';
import Colors from '@/constants/Colors';

export const LabelText = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 10px;
`;

export const ValueText = styled.Text`

`;

export const ErrorText = styled.Text`
  font-size: 12px
  margin-top: 4px;

`;

export const Container = styled.View`
  margin-bottom: 25px;
`;

export const InputContainer = styled.View`
  backgroundColor: white;
  borderColor: ${Colors.orange};
  borderWidth: 1px;
  paddingVertical: 10px;
  paddingHorizontal: 5px;
  borderRadius: 4px;
`;

