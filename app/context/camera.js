import React from 'react';
import {Platform} from 'react-native';

const CameraContext = React.createContext();
CameraContext.displayName = 'CameraContext';

function CameraProvider(props) {
  const [captures, setCaptures] = React.useState([]);

  const addCapture = (data, implementation, type = 'photo') => {
    // eslint-disable-next-line no-undef
    const form = new FormData();

    form.append('image_file', {
      name: `${Date.now()}.jpg`,
      type: 'image/jpeg',
      uri:
        Platform.OS === 'android' ? data.uri : data.uri.replace('file://', ''),
    });

    form.append('implementation', implementation);

    fetch(
      'http://192.168.1.49:1880/VAmodule',
      {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
        },
        body: form,
      },
    )
      .then(res => res.json())
      .then(({ result }) => {
        let classifiers;

        if (implementation === 'IBM') {
          classifiers = result.images[0].classifiers[0].classes;
        } else if (implementation === 'TESSERACT') {
          classifiers = result;
        }

        setCaptures([
          ...captures,
          {
            implementation,
            type,
            image: data,
            classifiers
          },
        ]);
      });
  };

  return (
    <CameraContext.Provider
      value={{
        captures,
        addCapture,
      }}
      {...props}
    />
  );
}

function useCamera() {
  const context = React.useContext(CameraContext);
  if (context === undefined) {
    throw new Error(`useCamera must be used within a CameraProvider`);
  }
  return context;
}

export {CameraProvider, useCamera};
