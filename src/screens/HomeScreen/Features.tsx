

import React from 'react';
import Layout from '@/constants/Layout';
import { Image, ImageSourcePropType } from 'react-native';

import { FeaturesListContainer, FeatureLabel, FeatureContainer } from './styles';

export default function Features() {

  return (
    <FeaturesListContainer style={{ paddingLeft: 15 }}>
      <FeatureItem
        label="Member Offers"
        icon={require("../../assets/icons/icon-features-offers.png")} 
        onPress={() => {}}
      />
      <FeatureItem
        label="Ticketing"
        icon={require("../../assets/icons/icon-features-ticket.png")} 
        onPress={() => {}}
      />
      <FeatureItem
        label="Deals"
        icon={require("../../assets/icons/icon-features-deals.png")} 
        onPress={() => {}}
      />
      <FeatureItem
        label="Event"
        icon={require("../../assets/icons/icon-features-event.png")} 
        onPress={() => {}}
      />
      <FeatureItem
        label="Add New Location"
        icon={require("../../assets/icons/icon-features-newLocation.png")} 
        onPress={() => {}}
      />
      <FeatureItem
        label="Finding Friends"
        icon={require("../../assets/icons/icon-features-findFriends.png")} 
        onPress={() => {}}
      />
      <FeatureItem
        label="Create Pet’s Party"
        icon={require("../../assets/icons/icon-features-party.png")} 
        onPress={() => {}}
      />
    </FeaturesListContainer>
  );
}

const FeatureItem = ({ label, icon, onPress }: { label: string, icon: ImageSourcePropType, onPress: () => void }) => {
  return (
    <FeatureContainer style={{ width: (Layout.window.width - 15) / 4 - 15, marginRight: 15 }} onPress={onPress} activeOpacity={0.6} >
      <Image 
        style={{ height: 32, marginBottom: 5 }}
        resizeMode="contain"
        source={icon} 
      />
      <FeatureLabel>{label}</FeatureLabel>
    </FeatureContainer>
  )
}
