import styled from 'styled-components/native';

export const HeadingText = styled.Text`
  font-weight: bold;
  font-size: 18px;
`;

export const Banner = styled.Image`
  width: 100%;
`;

export const FeaturesListContainer = styled.View`
  width: 100%;
  flex-direction: row;
  flex-wrap: wrap;
  margin-vertical: 10px;
`;


export const FeatureContainer = styled.TouchableOpacity`
  background-color: white;
  width: 74px;
  height: 96px;
  box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.08);
  border-radius: 25px;  
  margin-vertical: 5px;
  align-items: center;
  justify-content: center;
  padding-horizontal: 5px;
`;


export const FeatureLabel = styled.Text`
  font-size: 14px;
  font-weight: bold;
  line-height: 19px;
  text-align: center;
  color: #F7682F;
`;

export const InspirationContainer = styled.View`
  height: 120px;
  align-items: center;
  justify-content: center;
`;

export const InspirationText = styled.Text`
  font-size: 18px;
  font-weight: bold;
  color: white;
`;

