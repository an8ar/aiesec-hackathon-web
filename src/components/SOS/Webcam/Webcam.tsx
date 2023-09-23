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
// ... (previous code)

function PhotoCapture() {
  const webcamRef = useRef<Webcam | null>(null);
  const [image, setImage] = useState<string | null>(null);
  const [email, setEmail] = useState<string>(''); // State variable for user's email
  const [captureStatus, setCaptureStatus] = useState<string | null>(null);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const text = `Astana, Kazakhstan, ${new Date().toLocaleDateString()}}`;
  const [takingPhoto, setTakingPhoto] = useState<boolean>(false);
  const capturePhoto = () => {
    if (!webcamRef.current) return;

    const canvas = document.createElement('canvas');
    canvas.width = webcamRef.current.video!.videoWidth - 100;
    canvas.height = webcamRef.current.video!.videoHeight - 70;
    const context = canvas.getContext('2d')!;

    const frame = new Image();
    frame.src = '/f.jpg';

    frame.onload = () => {
      // Draw the frame image first
      context.drawImage(frame, 0, 0, canvas.width + 100, canvas.height);

      // Capture the webcam feed on top of the frame
      if (!webcamRef.current) return;
      context.drawImage(webcamRef.current.video!, 40, 30, canvas.width + 50, canvas.height - 70);

      // Add text
      context.font = '24px Arial';
      context.fillStyle = 'white';
      context.fillText(text, 20, canvas.height - 20);

      const capturedImage = canvas.toDataURL('image/jpeg');

      // Convert the captured image to a Blob
      const blob = dataURItoBlob(capturedImage);
      const file = new File([blob], 'captured-image.jpg', { type: 'image/jpeg' });

      setImageFile(file);

      setCaptureStatus('Photo captured successfully!');
    };
  };
  const handleCancel = () => {
    // Reset the component's state and cancel taking a photo
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

    // Create a FormData object
    const formData = new FormData();
    formData.append('image', imageFile);

    // Append the user's email to the FormData
    formData.append('email', email);

    // Now you can send the FormData to your server or wherever you need to send it
    // You can use AJAX, fetch, or any other method to send the FormData to your server

    // Example using fetch (you would replace 'your-server-endpoint' with the actual endpoint):
    fetch('your-server-endpoint', {
      method: 'POST',
      body: formData,
    })
      .then((response) => {
        // Handle the response from the server
        console.log('Image sent successfully');
      })
      .catch((error) => {
        console.error('Error sending image:', error);
      });
  };

  // Helper function to convert data URI to Blob
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
          <Button
            type="button"
            color="primary"
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
        </>
      )}
    </StyledPhotoContainer>
  );
}

export default PhotoCapture;
