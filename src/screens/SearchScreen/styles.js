import styled from 'styled-components/native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

export const TabContainer = styled.View`
  flex: 1;
  padding-top: 10px;
  padding-horizontal: ${Layout.page.paddingHorizontal}px;
`;

export const NearBy = styled.View`
  flex-direction: row;
  align-items: center;
  background-color: white;
  padding-vertical: 15px;
  padding-horizontal: 20px;
  border-radius: 20px;
  margin-bottom: 25px;
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

export const BorderItemLarge = styled.View`
  borderWidth: 1px;
  borderColor: ${Colors.orange};
  height: 32px;
  borderRadius: 14px;
  padding-horizontal: 15px;
  justify-content: center;
  alignItems: center;
  marginVertical: 4px;
  marginHorizontal: 3px;
`;

export const BorderItemLargeText = styled.Text`
  color: ${Colors.orange};
  font-size: 13px;
  font-weight: bold;
`;

export const HotPicksContainer = styled.View`
  background-color: white;
  border-radius: 10px;
  width: 280px;
  overflow: hidden;
  margin-right: 20px;
`;

