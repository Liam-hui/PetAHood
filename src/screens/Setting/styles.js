import styled from 'styled-components/native';
import Colors from '@/constants/Colors';

export const SettingItem = styled.TouchableOpacity`
  width: 100%;
  flex-direction: row;
  align-items: center;
  padding-horizontal: 24px;
  padding-vertical: 13px;
  background-color: #FFFFFF;
  margin-vertical: 0.5px;
`;

export const SettingItemText = styled.Text`
  font-size: 16px;
  color: ${Colors.darkBlue};
`;