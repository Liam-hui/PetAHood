import styled from 'styled-components/native';

export const Card = styled.View`
  background-color: white;
  padding-horizontal: 20px;
  padding-vertical: 30px;
  border-radius: 10px;
  overflow: hidden;
`;

export const Sep = styled.View`
  background-color: #E5E5E5;
  height: 1px;
  width: 100%;
  margin-vertical: 5px;
`;

export const Section = styled.View`
  padding-horizontal: 20px;
  margin-vertical: 10px;
`;

export const Heading = styled.Text`
  font-size: 18px;
  font-weight: bold;
`;

export const InfoRow = styled.View`
  flex-direction: row;
  align-items: center;
  margin-vertical: 8px;
`;

export const InfoText = styled.Text`
  margin-left: 10px;
  font-size: 14px;
  line-height: 25px;
`;
