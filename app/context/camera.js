import React from 'react';
import {Platform} from 'react-native';
import {Buffer} from 'buffer';

const CameraContext = React.createContext();
CameraContext.displayName = 'CameraContext';

function CameraProvider(props) {
  const [captures, setCaptures] = React.useState([]);

  const addCapture = (data, type = 'photo') => {
    // eslint-disable-next-line no-undef
    const form = new FormData();

    form.append('images_file', {
      name: `${Date.now()}.jpg`,
      type: 'image/jpeg',
      uri:
        Platform.OS === 'android' ? data.uri : data.uri.replace('file://', ''),
    });
    form.append('threshold', 0.6);
    form.append('classifier_ids', 'default');
    const apiKey = 'fR6RwQPMRWAjtNaAvaqdPlTsN3t0StYsJAat4CMCNxER';

    fetch(
      'https://gateway.watsonplatform.net/visual-recognition/api/v3/classify?version=2018-03-19',
      {
        method: 'post',
        headers: {
          'Content-Type': 'multipart/form-data',
          Accept: 'application/json',
          Authorization: `Basic ${Buffer.from(`apiKey:${apiKey}`).toString(
            'base64',
          )}`,
        },
        body: form,
      },
    )
      .then(res => res.json())
      .then(res => {
        console.log('KASFHPASIUHFA', res);
        setCaptures([
          ...captures,
          {
            type,
            image: data,
            classifiers: res.images[0].classifiers[0].classes,
          },
        ]);
      })
      .catch(err => {
        console.log('......ERROR', err);
      });
  };

  const deleteCapture = () => {
    // TODO;
  };

  return (
    <CameraContext.Provider
      value={{
        captures,
        addCapture,
        deleteCapture,
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
