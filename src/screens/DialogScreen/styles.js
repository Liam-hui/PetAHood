import Colors from '@/constants/Colors';
import styled from 'styled-components/native';

export const Button = styled.View`
  background-color: ${Colors.darkOrange};
  padding-vertical: 8px;
  padding-horizontal: 15px;
  margin-horizontal: 10px;
  border-radius: 20px;
`;

export const ButtonText = styled.Text`
  color: white;
`;
