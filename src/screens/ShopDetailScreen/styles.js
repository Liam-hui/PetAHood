import styled from 'styled-components/native';
import Layout from '@/constants/Layout';

export const Card = styled.View`
  background-color: white;
  padding-horizontal: 20px;
  padding-vertical: 30px;
  border-radius: 10px;
  overflow: hidden;
`;

export const Sep = styled.View`
  background-color: #F1F5F9;
  height: 1px;
  width: 100%;
  margin-vertical: 5px;
`;

export const DarkSep = styled.View`
  background-color: #030335;
  height: 1px;
  opacity: 0.4;
  width: 100%;
  margin-vertical: 5px;
`;

export const Section = styled.View`
  width: 100%;
  margin-bottom: 15px;
  padding-horizontal: ${Layout.page.paddingHorizontal}px;
`;

export const Heading = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 12px;
`;

export const InfoText = styled.Text`
  flex: 1;
  margin-left: 10px;
  font-size: 14px;
  line-height: 18px;
`;
