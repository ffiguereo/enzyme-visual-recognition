import React from 'react';
import {Platform} from 'react-native';

const CameraContext = React.createContext();
CameraContext.displayName = 'CameraContext';

function CameraProvider(props) {
  const [captures, setCaptures] = React.useState([]);

  const addCapture = (data, type = 'photo') => {
    setCaptures([
      ...captures,
      {
        type,
        raw: data,
      },
    ]);

    const form = new FormData();

    form.append('images_file', {
      name: data.fileName,
      type: data.type,
      uri:
        Platform.OS === 'android' ? data.uri : data.uri.replace('file://', ''),
    });
    form.append('threshold', 0.6);
    form.append('classifier_ids', 'default');
    const apiKey = '';

    fetch(
      'https://gateway.watsonplatform.net/visual-recognition/api/v3/classify?version=2018-03-19',
      {
        method: 'POST',
        credentials: `apiKey:${apiKey}`,
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: form,
      },
    )
      .then(async res => {
        console.log(res.ok, await res.text());
        return 'res.json()';
      })
      .then(res => {
        console.log(res);
        console.log('image uploaded');
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
