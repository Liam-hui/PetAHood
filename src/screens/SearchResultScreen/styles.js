import styled from 'styled-components/native';
import Colors from '@/constants/Colors';
import Layout from '@/constants/Layout';

export const OptionBar = styled.View`
  flex-direction: row;
  width: ${Layout.window.width}px;
  justify-content: space-around;
  padding-horizontal: 15px;
`;

export const OptionButton = styled.View`
  flex-direction: row;
  align-items: center;
  align-self: flex-start;
  height: 20px;
`;

export const OptionText = styled.Text`
  font-weight: bold;
  color: ${Colors.darkOrange};
`;

export const MenuHeading = styled.Text`
  font-weight: bold;
  color: ${Colors.darkOrange};
  font-size: 18px;
`;

export const MenuItemText = styled.Text`
  font-weight: bold;
  font-size: 16px;
`;

export const FilterItem = styled.TouchableOpacity`
  border-color: ${Colors.darkOrange};
  border-width: 1px;
  border-radius: 4px;
  width: 30%;
  height: 35px;
  justify-content: center;
  padding-horizontal: 5px;
  margin-vertical: 5px;
`;

export const FilterItemText = styled.Text`
  color: ${Colors.darkOrange};  
  text-align: center;
  font-weight: 500;
  font-size: 16px;
`;

export const Border = styled.View`
  background-color: #030335;
  width: 100%;
  height: 1px;
  margin-vertical: 20px;
`;



