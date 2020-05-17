import React from 'react';
import {Camera} from 'expo-camera';
import {
  StyleSheet,
  TouchableWithoutFeedback,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import {Block, Icon} from 'galio-framework';

const {width, height} = Dimensions.get('window');

const {FlashMode: CameraFlashModes, Type: CameraTypes} = Camera.Constants;

const CameraToolbar = ({
  capturing = false,
  cameraType = CameraTypes.back,
  flashMode = CameraFlashModes.off,
  setFlashMode,
  setCameraType,
  onCaptureIn,
  onCaptureOut,
  onLongCapture,
  onShortCapture,
}) => (
  <Block style={styles.bottomToolbar}>
    <Block flex center row>
      <Block flex center>
        <TouchableOpacity
          onPress={() =>
            setFlashMode(
              flashMode === CameraFlashModes.on
                ? CameraFlashModes.off
                : CameraFlashModes.on,
            )
          }
        >
          <Icon
            family="ionicon"
            name={
              flashMode === CameraFlashModes.on ? 'md-flash' : 'md-flash-off'
            }
            color="white"
            size={30}
          />
        </TouchableOpacity>
      </Block>
      <Block flex center>
        <TouchableWithoutFeedback
          onPressIn={onCaptureIn}
          onPressOut={onCaptureOut}
          onLongPress={onLongCapture}
          onPress={onShortCapture}
        >
          <Block
            style={[styles.captureBtn, capturing && styles.captureBtnActive]}
          >
            {capturing && <Block style={styles.captureBtnInternal} />}
          </Block>
        </TouchableWithoutFeedback>
      </Block>
      <Block flex center>
        <TouchableOpacity
          onPress={() =>
            setCameraType(
              cameraType === CameraTypes.back
                ? CameraTypes.front
                : CameraTypes.back,
            )
          }
        >
          <Icon
            family="ionicon"
            name="md-reverse-camera"
            color="white"
            size={30}
          />
        </TouchableOpacity>
      </Block>
    </Block>
  </Block>
);

export default CameraToolbar;

const styles = StyleSheet.create({
  bottomToolbar: {
    width,
    position: 'absolute',
    height: 100,
    bottom: 0,
  },
  captureBtn: {
    width: 60,
    height: 60,
    borderWidth: 2,
    borderRadius: 60,
    borderColor: '#FFFFFF',
  },
  captureBtnActive: {
    width: 80,
    height: 80,
  },
  captureBtnInternal: {
    width: 76,
    height: 76,
    borderWidth: 2,
    borderRadius: 76,
    backgroundColor: 'red',
    borderColor: 'transparent',
  },
});
