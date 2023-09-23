/* eslint-disable max-len */
/* eslint-disable no-plusplus */
/* eslint-disable no-console */
/* eslint-disable unused-imports/no-unused-vars */
/* eslint-disable @typescript-eslint/no-non-null-assertion */
import React, { useRef, useState } from 'react';

import { Button, TextField } from '@mui/material';
import Webcam from 'react-webcam';
import styled from 'styled-components';

const StyledPhotoContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledCanvas = styled.canvas`
  border: 1px solid #ccc;
`;

function PhotoCapture() {
  const webcamRef = useRef<Webcam | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>('');
  const [captureStatus, setCaptureStatus] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const text = `Jerry, Astana, ${new Date().toLocaleDateString()}`;
  const [takingPhoto, setTakingPhoto] = useState<boolean>(false);
  const capturePhoto = () => {
    if (!webcamRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = webcamRef.current.video!.videoWidth;
    canvas.height = webcamRef.current.video!.videoHeight;
    const context = canvas.getContext('2d')!;

    context.fillStyle = 'black';
    context.fillRect(0, 0, canvas.width, canvas.height);

    const frame = new Image();
    frame.src = '/frame.png';

    frame.onload = () => {
      context.drawImage(frame, 0, 0, canvas.width, canvas.height);

      if (!webcamRef.current) return;

      const paddingX = 20;
      const paddingY = 20;
      const webcamWidth = canvas.width - 2 * paddingX;
      const webcamHeight = canvas.height - 2 * paddingY;

      context.drawImage(
        webcamRef.current.video!,
        paddingX,
        paddingY,
        webcamWidth,
        webcamHeight,
      );

      context.font = '24px Roboto';
      context.fillStyle = 'white';
      context.fillText(text, 40, canvas.height - 30);
      const capturedImage = canvas.toDataURL('image/jpeg');
      const blob = dataURItoBlob(capturedImage);
      const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });
      setImageFile(file);
      setCaptureStatus('Photo captured successfully!');
    };
  };
  const handleCancel = () => {
    setTakingPhoto(false);
    setImage(null);
    setEmail('');
    setCaptureStatus(null);
    setImageFile(null);
  };

  const handleSubmit = () => {
    if (!imageFile) {
      console.error('No image file to send.');
      return;
    }

    const formData = new FormData();
    formData.append('file', imageFile);
    formData.append('to_email', email);

    fetch('https://78gxn3hk-8080.euw.devtunnels.ms/api/photo-shoot/send', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        console.log('Image sent successfully');
      })
      .catch((error) => {
        console.error('Error sending image:', error);
      });
  };
  console.log(imageFile);

  function dataURItoBlob(dataURI: string) {
    const byteString = atob(dataURI.split(',')[1]);
    const mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
    const ab = new ArrayBuffer(byteString.length);
    const ia = new Uint8Array(ab);
    for (let i = 0; i < byteString.length; i++) {
      ia[i] = byteString.charCodeAt(i);
    }
    const blob = new Blob([ab], { type: mimeString });
    return blob;
  }
  console.log(imageFile);

  return (
    <StyledPhotoContainer>
      {!takingPhoto ? (
        <Button color="primary" variant="outlined" type="button" onClick={() => setTakingPhoto(true)}>Take a Photo</Button>
      ) : (
        <>
          <Webcam
            audio={false}
            ref={webcamRef}
          />
          <div style={{
            display: 'flex',
            marginTop: '10px',
            marginBottom: '10px',
            justifyContent: 'space-between',
          }}
          >
            <Button
              sx={{
                marginRight: '10px',

              }}
              color="primary"
              variant="outlined"
              type="button"
              onClick={capturePhoto}
            >
              Capture Photo

            </Button>
            <Button color="primary" variant="outlined" type="button" onClick={handleCancel}>Cancel</Button>
          </div>
          {image && (
            <StyledCanvas>
              <img src={image} alt="Captured" />
            </StyledCanvas>
          )}
          <TextField
            sx={{
              marginBottom: '10px',
              width: '400px',
            }}
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <div style={{
            display: 'flex',
            marginTop: '10px',
            marginBottom: '10px',
          }}
          >
            <Button
              type="button"
              color="primary"
              sx={{
                marginRight: '10px',
              }}
              variant="outlined"
              onClick={() => {
                if (imageFile) {
                  const blobUrl = URL.createObjectURL(imageFile);
                  const a = document.createElement('a');
                  a.href = blobUrl;
                  a.download = 'image.jpg';
                  a.click();
                  URL.revokeObjectURL(blobUrl);
                }
              }}
            >
              Download
            </Button>
            {imageFile && (
            <Button color="primary" variant="outlined" type="button" onClick={handleSubmit}>Submit</Button>
            )}
          </div>
        </>
      )}
    </StyledPhotoContainer>
  );
}

export default PhotoCapture;
