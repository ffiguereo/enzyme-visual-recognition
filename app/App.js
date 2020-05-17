/* eslint-disable react/state-in-constructor */
import React from 'react';
import {Image} from 'react-native';
import {AppLoading} from 'expo';
import {Asset} from 'expo-asset';
import {Block, GalioProvider} from 'galio-framework';
import {NavigationContainer} from '@react-navigation/native';
import {enableScreens} from 'react-native-screens';

import Screens from './navigation/Screens';
import {Images, articles, argonTheme} from './constants';
import {CameraProvider} from './context/camera';

enableScreens();

// cache app images
const assetImages = [
  Images.Onboarding,
  Images.LogoOnboarding,
  Images.Logo,
  Images.Pro,
  Images.ArgonLogo,
  Images.iOSLogo,
  Images.androidLogo,
];

// cache product images
articles.map(article => assetImages.push(article.image));

function cacheImages(images) {
  return images.map(image => {
    if (typeof image === 'string') {
      return Image.prefetch(image);
    }
    return Asset.fromModule(image).downloadAsync();
  });
}

export default class App extends React.Component {
  state = {
    isLoadingComplete: false,
  };

  loadResourcesAsync = async () => {
    return Promise.all([...cacheImages(assetImages)]);
  };

  handleLoadingError = error => {
    // In this case, you might want to report the error to your error
    // reporting service, for example Sentry
    console.warn(error);
  };

  handleFinishLoading = () => {
    this.setState({isLoadingComplete: true});
  };

  render() {
    const {isLoadingComplete} = this.state;

    if (!isLoadingComplete) {
      return (
        <AppLoading
          startAsync={this.loadResourcesAsync}
          onError={this.handleLoadingError}
          onFinish={this.handleFinishLoading}
        />
      );
    }

    return (
      <CameraProvider>
        <NavigationContainer>
          <GalioProvider theme={argonTheme}>
            <Block flex>
              <Screens />
            </Block>
          </GalioProvider>
        </NavigationContainer>
      </CameraProvider>
    );
  }
}
