import styled from 'styled-components/native';
import Colors from '@/constants/Colors';

export const BorderItemWrapper = styled.View`
  flexDirection: row;
  flexWrap: wrap;
`;

export const BorderItem = styled.View`
  borderWidth: 1px;
  borderColor: ${Colors.darkBlue};
  height: 28px;
  borderRadius: 14px;
  paddingHorizontal: 15px;
  justifyContent: center;
  alignItems: center;
  marginVertical: 4px;
  marginHorizontal: 3px;
`;

export const BorderItemText = styled.Text`
  color: ${Colors.darkBlue};
  fontSize: 13px;
`;

