import React, {useState, useEffect, useRef} from 'react';
import {Camera as ExpoCamera} from 'expo-camera';
import {Block, Text} from 'galio-framework';
import * as Permissions from 'expo-permissions';
import {StyleSheet} from 'react-native';

import CameraToolbar from '../components/CameraToolbar';
import {useCamera} from '../context/camera';

export default function Camera({ route }) {
  const {addCapture} = useCamera();
  const cameraRef = useRef(null);
  const [hasPermission, setHasPermission] = useState(null);
  const [cameraType, setCameraType] = useState(ExpoCamera.Constants.Type.back);
  const [flashMode, setFlashMode] = useState(
    ExpoCamera.Constants.FlashMode.off,
  );
  const [capturing, setCapturing] = useState(false);

  useEffect(() => {
    (async () => {
      const camera = await Permissions.askAsync(Permissions.CAMERA);
      const audio = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
      setHasPermission(
        camera.status === 'granted' && audio.status === 'granted',
      );
    })();
  }, []);

  const handleCaptureIn = () => setCapturing(true);

  const handleCaptureOut = () => {
    if (capturing) cameraRef.current.stopRecording();
  };

  const handleShortCapture = async () => {
    const photoData = await cameraRef.current.takePictureAsync({
      quality: 0.3,
    });
    addCapture(photoData, route.params.implementation);
    setCapturing(false);
  };

  const handleLongCapture = async () => {
    const videoData = await cameraRef.current.recordAsync();
    addCapture(videoData, route.params.implementation, 'video');
    setCapturing(false);
  };

  if (hasPermission === null) {
    return <Block />;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <Block flex>
      <ExpoCamera
        style={{flex: 1}}
        type={cameraType}
        flashMode={flashMode}
        ref={cameraRef}
      />
      <CameraToolbar
        capturing={capturing}
        flashMode={flashMode}
        cameraType={cameraType}
        setFlashMode={setFlashMode}
        setCameraType={setCameraType}
        onCaptureIn={handleCaptureIn}
        onCaptureOut={handleCaptureOut}
        onLongCapture={handleLongCapture}
        onShortCapture={handleShortCapture}
      />
    </Block>
  );
}

const styles = StyleSheet.create({});
