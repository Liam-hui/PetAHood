import styled from 'styled-components/native';

export const Row = styled.View`
  flex-direction: row;
  align-items: center;
`;

export const NameText = styled.Text`
  color: #030335;
  font-weight: bold;
  font-size: 20px;
  margin-bottom: 8px;
`;

export const LinkText = styled.Text`
  color: #030335;
  font-size: 12px;  
  textDecorationLine: underline;
`;

export const LabelText = styled.Text`
  color: #030335;
  font-size: 16px;
  margin-bottom: 5px;
`;

export const NumberText = styled.Text`
  color: #030335;
  font-weight: bold;
  font-size: 18px;
  margin-bottom: 8px;
`;

export const Shadow = styled.View`
  backgroundColor: white;
  shadowColor: black;
  shadowOpacity: 0.27;
  shadowRadius: 4.65;
  elevation: 6;
  width: 64px; 
  height: 64px;
  borderRadius: 32px;
  marginRight: 10px;
`;

export const CircleImage = styled.Image`
  width: 64px; 
  height: 64px;
  borderRadius: 32px;
  borderWidth: 2px;
  borderColor: white;
  overflow: hidden;
`;

export const Border = styled.View`
  height: 2px;
  background: #F1F5F9;
  width: 100%;
  marginVertical: 10px;
`;
