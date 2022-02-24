import styled from 'styled-components/native';
import Layout from '@/constants/Layout';
import Colors from '@/constants/Colors';

export const ModalContainer = styled.View`
  flex: 1;
  background-color: ${Colors.lightBlue};
`;

export const ContentContainer = styled.View`
  background-color: white;
  flex: 1;
  margin-horizontal: ${Layout.page.paddingHorizontal}px;
  padding-horizontal: ${Layout.page.paddingHorizontal}px;
  padding-vertical: 20px;
  border-radius: 10px;
`;

export const Heading = styled.Text`
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 15px;
`;

export const FieldName = styled.Text`
  font-weight: bold;
  font-size: 14px;
  margin-bottom: 8px;
`;

