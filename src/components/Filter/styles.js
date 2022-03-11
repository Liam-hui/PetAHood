import styled from 'styled-components/native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

export const TabContainer = styled.View`
  flex: 1;
  padding-top: 10px;
`;

export const BorderItemWrapper = styled.View`
  flexDirection: row;
  flexWrap: wrap;
`;

export const BorderItem = styled.View`
  borderWidth: 1px;
  borderColor: ${Colors.darkBlue};
  height: 28px;
  borderRadius: 14px;
  padding-horizontal: 15px;
  justify-content: center;
  alignItems: center;
  marginVertical: 4px;
  marginHorizontal: 3px;
`;

export const BorderItemText = styled.Text`
  color: ${Colors.darkBlue};
  font-size: 13px;
`;